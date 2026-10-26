from datetime import datetime
from pydantic import BaseModel, ConfigDict
from app.models.task import TaskType, TaskStatus


class TaskBase(BaseModel):
    title: str
    description: str | None = None
    type: TaskType
    status: TaskStatus = TaskStatus.NOT_STARTED
    deadline: datetime
    course_id: int
    student_id: int


class TaskCreate(TaskBase):
    pass


class TaskUpdate(BaseModel):
    title: str | None = None
    description: str | None = None
    status: TaskStatus | None = None
    deadline: datetime | None = None


class TaskRead(TaskBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    created_at: datetime