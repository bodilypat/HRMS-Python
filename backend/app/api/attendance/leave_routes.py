#app/api/attendance/leave_routes.py

from fastapi import APIRouter, Depends, HTTPException, status 
from sqlalchemy.orm import Session
from typing import List

from models.attendance.attendance import LeaveRequest 
from schemas.attendance.attendance import LeaveRequestCreate, LeaveRequestUpdate, LeaveRequestRead 
from db.session import get_db 

router = APIRouter(prefix="/leave_requests", tags=["Leave Requests"])

@router.get("/", response_model=List[LeaveRequestRead])
def read_leaves(skip: int = 0 , limit: limit = 10, db: Session = Depends(get_db)):
    return db.query(LeaveRequest).offset(skip).limit(limit).all()

@router.get("/{leave_id}", response_model=LeaveRequestRead)
def read_leave(leave_id: int , db: Session = Depends(get_db)):
    leave = db.query(LeaveRequest).get(leave_id)
    if not leave:
        raise HTTPException(status_code=404, detail="Leave Request not found")
    return leave

@router.post("/", response_model=LeaveRequestRead, status_code=status.HTTP_201_CREATED)
def create_leave(leave: LeaveRequestCreate, db: Session = Depends(get_db)):
    leave = LeaveRequest(**leave.dict())
    db.add(leave)
    db.commit()
    db.refresh(leave)
    return leave

@router.put("/{leave_id}", response_model=LeaveRequestRead)
def update_leave(leave_id: int, updated_data: LeaveRequestUpdate, db: Session = Depends(get_db)):
    leave = db.query(LeaveRequest).get(leave_id)
    if not leave_request:
        raise HTTPException(status_code=404, detail="Leave Request not found")
    for key, value in updated_data.dict(exclude_unset=True).items():
        setattr(leave, key, value)
    db.commit()
    db.refresh(leave)
    return leave

@router.delete("/{leave_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_leave(leave_id: int, db: Session = Depends(get_db)):
    leave = db.query(LeaveRequest).get(leave_id)
    if not leave:
        raise HTTPException(status_code=404, detail="Leave Request not found")
    db.delete(leave)
    db.commit(leave)
    return 

