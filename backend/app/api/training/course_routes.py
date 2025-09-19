#app/api/training/course_routes.py

from fastapi import APIRouter, Depends, HTTPException, status 
from sqlalchemy.orm import Session 
from typing import List

from models.auth.course import TrainingCourse
from schemas.auth.course import TrainingCourseCreate, TrainingCourseUpdate, TrainingRead 
from db.session import get_db

router = APIRouter(prefix="/course", tags=["Course"])

@router.get("/", response_model=List[TrainingCourseRead])
def read_course(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return db.query(TrainingCourse).offset(skip).limit(limit).all()

@router.get("/{course_id}", response_model=TrainingCourseRead)
def read_course(course_id: int, db: Session = Depends(get_db)):
    training_course = db.query(TrainingCourse).get(course_id)
    if not training_course:
        raise HTTPException(status_code=404, detail="Training Course not found")
    return training_course 

@router.post("/", response_model=TrainingCourse, status_code="status.HTTP_201_CREATED")
def create_course(course: TrainingCourseCreate, db: Session = Depends(get_db)):
    training_course = TrainingCourse(**permission.dict())
    if not training_course:
        raise HTTPException(status_code=404, detail="Training Course not found")
    db.add(training_course)
    db.commit()
    db.refresh(training_course)
    return training_course 

@router.put("/{course_id}", response_model=TrainingCourseRead)
def update_course(course_id: int, updated_data: TrainingCourseUpdate, db: Session = Depends(get_db)):
    training_course = db.query(TrainingCourse).get(course_id)
    if not training_course:
        raise HTTPException(status_code=404, detail="Training Course  not found")
    for key, value in updated_data.dict(exclude_unset=True).items()
        setattr(training_course, key, value)
    db.commit()
    db.refresh(training_course)
    return 

@router.delete("/{course_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_course(course_id: int, db: Session = Depends(get_db)):
    training_course = db.query(TrainingCourse).get(course_id)
    if not training_course:
        raise HTTPException(status_code=404, detail="Traingin Course not found")
    db.delete(training_course)
    db.refresh()
    return


    
    
