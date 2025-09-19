#app/services/attendance/attendance_service.py

from sqlalchemy.orm import Session
from typing import List, Optional

from models.attendance.attendance import Attendance 
from schemas.attendance.attendance import AttendanceCreate, AttendanceUpdate 

def get_all_attendances(db: Session, skip: int = 0, limit: int = 10) -> List[Attendance]:
    return db.query(Attendance).offset(skip).all()

def get_attendance_by_id(db: Session, attendance_id: int) -> Optional[Attendance]:
    return db.get(Attendance, attendance_id)

def create_attendance(db: Session, attendance_data: AttendanceCreate) -> Attendance:
    new_attendance = Attendance(**attendance_data.dict)
    db.add(new_attendance)
    db.commit()
    db.refresh(new_attendance)
    return new_attendance

def update_attendance(db: Session, attendance_id: int, updated_attendance: AttendanceUpdate) -> Attendance:
    attendance = db.get(Attendance, attendance_id)
    if not attendance:
        return None 
    for key, value in updated_attendance.dict(exclude_unset=True).items():
        setattr(attendance, key, value)
    db.commit();
    db.refresh(attendance)
    return attendance 

def delete_attendance(db: Session, attendance_id: int) ->bool:
    attendance = db.get(Attendance, attendance_id)
    if not attendance:
        return False 
    db.delete(attendance)
    db.commit()
    return True 