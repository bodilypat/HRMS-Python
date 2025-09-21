#app/api/attendance/leave_routes.py

from fastapi import APIRouter, Depends, HTTPException, status, Query, Response 
from sqlalchemy.orm import Session 
from typing import List 

from schemas.attendance.leave import LeaveRequestCreate, LeaveRequestUpdate, LeaveRequestRead 
from db.session import get_db 
from services.attendance import leave_service 

router = APIRouter(prefix="/leave_requests", tags=["Leave Requests"])

@router.get("/", response_model=List[LeaveRequestRead], summary="Get a list of Attendances")
def read_leaves(
        skip: int = Query(0, ge=0),
        limit: int = Query(10, le=100),
        db: Session = Depends(get_db)
    ):
    return leave_service.get_all_leave(db, skip, limit)

@router.get("/{leave_id}", response_model=LeaveRequestRead, summary="Get a single Leave Request by ID")
def read_leave(
        leave_id: int,
        db: Session = Depends(get_db)
    ):
    leave = leave_service.get_leave_by_id(db, leave_id)
    if not leave:
        raise HTTPException(status_code=404, detail="Leave Request not found")
    return leave 

@router.post("/", response_model=LeaveRequestRead, status_code=status.HTTP_201_CREATED, summary="Create a new Leave Request")
def create_leave(
        leave_request: LeaveRequestCreate,
        db: Session = Depends(get_db)
    ):
    return leave_service(db, leave_request)

@router.put("/{leave_id}", response_model=LeaveRequestRead, summary="Update an existing Leave Request")
def update_leave(
        leave_id: int,
        updated_data: LeaveRequestUpdate,
        db: Session = Depends(get_db)
    ):
    updated = leave_service.update_leave(db, leave_id, updated_data)
    if not updated:
        raise HTTPException(status_code=404, detail="Leave Request not found")
    return updated 

@router.delete("/{leave}", status_code=status.HTTP_204_NO_CONTENT, summary="Delete an Leave Request")
def delete_leave(
        leave_id: int,
        db: Session = Depends(get_db)
    ):
    success = leave_service.delete_leave(db, leave_id)
    if not success:
        raise HTTPException(status_code=404, detail="Leave Request not found")
    return Response(status_code=status.HTTP_NO_CONTENT)