# CMS admin — local login

## 1. Install & env

```bash
cd editorial-platform
npm install
cp .env.example .env.local
```

Edit `.env.local`:

```
ADMIN_PASSWORD=dev-password-change-me
ADMIN_SESSION_SECRET=any-long-random-string
# Optional for persisting partner entries:
# DATABASE_URL=postgres://user:pass@localhost:5432/bonne_assise
```

Without `DATABASE_URL`, login still works; creating entries returns an error until Postgres is configured and `db/schema.sql` is applied.

## 2. Run

```bash
npm run dev
```

Open:

- Site: http://localhost:3000/en
- Admin login: http://localhost:3000/admin/login

## 3. Login

- **Email**: any (default field `admin@bonneassise.bj`)
- **Password**: the value of `ADMIN_PASSWORD` in `.env.local`

Session cookie lasts 12 hours (`ba_admin_session`).

## 4. Postgres (optional but needed to save entries)

```bash
psql "$DATABASE_URL" -f db/schema.sql
```

Then use **Nouvelle entrée** at `/admin/entries/new`.
