from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class CardBase(BaseModel):
    question: str = Field(min_length=1, max_length=2000)
    answer: str = Field(min_length=1, max_length=2000)


class CardCreate(CardBase):
    pass


class CardUpdate(BaseModel):
    question: str | None = Field(default=None, min_length=1, max_length=2000)
    answer: str | None = Field(default=None, min_length=1, max_length=2000)


class CardOut(CardBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    deck_id: int
    created_at: datetime


class DeckBase(BaseModel):
    title: str = Field(min_length=1, max_length=200)
    source_file_name: str = Field(min_length=1, max_length=255)


class DeckCreate(DeckBase):
    pass


class DeckUpdate(BaseModel):
    title: str | None = Field(default=None, min_length=1, max_length=200)
    source_file_name: str | None = Field(default=None, min_length=1, max_length=255)


class DeckOut(DeckBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    created_at: datetime


class DeckWithCards(DeckOut):
    cards: list[CardOut] = []
