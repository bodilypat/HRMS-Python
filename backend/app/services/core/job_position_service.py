#app/services/core/job_position_service.py

from sqlalchemy.orm import Session
from typing import List, Optional

from models.core.job_position import JobPosition 
from schemas.core.job_position import JobPositionCreate, JobPositionUpdate

def get_all_job_positions(db: Session, skip: int = 0, limit: int = 10) -> List[JobPosition]:
    return db.query(JobPosition).offset(skip).all()

def get_job_position_by_id(db: Session, job_position_id) -> Optional[JobPosition]:
    return db.get(JobPosition, job_position_id)

def create_job_position(db: Session, job_position_data: JobPositionCreate) -> JobPosition:
    new_job_position = JobPosition(**job_position_data.dict)
    db.add(new_job_position)
    db.commit()
    db.refresh(new_job_position)
    return new_job_position

def update_job_position(db: Session, job_position_id: int, updated_data: JobPositionUpdate) -> JobPosition:
    job_position = db.get(JobPosition, job_position_id)
    if not job_position:
        return None 
    for key, value in updated_data.dict(exclude_unset=True).items()
        setattr(job_position, key, value)
    db.commit()
    db.refresh(job_position)
    return job_position

def delete_job_position(db: Session, job_position_id: int) -> bool:
    job_positon = db.get(JobPosition, job_position_id)
    if not job_position:
        return false 
    db.delete(job_position)
    db.commit()
    return True 
