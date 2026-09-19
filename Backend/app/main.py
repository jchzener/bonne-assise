from pathlib import Path
import base64, hashlib, hmac, json, os, secrets, sqlite3, time
from typing import Any
from fastapi import FastAPI, HTTPException, Query, Request, Response, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

ROOT = Path(__file__).resolve().parents[1]
BA_ENV = os.getenv('BA_ENV', 'development').strip().lower()
DB = Path(os.getenv('BA_DB_PATH', str(ROOT / 'bonne_assise.db'))).expanduser()
UPLOAD_DIR = Path(os.getenv('BA_UPLOAD_DIR', str(ROOT / 'uploads'))).expanduser()

# Phase A Render preview: serve the built React app from the same FastAPI service.
# API and CMS therefore share one public origin, avoiding cross-service CORS/cookie issues.
FRONTEND_DIR = Path(os.getenv('BA_FRONTEND_DIR', str(ROOT.parent / 'frontend-dist'))).expanduser()
SESSION_COOKIE = 'ba_session'
SESSION_TTL = 60 * 60 * 12

SESSION_SECRET = os.getenv('BA_SESSION_SECRET', '').strip()
ADMIN_EMAIL = os.getenv('BA_ADMIN_EMAIL', '').strip().lower()
ADMIN_PASSWORD = os.getenv('BA_ADMIN_PASSWORD', '')

if BA_ENV == 'production':
    if len(SESSION_SECRET) < 32:
        raise RuntimeError('BA_SESSION_SECRET must be at least 32 characters in production')
    if not ADMIN_EMAIL or not ADMIN_PASSWORD:
        raise RuntimeError('BA_ADMIN_EMAIL and BA_ADMIN_PASSWORD are required in production')
else:
    SESSION_SECRET = SESSION_SECRET or ('dev-' + secrets.token_hex(32))
    ADMIN_EMAIL = ADMIN_EMAIL or 'editor@bonneassise.com'
    ADMIN_PASSWORD = ADMIN_PASSWORD or 'dev-only-change-me'

default_origins = os.getenv('RENDER_EXTERNAL_URL', 'http://localhost:5173,http://127.0.0.1:5173')
ALLOWED_ORIGINS = [
    origin.strip().rstrip('/')
    for origin in os.getenv('BA_ALLOWED_ORIGINS', default_origins).split(',')
    if origin.strip()
]
COOKIE_SECURE = BA_ENV == 'production'

app = FastAPI(title='BONNE ASSISE API', version='2.0.0')
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
DB.parent.mkdir(parents=True, exist_ok=True)
app.mount('/uploads', StaticFiles(directory=str(UPLOAD_DIR)), name='uploads')


SEED = {
    'places': [
        {'slug':'cotonou','name':'Cotonou','region':'Littoral','summary':'Ville, marchés, art, tables, plage et vie nocturne.'},
        {'slug':'ouidah','name':'Ouidah','region':'Atlantique','summary':'Histoire, mémoire, culture et Atlantique.'},
        {'slug':'ganvie','name':'Ganvié','region':'Atlantique','summary':'Vie quotidienne sur le lac Nokoué.'},
        {'slug':'porto-novo','name':'Porto-Novo','region':'Ouémé','summary':'Architecture, musées et culture.'},
        {'slug':'grand-popo','name':'Grand-Popo','region':'Mono','summary':'Océan, lagune et lenteur.'},
        {'slug':'abomey','name':'Abomey','region':'Zou','summary':'Palais royaux et mémoire du Danxomè.'},
    ],
    'dishes': [
        {'slug':'akassa','name':'Akassa','summary':'Pâte de maïs fermentée, servie avec sauces, poisson ou viande.'},
        {'slug':'amiwo','name':'Amiwo','summary':'Préparation au maïs et à la tomate, populaire dans la cuisine béninoise.'},
        {'slug':'aloco','name':'Aloco','summary':'Banane plantain mûre frite, souvent servie avec grillades et piment.'},
    ],
    'events': [
        {'slug':'vodun-days-2027','name':'Vodun Days 2027','date':'2027-01-02/2027-01-09','location':'Ouidah'},
        {'slug':'weloveya-2026','name':'WeLovEya 2026','date':'2026-12-26/2026-12-27','location':'Cotonou'},
        {'slug':'festival-des-masques-2027','name':'Festival des Masques 2027','date':'2027-08-07/2027-08-08','location':'Porto-Novo'},
        {'slug':'jistna-2027','name':'JISTNA 2027','date':'2027-08-22/2027-08-23','location':'Ouidah'},
    ],
    'stories': [
        {'slug':'commencer-a-manger-a-cotonou','title':'Commencer à manger à Cotonou','summary':'Quelques repères pour entrer dans la cuisine locale.'},
        {'slug':'ouidah-en-une-journee','title':'Ouidah en une journée','summary':'Une lecture attentive d’une ville de mémoire.'},
    ],
}

