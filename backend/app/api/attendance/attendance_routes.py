#app/api/attendance/attendance_routes.py

from fastapi import APIRouter, Depends, HTTPException, status 
from sqlalchemy.orm import Session
from typing import List 

from models.attendance.attendance import Attendance
from schemas.attendance.attendance import AttendanceCreate, AttendanceUpdate, AttendanceRead
from db.session import get_db 

router = APIRouter(prefix="/attendances", tags=["Attendances"])

@router.get("/", response_model=List[AttendanceRead])
def read_attendances(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return db.query(Attendance).offset(skip).limit(limit).all()

@router.get("/{attendance_id}", response_model=AttendanceRead)
def read_attendance(attendance_id: int, db: Session = Depends(get_db)):
    attendance = db.query(Attendance).get(attendance_id)
    if not attendance:
        raise HTTPException(status_code=404, detail="Attendance not found")
    return attendance 

@router.post("/", response_model=AttendanceRead, status_code=status.HTTP_201_CREATED)
def create_attendance(attendance: AttendanceCreate, db: Session = Depends(get_db)):
    attendance = Attendance(**attendance.dict())
    db.add(attendance)
    db.commit()
    db.refresh(attendance)
    return attendance

@router.put("/{attendance_id}", response_model=AttendanceRead)
def update_attendance(attendance_id: int, updated_data: AttendanceUpdate, db: Session = Depends(get_db)):
    attendance = db.query(Attendance).get(attendance_id)
    if not attendance:
        raise HTTPException(status_code=404, detail="Attendance not found")
    for key, value in updated_data.dict(exclude_unset=True).items():
        setattr(attendance, key, value)
        db.commit()
        db.refresh(attendance)
        return attendance
    
@router.delete("/{attendance_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_attendance(attendance_id: int, db: Session = Depends(get_db)):
    attendance = db.query(Attendance).get(attendance_id)
    if not attendance:
        raise HTTPException(status_code=404, detail="Attendance not found")
    db.delete(attendance)
    db.commit()
    return 

