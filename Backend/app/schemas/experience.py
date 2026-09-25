from pydantic import BaseModel

class ExperienceHost(BaseModel):
    name: str
    role: str
    bio: str
    image: str

class ExperienceStep(BaseModel):
    time: str
    title: str
    description: str

class ExperienceProductDetail(BaseModel):
    id: str
    type: str
    name: str
    title: str
    promise: str
    eyebrow: str
    place: str
    region: str
    duration: str
    format: str
    hero: str
    intro: str
    why_it_matters: str
    host: ExperienceHost
    steps: list[ExperienceStep]
    included: list[str]
    not_included: list[str]
    practical: list[str]
    price_note: str
    availability_note: str
    booking_label: str
    related: list[dict[str, str]]
    locale: str
