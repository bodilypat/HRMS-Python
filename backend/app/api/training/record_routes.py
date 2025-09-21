#app/api/training/record_routes.py

from fastapi import APIRouter, Depends, HTTPException, Query, status 
from sqlalchemy.orm import Session
from typing import List 

from schemas.training.record  import TrainingRecordCreate, TrainingRecordUpdate, TrainginRecordRead
from db.session import get_db 
from services.training import record_service 

router = APIRouter(prefix="/records", tags=["Records"])

@router.get("/", response_model=TrainginRecordRead, summary="Get a list of Training Records")
def read_records(
        skip: int = Query(0, ge=0),
        limit: int = Query(10, le=100),
        db: Session = Depends(get_db)
    ):
    return record_service.get_all_record(db, skip, limit)

@router.get("/{record_id}", response_model=TrainginRecordRead, summary="Get a Training Record by ID")
def read_read(
        record_id: int,
        db: Session = Depends(get_db)
    ):
    record = record_service.get_record_by_id(db, record_id)
    if not record:
        raise HTTPException(status_code=404, detail="Training Record not found")
    return record 

@router.post("/", response_model=TrainginRecordRead, status_code=status.HTTP_201_CREATED, summary="Create a new Training Record ")
def create_record(
        record: TrainingRecordCreate,
        db: Session = Depends(get_db)
    ):
    return record_service.create_record(db, record)

@router.put("/{record_id}", response_model=TrainginRecordRead, summary="Update an existing Training Record ")
def update_record(
        record_id: int,
        updated_data: TrainingRecordUpdate,
        db: Session = Depends(get_db)
    ):
    updated = record_service.update_record(db, record_id, updated_data)
    if not updated:
        raise HTTPException(status_code=404, detail="Training Record not found")
    return updated 

@router.delete("/{record_id}", status_code=status.HTTP_204_NO_CONTENT, summary="Delete Training Record")
def delete_record(
        record_id: int,
        db: Session = Depends(get_db)
    ):
    success = record_service.delete_record(db, record_id)
    if not success:
        raise HTTPException(status_code=404, detailt="Training Record not found")
    return Response(status_code=status.HTTP_NO_CONTENT)