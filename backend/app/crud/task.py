from sqlalchemy.orm import Session
from app.models.task import Task
from app.schemas.task import TaskCreate, TaskUpdate


def get_task(db: Session, task_id: int) -> Task | None:
    return db.get(Task, task_id)


def get_tasks(db: Session, skip: int = 0, limit: int = 100) -> list[Task]:
    return db.query(Task).offset(skip).limit(limit).all()

def get_tasks_by_student(
        db: Session, student_id: int, skip: int = 0, limit: int = 100
        ) -> list[Task]:
    return (db.query(Task)
            .filter(Task.student_id == student_id)
            .offset(skip)
            .limit(limit)
            .all())

def get_tasks_by_course(
        db: Session, course_id: int, skip: int = 0, limit: int = 100
        ) -> list[Task]:
    return (db.query(Task)
            .filter(Task.course_id == course_id)
            .offset(skip)
            .limit(limit)
            .all())

def create_task(db: Session, data: TaskCreate) -> Task:
    task = Task(
        title=data.title,
        description=data.description,
        type=data.type,
        status=data.status,
        deadline=data.deadline,
        course_id=data.course_id,
        student_id=data.student_id,
    )
    db.add(task)
    db.commit()
    db.refresh(task)
    return task


def update_task(db: Session, task_id: int, data: TaskUpdate) -> Task | None:
    task = get_task(db, task_id)
    if not task:
        return None
    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(task, field, value)
    db.commit()
    db.refresh(task)
    return task


def delete_task(db: Session, task_id: int) -> bool:
    task = get_task(db, task_id)
    if not task:
        return False
    db.delete(task)
    db.commit()
    return True