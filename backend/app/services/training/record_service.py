#app/services/training/record_service.py

from sqlalchemy.orm import Session
from typing import List, Optional

from models.training.record import TrainingRecord
from schemas.training.record import TrainingRecordCreate, TraingingRecordUpdate 

def get_all_record(db: Session, skip: int = 0, limit: int = 10) ->List[TrainingRecord]:
    return db.query(TrainingRecord).offset(skip).all()

def get_record_by_id(db: Session, record_id: int) -> optional[TrainingRecord]:
    return db.get(TrainingRecord, record_id)

def create_record(db: Session, record_data: TrainingRecordCreate) ->TrainingRecord:
    new_record = TrainingRecord(**record_data.dict)
    db.add(new_record)
    db.commit()
    db.refresh(new_record)
    return new_record

def update_record(db: Session, record_id: int, updated_data: TraingingRecordUpdate) -> TraingingRecord:
    record = db.get(TrainingRecord, record_id)
    if not record:
        return None 
    for key, value in update_record.dict(exclude_unset=True).items():
        setattr(record, key, value)
    db.commit()
    db.refresh(record)
    return record 

def delete_record(db: Session, record_id: int) -> bool:
    record = db.get(TrainingRecord, record_id)
    if not record:
        return False 
    db.delete(record_id)
    db.commit()
    return True 

