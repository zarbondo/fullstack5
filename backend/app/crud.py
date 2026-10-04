from sqlalchemy import select
from sqlalchemy.orm import Session

from app import models, schemas


def list_decks(db: Session) -> list[models.Deck]:
    return list(db.scalars(select(models.Deck).order_by(models.Deck.id)))


def get_deck(db: Session, deck_id: int) -> models.Deck | None:
    return db.get(models.Deck, deck_id)


def create_deck(db: Session, data: schemas.DeckCreate) -> models.Deck:
    deck = models.Deck(**data.model_dump())
    db.add(deck)
    db.commit()
    db.refresh(deck)
    return deck


def update_deck(db: Session, deck: models.Deck, data: schemas.DeckUpdate) -> models.Deck:
    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(deck, field, value)
    db.commit()
    db.refresh(deck)
    return deck


def delete_deck(db: Session, deck: models.Deck) -> None:
    db.delete(deck)
    db.commit()


def list_cards(db: Session, deck_id: int) -> list[models.Card]:
    return list(
        db.scalars(
            select(models.Card).where(models.Card.deck_id == deck_id).order_by(models.Card.id)
        )
    )


def get_card(db: Session, card_id: int) -> models.Card | None:
    return db.get(models.Card, card_id)


def create_card(db: Session, deck_id: int, data: schemas.CardCreate) -> models.Card:
    card = models.Card(deck_id=deck_id, **data.model_dump())
    db.add(card)
    db.commit()
    db.refresh(card)
    return card


def update_card(db: Session, card: models.Card, data: schemas.CardUpdate) -> models.Card:
    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(card, field, value)
    db.commit()
    db.refresh(card)
    return card


def delete_card(db: Session, card: models.Card) -> None:
    db.delete(card)
    db.commit()
