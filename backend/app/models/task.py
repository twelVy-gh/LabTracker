from datetime import datetime
from enum import Enum

from sqlalchemy import String, ForeignKey, DateTime, Enum as SAEnum, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class TaskType(str, Enum):
    LAB = "lab"
    HOMEWORK = "homework"


class TaskStatus(str, Enum):
    NOT_STARTED = "not_started"
    IN_PROGRESS = "in_progress"
    SUBMITTED = "submitted"
    GRADED = "graded"


class Task(Base):
    __tablename__ = "tasks"

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(200), nullable=False)
    description: Mapped[str | None] = mapped_column(String(2000))
    type: Mapped[TaskType] = mapped_column(SAEnum(TaskType, name="task_type"), nullable=False)
    status: Mapped[TaskStatus] = mapped_column(
        SAEnum(TaskStatus, name="task_status"),
        default=TaskStatus.NOT_STARTED,
    )
    deadline: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)

    course_id: Mapped[int] = mapped_column(ForeignKey("courses.id", ondelete="CASCADE"))
    student_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"))

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )

    course: Mapped["Course"] = relationship(back_populates="tasks")
    student: Mapped["User"] = relationship(
        back_populates="tasks",
        foreign_keys=[student_id],
    )