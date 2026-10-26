from fastapi import APIRouter

# Импортируем роутеры напрямую из файлов
from app.api.v1.user import router as user_router
from app.api.v1.course import router as course_router
from app.api.v1.task import router as task_router
from app.api.v1.notification import router as notification_router

api_router = APIRouter(prefix="/api/v1")
api_router.include_router(user_router)
api_router.include_router(course_router)
api_router.include_router(task_router)
api_router.include_router(notification_router)