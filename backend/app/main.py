from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app.routers import cards, decks

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Учебные карточки API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5173", "http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(decks.router)
app.include_router(cards.router)


@app.get("/health")
def health():
    return {"status": "ok"}
