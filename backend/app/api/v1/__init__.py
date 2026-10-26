from fastapi import APIRouter
from app.api.v1 import users, courses, tasks, notifications

api_router = APIRouter(prefix="/api/v1")
api_router.include_router(users.router)
api_router.include_router(courses.router)
api_router.include_router(tasks.router)
api_router.include_router(notifications.router)