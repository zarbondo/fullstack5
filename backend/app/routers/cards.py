from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import crud, schemas
from app.database import get_db
from app.routers.decks import get_deck_or_404

router = APIRouter(tags=["cards"])


def get_card_or_404(card_id: int, db: Session = Depends(get_db)):
    card = crud.get_card(db, card_id)
    if card is None:
        raise HTTPException(status_code=404, detail="Карточка не найдена")
    return card


@router.get("/decks/{deck_id}/cards", response_model=list[schemas.CardOut])
def read_cards(deck=Depends(get_deck_or_404), db: Session = Depends(get_db)):
    return crud.list_cards(db, deck.id)


@router.post("/decks/{deck_id}/cards", response_model=schemas.CardOut, status_code=201)
def create_card(data: schemas.CardCreate, deck=Depends(get_deck_or_404), db: Session = Depends(get_db)):
    return crud.create_card(db, deck.id, data)


@router.get("/cards/{card_id}", response_model=schemas.CardOut)
def read_card(card=Depends(get_card_or_404)):
    return card


@router.patch("/cards/{card_id}", response_model=schemas.CardOut)
def patch_card(data: schemas.CardUpdate, card=Depends(get_card_or_404), db: Session = Depends(get_db)):
    return crud.update_card(db, card, data)


@router.delete("/cards/{card_id}", status_code=204)
def remove_card(card=Depends(get_card_or_404), db: Session = Depends(get_db)):
    crud.delete_card(db, card)
