from pydantic import BaseModel

class Hero(BaseModel):
    eyebrow: str
    title: str
    subtitle: str
    image: str

class DiscoveryItem(BaseModel):
    id: str
    label: str
    description: str
    image: str

class Region(BaseModel):
    id: str
    kicker: str
    title: str
    description: str
    destinations: list[str]
    image: str

class Place(BaseModel):
    id: str
    name: str
    region: str
    description: str
    coordinates: tuple[float, float]
    image: str
    href: str | None = None

class ExperienceProduct(BaseModel):
    id: str
    name: str
    title: str
    promise: str
    place: str
    duration: str
    format: str
    image: str
    href: str

class Experience(BaseModel):
    id: str
    title: str
    category: str
    place: str
    duration: str
    image: str

class Event(BaseModel):
    id: str
    title: str
    category: str
    place: str
    dateLabel: str
    description: str
    image: str
    href: str
    sponsored: bool = False

class Story(BaseModel):
    id: str
    eyebrow: str
    title: str
    description: str
    image: str
    place: str

class EventItem(BaseModel):
    id: str
    title: str
    category: str
    place: str
    dateLabel: str
    description: str
    image: str
    href: str
    sponsored: bool = False

class HomeResponse(BaseModel):
    hero: Hero
    discovery: list[DiscoveryItem]
    regions: list[Region]
    places: list[Place]
    experiences: list[Experience]
    prendrePlace: list[ExperienceProduct]
    stories: list[Story]
    events: list[Event]
    locale: str
