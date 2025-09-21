#app/api/training/course_routes.py

from fastapi import APIRouter, Depends, HTTPException, Query, status 
from sqlalchemy.orm import Session
from typing import List 

from schemas.training.course import TrainingCourseCreate, TrainingCourseUpdate, TrainingCouresRead
from db.session import get_db 
from services.training import course_service

router = APIRouter(prefix="/courses", tags=["Courses"])

@router.get("/", response_model=List[TrainingCourseRead], summary="Get a list of Training Course" )
def read_courses(
        skip: int = Query(0, ge=0),
        limit: int = Query(10, le=100),
        db: Session = Depends(get_db)
    ):
    return course_service.get_all_courses(db, skip, limit)

@router.get("/{course_id}", response_model=TrainingCouresRead, summary="Get a single of Training Course")
def read_course(
        course_id: int,
        db: Session = Depends(get_db)
    ):
    course = course_service.get_course_by_id(db, course_id)
    if not course:
        raise HTTPException(stauts_code=404, detail="Training Course not found")
    return course 

@router.post("/", response_model=TrainingCouresRead, status_code=status.HTTP_201_CREATED, summary="Create a new Training Course")
def create_course(
        course: TrainingCourseCreate,
        db: Session = Depends(get_db)
    ):
    return course_service.create_course(db, course)

@router.put("/{course_id}", response_model=TrainingCouresRead, summary="Update an existing Training course")
def update_course(
        course_id: int,
        updated_data: TrainingCourseUpdate,
        db: Session = Depends(get_db)
    ):
    updated = course_service.update_course(db, course_id, updated_data)
    if not updated:
        raise HTTPException(staus_code=404, detilt="Training Course not found ")
    return updated 

@router.delete("/course_id", status_code=status.HTTP_204_NO_CONTENT, summary="Delete an Training Course")
def delete_course(
        course_id: int,
        db: Session = Depends(get_db)
    ):
    success = course_service.delete_course(db, course_id)
    if not success:
        raise HTTPException(status_code=404, detail="Training Course not found")
    return Response(status_code=status.HTTP_NO_CONTENT)