class ContentPayload(BaseModel):
    data: dict[str, Any]

class LoginPayload(BaseModel):
    email: str
    password: str

def init_db():
    with sqlite3.connect(DB) as con:
        con.execute('CREATE TABLE IF NOT EXISTS content (kind TEXT, slug TEXT PRIMARY KEY, payload TEXT NOT NULL, updated_at INTEGER NOT NULL)')
        con.execute('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT UNIQUE NOT NULL, password_hash TEXT NOT NULL, role TEXT NOT NULL, created_at INTEGER NOT NULL)')
        con.execute('CREATE TABLE IF NOT EXISTS audit_log (id INTEGER PRIMARY KEY AUTOINCREMENT, user_email TEXT, action TEXT, kind TEXT, slug TEXT, created_at INTEGER NOT NULL)')
        now=int(time.time())
        for kind, items in SEED.items():
            for item in items:
                con.execute('INSERT OR IGNORE INTO content(kind, slug, payload, updated_at) VALUES(?,?,?,?)', (kind, item['slug'], json.dumps(item, ensure_ascii=False), now))
        if not con.execute('SELECT 1 FROM users WHERE email=?', (ADMIN_EMAIL,)).fetchone():
            con.execute('INSERT INTO users(email,password_hash,role,created_at) VALUES(?,?,?,?)', (ADMIN_EMAIL, hash_password(ADMIN_PASSWORD), 'admin', now))
        con.commit()

def hash_password(password: str, salt: bytes | None = None) -> str:
    salt = salt or os.urandom(16)
    digest = hashlib.pbkdf2_hmac('sha256', password.encode(), salt, 310_000)
    return base64.urlsafe_b64encode(salt).decode() + '$' + base64.urlsafe_b64encode(digest).decode()

def verify_password(password: str, stored: str) -> bool:
    try:
        salt_b64, digest_b64 = stored.split('$', 1)
        salt=base64.urlsafe_b64decode(salt_b64.encode()); expected=base64.urlsafe_b64decode(digest_b64.encode())
        actual=hashlib.pbkdf2_hmac('sha256', password.encode(), salt, 310_000)
        return hmac.compare_digest(actual, expected)
    except Exception:
        return False

def sign(value: str) -> str:
    sig=hmac.new(SESSION_SECRET.encode(), value.encode(), hashlib.sha256).hexdigest()
    return value+'.'+sig

def unsign(token: str) -> str | None:
    try:
        value,sig=token.rsplit('.',1)
        expected=hmac.new(SESSION_SECRET.encode(), value.encode(), hashlib.sha256).hexdigest()
        return value if hmac.compare_digest(sig,expected) else None
    except Exception:
        return None

def create_session(email: str) -> str:
    payload=f'{email}|{int(time.time())+SESSION_TTL}|{secrets.token_urlsafe(12)}'
    return sign(payload)

def current_user(request: Request):
    raw=request.cookies.get(SESSION_COOKIE)
    if not raw: return None
    payload=unsign(raw)
    if not payload: return None
    email,expires,_=payload.split('|',2)
    if int(expires) < int(time.time()): return None
    with sqlite3.connect(DB) as con:
        row=con.execute('SELECT email,role FROM users WHERE email=?',(email,)).fetchone()
    return {'email':row[0],'role':row[1]} if row else None

def require_user(request: Request):
    user=current_user(request)
    if not user: raise HTTPException(status_code=401, detail='Authentication required')
    return user

def rows(kind=None):
    with sqlite3.connect(DB) as con:
        if kind:
            data=con.execute('SELECT payload FROM content WHERE kind=? ORDER BY slug',(kind,)).fetchall()
            return [json.loads(r[0]) for r in data]
        data=con.execute('SELECT kind,payload FROM content ORDER BY kind,slug').fetchall()
    return [{'kind':r[0], **json.loads(r[1])} for r in data]

init_db()

@app.get('/api/health')
def health(): return {'ok':True,'service':'bonne-assise-api','version':'2.0.0'}

@app.post('/api/auth/login')
def login(payload: LoginPayload, response: Response):
    email=payload.email.strip().lower()
    with sqlite3.connect(DB) as con:
        row=con.execute('SELECT email,password_hash,role FROM users WHERE email=?',(email,)).fetchone()
    if not row or not verify_password(payload.password,row[1]): raise HTTPException(status_code=401, detail='Identifiants incorrects')
    response.set_cookie(
        SESSION_COOKIE,
        create_session(row[0]),
        httponly=True,
        secure=COOKIE_SECURE,
        samesite='lax',
        max_age=SESSION_TTL,
        path='/'
    )
    return {'email':row[0],'role':row[2]}

@app.post('/api/auth/logout')
def logout(response: Response):
    response.delete_cookie(SESSION_COOKIE, path='/'); return {'ok':True}

@app.get('/api/auth/me')
def me(request: Request):
    user=current_user(request)
    if not user: raise HTTPException(status_code=401, detail='Not authenticated')
    return user

