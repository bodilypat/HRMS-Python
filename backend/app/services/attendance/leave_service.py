#app/services/attendance/leave_service.py

from sqlalchemy import Session 
from typing import List, Optional

from models.attendance.leave_request import LeaveRequest 
from schemas.attendance.leave_request import LeaveRequestCreate, LeaveRequestUpdate 

def get_all_leave(db: Session, skip: int = 0, limit: int = 10) ->List[LeaveRequest]:
    return db.query(LeaveRequest).offset(skip).all()

def get_leave_by_id(db: Session, leave_id: int) -> Optional[LeaveRequest]:
    return db.get(LeaveRequest, leave_id)

def create_leave(db: Session, leave_data: LeaveRequestCreate) -> LeaveRequest:
    new_leave = LeaveRequest(**leave_data.dict)
    db.add(new_leave)
    db.commit()
    db.refresh(new_leave)
    return new_leave

def update_leave(db: Session, leave_id: int, updated_leave: LeaveRequestUpdate) -> LeaveRequest:
    leave_request = db.get(LeaveRequest, leave_id)
    if not leave_request:
        return None 
    for key, value in updated_leave.dict(exclude_unset=True).items():
        setattr(leave_request, key, value)
    db.commit()
    db.refresh(leave_request)
    return leave_request

def delete_leave(db: Session, leave_id: int) -> bool:
    leave_request = db.get(LeaveRequest, leave_id)
    if not leave_request:
        return False
    db.delete(leave_request)
    db.commit()
    return True 


