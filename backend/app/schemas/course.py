from datetime import datetime
from pydantic import BaseModel, ConfigDict


class CourseBase(BaseModel):
    name: str
    description: str | None = None
    teacher_id: int | None = None


class CourseCreate(CourseBase):
    pass


class CourseUpdate(BaseModel):
    name: str | None = None
    description: str | None = None
    teacher_id: int | None = None


class CourseRead(CourseBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    created_at: datetime