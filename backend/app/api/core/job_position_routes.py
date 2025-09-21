#app/api/core/job_position.py

from fastapi import APIRouter, Depends, HTTPException, status, Query, Response 
from sqlalchemy.orm import Session 
from typing import List 

from schemas.core.job_position import JobPositionCreate, JobPositionUpdate, JobPositionRead 
from db.session import get_db 
from services.core import job_position_service 

router = APIRouter(perfix="/job_positions", tags=["Job Position"])

@router.get("/", response_model=JobPositionRead, summary="Get a list of job position")
def read_job_position(
        skip: int = Query(0, ge=0),
        limit: limit(10, le=100),
        db: Session = Depends(get_db)
    ):
    return job_position_service.get_all_job_position(db, skip, limit)

@router.get("{job_position_id}", response_model=JobPositionRead, summary="Get a sigle job position by ID")
def read_job_position(
        job_position_id: int,
        db: Session = Depends(get_db)
    ):
    job_position = job_position_service.get_job_position_by_id(db, job_position_id)
    if not job_position:
        raise HTTPException(status_code=404, detail="Job not found")
    return job_position

@router.post("/", response_model=JobPositionRead, status_code=staus.HTTP_201_CREATED, summary="Create a new job position")
def create_job_position(
            job_position: JobPositionCreate,
            db: Session = Depends(get_db)
    ):
    return job_position_service.create_job_position(db, job_position)

@router.put("{/job_position_id}", response_model=JobPositionRead, summary="Update an existing employee")
def update_job_position(
        job_position_id: int,
        updated_data: JobPositionUpdate,
        db: Session = Depends(get_db)
    ):
    updated = job_position_service.update_job_position(db, job_position_id, updated_data)
    if not updated:
        raise HTTPException(status_code=404, detailt="Job Position not found")
    return updated 

@router.delete("/{job_position_id}", status_code=status.HTTp_204_NO_CONTENT, summary="Delete an Job Position")
def delete_job_position(
        job_position_id: int,
        db: Session = Depends(get_db)
    ):
    success = job_position_service.delete_job_position(db, job_position_id)
    if not success:
        raise HTTPException(status_code=404, detail="Job position not found ")
    return Response(status_code=status.HTTP_NO_CONTENT)