@app.get('/api/content')
def content(kind: str | None = None): return rows(kind)

@app.get('/api/content/{kind}/{slug}')
def content_detail(kind: str, slug: str):
    with sqlite3.connect(DB) as con: row=con.execute('SELECT payload FROM content WHERE kind=? AND slug=?',(kind,slug)).fetchone()
    if not row: raise HTTPException(status_code=404, detail='Content not found')
    return json.loads(row[0])

@app.put('/api/content/{kind}/{slug}')
def update_content(kind: str, slug: str, payload: ContentPayload, request: Request):
    user=require_user(request); data=dict(payload.data); data['slug']=slug
    now=int(time.time())
    with sqlite3.connect(DB) as con:
        exists=con.execute('SELECT 1 FROM content WHERE kind=? AND slug=?',(kind,slug)).fetchone()
        if not exists: raise HTTPException(status_code=404, detail='Content not found')
        con.execute('UPDATE content SET payload=?, updated_at=? WHERE kind=? AND slug=?',(json.dumps(data,ensure_ascii=False),now,kind,slug))
        con.execute('INSERT INTO audit_log(user_email,action,kind,slug,created_at) VALUES(?,?,?,?,?)',(user['email'],'update',kind,slug,now))
        con.commit()
    return data

@app.post('/api/content/{kind}')
def create_content(kind: str, payload: ContentPayload, request: Request):
    user=require_user(request); data=dict(payload.data); slug=str(data.get('slug','')).strip().lower()
    if not slug: raise HTTPException(status_code=422, detail='slug required')
    data['slug']=slug; now=int(time.time())
    with sqlite3.connect(DB) as con:
        try: con.execute('INSERT INTO content(kind,slug,payload,updated_at) VALUES(?,?,?,?)',(kind,slug,json.dumps(data,ensure_ascii=False),now))
        except sqlite3.IntegrityError: raise HTTPException(status_code=409, detail='Slug already exists')
        con.execute('INSERT INTO audit_log(user_email,action,kind,slug,created_at) VALUES(?,?,?,?,?)',(user['email'],'create',kind,slug,now)); con.commit()
    return data

@app.delete('/api/content/{kind}/{slug}')
def delete_content(kind: str, slug: str, request: Request):
    user=require_user(request); now=int(time.time())
    with sqlite3.connect(DB) as con:
        cur=con.execute('DELETE FROM content WHERE kind=? AND slug=?',(kind,slug))
        if cur.rowcount==0: raise HTTPException(status_code=404, detail='Content not found')
        con.execute('INSERT INTO audit_log(user_email,action,kind,slug,created_at) VALUES(?,?,?,?,?)',(user['email'],'delete',kind,slug,now)); con.commit()
    return {'ok':True}

@app.get('/api/audit')
def audit(request: Request, limit: int = Query(50, ge=1, le=200)):
    require_user(request)
    with sqlite3.connect(DB) as con:
        rows_=con.execute('SELECT user_email,action,kind,slug,created_at FROM audit_log ORDER BY id DESC LIMIT ?',(limit,)).fetchall()
    return [{'user':r[0],'action':r[1],'kind':r[2],'slug':r[3],'created_at':r[4]} for r in rows_]

@app.get('/api/search')
def search(q: str = Query('', min_length=0)):
    needle=q.strip().casefold()
    if not needle:return []
    return [x for x in rows() if needle in json.dumps(x,ensure_ascii=False).casefold()]

@app.get('/api/events')
def events(): return rows('events')


@app.post('/api/upload')
async def upload_image(request: Request, file: UploadFile = File(...)):
    user = require_user(request)
    if not file.content_type or not file.content_type.startswith('image/'):
        raise HTTPException(status_code=400, detail='Fichier image requis (JPEG, PNG, WebP)')
    data = await file.read()
    if len(data) > 8 * 1024 * 1024:
        raise HTTPException(status_code=400, detail='Image trop lourde (max 8 Mo)')
    ext = Path(file.filename or 'img.jpg').suffix.lower() or '.jpg'
    if ext not in {'.jpg', '.jpeg', '.png', '.webp', '.gif'}:
        ext = '.jpg'
    name = secrets.token_hex(12) + ext
    path = UPLOAD_DIR / name
    path.write_bytes(data)
    url = f'/uploads/{name}'
    with sqlite3.connect(DB) as con:
        con.execute('INSERT INTO audit_log(user_email, action, kind, slug, created_at) VALUES(?,?,?,?,?)',
                    (user['email'], 'upload', 'media', name, int(time.time())))
        con.commit()
    return {'url': url, 'filename': name, 'by': user['email']}



# Keep this mount last so /api/* and /uploads/* routes always win.
if FRONTEND_DIR.exists():
    app.mount('/', StaticFiles(directory=str(FRONTEND_DIR), html=True), name='site')
