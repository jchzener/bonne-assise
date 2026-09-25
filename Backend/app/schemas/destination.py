from typing import Literal
from pydantic import BaseModel

class DestinationHero(BaseModel):
    eyebrow: str
    title: str
    subtitle: str
    image: str
    coordinates: tuple[float, float]

class DestinationThread(BaseModel):
    id: str
    title: str
    label: str
    description: str

class DestinationExperience(BaseModel):
    id: str
    title: str
    category: str
    duration: str
    description: str
    image: str
    href: str

class DestinationStory(BaseModel):
    id: str
    eyebrow: str
    title: str
    description: str
    image: str
    href: str

class DestinationFood(BaseModel):
    name: str
    description: str
    image: str
    href: str

class DestinationNearby(BaseModel):
    id: str
    name: str
    region: str
    href: str

class DestinationResponse(BaseModel):
    id: str
    name: str
    region: str
    hero: DestinationHero
    intro: str
    threads: list[DestinationThread]
    experiences: list[DestinationExperience]
    stories: list[DestinationStory]
    foods: list[DestinationFood]
    practical: list[str]
    nearby: list[DestinationNearby]
    journeyText: str
    locale: Literal['en', 'fr']
