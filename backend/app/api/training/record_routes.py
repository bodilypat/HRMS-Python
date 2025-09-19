#app/api/training/record_routes.py

from fastapi import APIRouter, Depends, HTTPException, status 
from sqlalchemy.orm import Session 
from typing import List 

from models.training.record import TrainingRecord 
from schemas.trainging.record import TrainingRecordCreate, TrainingRecordUpdate, TrainingRecordRead 
from db.session import get_db 

router = APIRouter(prefix="/records", tags=["Records"])

@router.get("/", response_model=List[TrainingRecordRead])
def read_records(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return db.query(TrainingRecord).offset(skip).limit(limit).all()

@router.get("/{record_id}", respose_model=TrainingRecordRead)
def read_record(record_id: int, db: Session = Depends(get_db)):
    training_record=db.query(TrainingRecord).get(record_id)
    if not training_record:
        raise HTTPException(status_code=404, detail="Training Record not found")
    return training_record 

@router.post("/", response_model=TrainingRecord, status_code=status.HTTP_201_CREATED)
def create_record(record: TrainingRecordCreate, db: Session = Depends(get_db)):
    training_record = TrainingRecord(**record.dict())
    db.add(training_record)
    db.commit()
    db.refresh(training_record)
    return training_record

@router.put("/", response_model=TrainingRecordRead)
def update_record(record_id: int, updated_data: TrainingRecordUpdate, db: Session = Depends(get_db)):
    training_record = db.query(TrainingRecord).get(record_id)
    if not record:
        raise HTTPException(status_code=404, detail="Training Record not found")
    for key, value in update_data.dict(exclude_unset=True).items()
        setattr(record, key, value)
        db.commit()
        db.refresh(training_record)
        return training_record
    
@router.delete("{record_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_record(record_id: int, db: Session = Depends(get_db)):
    training_record = db.query(TrainingRecord).get(record_id)
    if not training_record:
        raise HTTPException(status_code=404, detail="Training record not found")
    db.delete(training_record)
    db.commit()
    return
