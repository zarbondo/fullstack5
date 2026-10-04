import os

os.environ["DATABASE_URL"] = "sqlite:///./verify.db"

from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)

print("GET /health ->", client.get("/health").status_code, client.get("/health").json())

r = client.post("/decks", json={"title": "Операционные системы", "source_file_name": "os.pdf"})
print("POST /decks ->", r.status_code, r.json())
deck_id = r.json()["id"]

r = client.post(
    "/decks",
    json={"title": "", "source_file_name": "x.pdf"},
)
print("POST /decks invalid (empty title) ->", r.status_code)

r = client.get("/decks")
print("GET /decks ->", r.status_code, len(r.json()), "decks")

r = client.get(f"/decks/{deck_id}")
print(f"GET /decks/{deck_id} ->", r.status_code, r.json())

r = client.get("/decks/999999")
print("GET /decks/999999 (missing) ->", r.status_code, r.json())

r = client.post(
    f"/decks/{deck_id}/cards",
    json={"question": "Что такое процесс?", "answer": "Экземпляр выполняющейся программы."},
)
print("POST card ->", r.status_code, r.json())
card_id = r.json()["id"]

r = client.post(f"/decks/{deck_id}/cards", json={"question": "Q2", "answer": "A2"})
print("POST card 2 ->", r.status_code)

r = client.get(f"/decks/{deck_id}/cards")
print(f"GET /decks/{deck_id}/cards ->", r.status_code, len(r.json()), "cards")

r = client.patch(f"/cards/{card_id}", json={"answer": "Уточнённый ответ"})
print("PATCH card ->", r.status_code, r.json())

r = client.get(f"/decks/{deck_id}")
print("GET deck with cards ->", r.status_code, r.json())

r = client.delete(f"/cards/{card_id}")
print("DELETE card ->", r.status_code)

r = client.get(f"/decks/{deck_id}/cards")
print(f"GET /decks/{deck_id}/cards after delete ->", r.status_code, len(r.json()), "cards")

r = client.delete(f"/decks/{deck_id}")
print("DELETE deck ->", r.status_code)

r = client.get(f"/decks/{deck_id}")
print("GET deck after delete ->", r.status_code)

r = client.get(f"/decks/{deck_id}/cards")
print("GET cards of deleted deck (cascade check) ->", r.status_code)

print("ALL CHECKS EXECUTED")
