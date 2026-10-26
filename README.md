### Трекер лабораторных работ и домашних заданий

# Приложение для студентов и преподавателей, позволяющее отслеживать дедлайны, распределять задачи по курсам и получать уведомления.

## Описание проекта и сценарии:

## Стек
- Frontend: React + TypeScript
- UI:
- Backend: Python + FastAPI

# Экраны:
1. Авторизация/вход
2. Дашборд
3. Лента Занятий
4. Карточка занятия
5. Уведомления
6. Администрирование

# Сценарии:
- Студент заходит, видит список лаб, отмечает выполнение
- Преподаватель создает новое задание и назначает дедлайн

## Frontend

### Запуск frontend

1. Установите зависимости: `npm install`
2. Запустите dev-сервер: `npm run dev`
3. Откройте http://localhost:5173

## Backend (FastAPI + PostgreSQL)

### Стек
- FastAPI
- SQLAlchemy 2.x
- PostgreSQL
- Alembic (миграции)
- Pydantic v2

### Настройка

1. Установи PostgreSQL (или запусти Docker):
   ```bash
   docker compose up -d

2. Создай .env из .env.example:
    
    ```bash

    cp backend/.env.example backend/.env

3. Установи зависимости:
    
    ```bash

    cd backend
    python -m venv .venv
    source .venv/bin/activate    # Windows: .venv\Scripts\Activate.ps1
    pip install -r requirements.txt

4. Примени миграции:
    
    ```bash

    alembic upgrade head

5. Запусти сервер:
    
    ```bash

    uvicorn app.main:app --reload

6. Документация API

    Swagger: http://localhost:8000/docs

    ReDoc: http://localhost:8000/redoc

## Модель данных

- **User** — пользователь (студент / преподаватель / админ)
- **Course** — курс, у которого есть преподаватель (FK → User)
- **Task** — задание (лаба / ДЗ), привязано к курсу и студенту (FK → Course, User)
- **Notification** — уведомление, привязано к пользователю (FK → User)

## Связи

- User (teacher) 1—N Course
- Course 1—N Task
- User (student) 1—N Task
- User 1—N Notification
