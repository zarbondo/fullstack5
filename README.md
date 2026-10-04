# Учебные карточки из PDF

Курс «Fullstack», сквозной проект на 5 лабораторных работ.

## Назначение

Загружаешь PDF с конспектом — приложение автоматически создаёт из него карточки
«вопрос — ответ» для повторения. Карточки группируются в колоды (по одному
конспекту на колоду), колоды можно открыть и повторять в режиме флеш-карт.

## Основные пользовательские сценарии

1. Посмотреть список своих конспектов (колод) и сколько карточек в каждой.
2. Загрузить новый PDF-конспект и получить колоду карточек.
3. Открыть колоду и посмотреть все карточки списком.
4. Запустить режим повторения: вопрос → показать ответ → следующая карточка.

## Экраны

| Экран | Маршрут | Скриншот |
|---|---|---|
| Мои конспекты | `/` | `docs/screenshots/01-decks.png` |
| Загрузить PDF | `/upload` | `docs/screenshots/02-upload.png` |
| Конспект (список карточек) | `/decks/:id` | `docs/screenshots/03-deck-detail.png` |
| Повторение — вопрос | `/decks/:id/study` | `docs/screenshots/04-study-question.png` |
| Повторение — ответ | `/decks/:id/study` | `docs/screenshots/05-study-answer.png` |
| Мои конспекты, мобильная версия | `/` | `docs/screenshots/06-decks-mobile.png` |

## Стек

- Backend: Python + FastAPI.
- БД и ORM: PostgreSQL + SQLAlchemy.
- Frontend: React + TypeScript, Vite, React Router, MUI (Material UI).
- Контроль версий: Git.

## Статус

- **ЛР1** — frontend-каркас: вёрстка всех экранов, маршрутизация между ними,
  единое оформление на MUI. Данные — демонстрационные (`frontend/src/data/mockData.ts`),
  загрузка PDF на этом этапе не парсит файл, а создаёт колоду с одной демо-карточкой
  через React Context (`frontend/src/DecksContext.tsx`).
- **ЛР2** — backend: модели `Deck`/`Card` на SQLAlchemy, CRUD через FastAPI,
  валидация запросов на Pydantic, PostgreSQL как БД. Frontend пока не подключён
  к backend (демо-данные остаются до ЛР5, интеграции).
  Реальная генерация карточек из текста PDF — в следующих лабах.

## Запуск frontend

```bash
cd frontend
npm install
npm run dev -- --host 127.0.0.1
```

Приложение откроется на `http://127.0.0.1:5173` (или на порту, который покажет
Vite в консоли). Флаг `--host 127.0.0.1` нужен из-за особенности этой машины:
Vite по умолчанию слушает только IPv6-loopback (`[::1]`), и некоторые браузеры/
инструменты не могут до него достучаться по `localhost`.

Проверка сборки:

```bash
npm run build
```

## Запуск backend

1. Подготовить PostgreSQL (локально или в контейнере) и создать БД и пользователя
   из `.env.example`:

   ```sql
   CREATE USER study_cards WITH PASSWORD 'study_cards';
   CREATE DATABASE study_cards OWNER study_cards;
   ```

2. Скопировать `.env.example` в `.env` и при необходимости поправить `DATABASE_URL`.

3. Установить зависимости и запустить сервер:

   ```bash
   cd backend
   python -m venv .venv
   .venv\Scripts\activate
   pip install -r requirements.txt
   uvicorn app.main:app --reload
   ```

   При старте приложение само создаёт таблицы (`Base.metadata.create_all`),
   отдельная миграция не нужна. API будет на `http://127.0.0.1:8000`,
   интерактивная документация — на `http://127.0.0.1:8000/docs`.

4. Быстрая проверка CRUD без поднятия Postgres (на SQLite):

   ```bash
   cd backend
   python verify_crud.py
   ```

   Скрипт поднимает приложение in-memory через `TestClient`, прогоняет создание,
   чтение, изменение и удаление колод и карточек и печатает коды ответов.

### Эндпоинты

| Метод | Путь | Действие |
|---|---|---|
| GET | `/decks` | список колод |
| POST | `/decks` | создать колоду |
| GET | `/decks/{id}` | колода с её карточками |
| PATCH | `/decks/{id}` | изменить колоду |
| DELETE | `/decks/{id}` | удалить колоду (каскадно удаляет её карточки) |
| GET | `/decks/{id}/cards` | карточки колоды |
| POST | `/decks/{id}/cards` | добавить карточку в колоду |
| GET | `/cards/{id}` | одна карточка |
| PATCH | `/cards/{id}` | изменить карточку |
| DELETE | `/cards/{id}` | удалить карточку |

Несуществующая колода/карточка — `404`, невалидное тело запроса (пустой
`title`, отсутствующее поле) — `422` со списком ошибок от Pydantic.
