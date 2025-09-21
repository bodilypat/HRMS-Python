#app/api/attendance/attendance_routes.py

from fastapi import APIRouter, Depends, HTTPException, status, Query, Response
from sqlachemy.orm import Session
from typing import List 

from schemas.attendance.attendance import AttendanceCreate, AttendanceUpdate, AttendanceRead
from db.session import get_db
from services.attendance import attendance_service 

router = APIRouter(prefix="/attendances", tags=["Attendances"])

@router.get("/", response_model=List[AttendanceRead], summary="Get a list of Attendance" )
def read_attendance(
        skip: int = Query(0, ge=0),
        limit: int = Query(10, le=100),
        db: Session  = Depends(get_db)
    ):
    return attendance_service.get_all_attendance(db, skip, limit)

@router.get("{attendance_id}", response_model=AttendanceRead, summary="Get a single Attendance by ID")
def read_attendance(
        attendance_id: int,
        db: Session = Depends(get_db)        
    ):
    attendance = attendance_service.get_attendance_by_id(db, attendance_id)
    if not attendance:
        raise HTTPException(status_code=404, detail="Attendancen not found")
    return attendance 

@router.post("/", response_model=AttendanceRead, status_code=status.HTTP_201_CREATED, summary="Create a new Attendance")
def create_attendance(
        attendance: AttendanceCreate,
        db: Session = Depends(get_db)
    ):
    return attendance_service.create_attendance(db, attendance)

@router.put("/{attendance_id}", response_model=AttendanceRead, summary="Update an existing Attedance")
def update_attendance(
        attendance_id: int,
        updated_data: AttendanceUpdate,
        db: Session = Depends(get_db)
    ):
    updated = attendance_service.update_attendance(db, attendance_id, updated_data)
    if not updated:
        raise HTTPException(status_code=404, detail="Attendance not found")
    return updated 

@router.delete("/{attendance_id}", status_code=status.HTTP_204_NO_CONTENT, summary="Delete an employee")
def delete_attendance(
        attendance_id: int,
        db: Session = Depends(get_db)
    ):
    success = attendance_service.delete_attendance(db, attendance_id)
    if not success:
        raise HTTPException(status_code=404, detail="Attendance not found")
    return Response(status_code=status.HTTP_204_NO_CONTENT)