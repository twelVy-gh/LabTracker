from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.crud import course as crud_course
from app.crud import user as crud_user
from app.schemas.course import CourseCreate, CourseRead, CourseUpdate

router = APIRouter(prefix="/courses", tags=["courses"])


@router.get("/", response_model=list[CourseRead])
def list_courses(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud_course.get_courses(db, skip=skip, limit=limit)


@router.get("/{course_id}", response_model=CourseRead)
def get_course(course_id: int, db: Session = Depends(get_db)):
    course = crud_course.get_course(db, course_id)
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    return course


@router.post("/", response_model=CourseRead, status_code=status.HTTP_201_CREATED)
def create_course(payload: CourseCreate, db: Session = Depends(get_db)):
    if payload.teacher_id and not crud_user.get_user(db, payload.teacher_id):
        raise HTTPException(status_code=404, detail="Teacher not found")
    return crud_course.create_course(db, payload)


@router.patch("/{course_id}", response_model=CourseRead)
def update_course(course_id: int, payload: CourseUpdate, db: Session = Depends(get_db)):
    course = crud_course.update_course(db, course_id, payload)
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    return course


@router.delete("/{course_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_course(course_id: int, db: Session = Depends(get_db)):
    if not crud_course.delete_course(db, course_id):
        raise HTTPException(status_code=404, detail="Course not found")