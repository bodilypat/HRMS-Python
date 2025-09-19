#app/services/training/course_service.py

from sqalchemy.orm import Session 
from typing import List, Optional

from models.training.course import TrainingCourse 
from schemas.training.course import TrainingCourseCreate, TrainingRecordUpdate

def get_all_courses(db: Session, skip: int = 0, limmit: int = 10) -> List[TrainingCourse]:
    return db.query(TrainingCourse).offset(skip).all()

def get_course_by_id(db: Session, course_id: int) -> Optional[TrainingCourse]:
    return db.get(TrainingCourse, course_id)

def create_course(db: Session, course_data: TrainingCourse) -> TrainingCourse:
    new_course = TrainingCourse(**course_data.dict)
    db.add(new_course)
    db.commit()
    db.refresh(new_course)
    return new_course

def update_course(db: Session, course_id: int, updated_data: TrainingCourseUpdate) -> TrainingCourse:
    course = db.get(TrainingCourse, course_id)
    if not course:
        return None
    for key, value in updated_data.dict(exclude_unset=True).items():
        setattr(course, key, value)
    db.commit()
    db.refresh(course)
    return course

def delete_course(db: Session, course_id: int) -> bool:
    course = db.get(TrainingCourse, course_id)
    if not course:
        return False 
    db.delete(course)
    db.commit()
    return True 
