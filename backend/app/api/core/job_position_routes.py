#app/api/core/job_position_api.py

from fastapi import APIRouter, Depends, HTTPException, status 
from sqlalchemy.orm import Session 
from typing import List 

from models.core.job_position import JobPosition
from schemas.core.job_position import JobPositionCreate,  JobPositionUpdate, JobPositionRead 
from db.session import get_db 

router = APIRouter(prefix="/job_positions", tags=["JobPositions"])

@router.get("/", response_model=List[JobPositionRead])
def read_job_positions(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return db.query(JobPosition).offset(skip).limit(limit).all()

@router.get("/{job_position_id}", response_model=JobPositionRead)
def read_job_position(job_position_id: int, db: Session = Depends(get_db)):
    job_position = db.query(JobPosition).get(job_position_id)
    if not job_position:
        raise HTTPException(status_code=404, delail="Job Position not found")
    return job_position

@router.post("/", response_model=JobPositionRead, status_code=status.HTTP_201_CREATED)
def create_job_position(job_position: JobPositionCreate, db: Session = Depends(get_db)):
    db_job_position = JobPosition(**job_position.dict())
    db.add(db_job_position)
    db.commit()
    db.refresh(db_job_position)
    return db_job_position

@router.put("/{job_position_id}", response_model=JobPositionRead)
def update_job_position(job_position_id: int, updated_data: JobPositionUpdate, db: Session = Depends(get_db))
    job_position = db.query(JobPosition).get(job_position_id)
    if not job_position:
        raise HTTPException(status_code=404, detail="Job Position not found")
    for key, value in updated_data.dict(exclude_unset=True).items():
        setattr(job_position, key, value)
        db.commit()
        db.refresh(job_position)
        return job_position
@router.delete("/{job_position_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_job_position(job_position_id, db: Session = Depends(get_db)):
    job_position = db.query(JobPosition).get(job_position)
    if not job_position:
        raise HTTPException(status_code=404, detail="Job position not found")
    db.delete(job_position)
    db.commit()
    return 



