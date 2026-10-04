from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import crud, schemas
from app.database import get_db

router = APIRouter(prefix="/decks", tags=["decks"])


def get_deck_or_404(deck_id: int, db: Session = Depends(get_db)):
    deck = crud.get_deck(db, deck_id)
    if deck is None:
        raise HTTPException(status_code=404, detail="Колода не найдена")
    return deck


@router.get("", response_model=list[schemas.DeckOut])
def read_decks(db: Session = Depends(get_db)):
    return crud.list_decks(db)


@router.post("", response_model=schemas.DeckOut, status_code=201)
def create_deck(data: schemas.DeckCreate, db: Session = Depends(get_db)):
    return crud.create_deck(db, data)


@router.get("/{deck_id}", response_model=schemas.DeckWithCards)
def read_deck(deck=Depends(get_deck_or_404)):
    return deck


@router.patch("/{deck_id}", response_model=schemas.DeckOut)
def patch_deck(data: schemas.DeckUpdate, deck=Depends(get_deck_or_404), db: Session = Depends(get_db)):
    return crud.update_deck(db, deck, data)


@router.delete("/{deck_id}", status_code=204)
def remove_deck(deck=Depends(get_deck_or_404), db: Session = Depends(get_db)):
    crud.delete_deck(db, deck)
