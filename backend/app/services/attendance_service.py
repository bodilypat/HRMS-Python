#app/services/attendance_service.py

from sqlalchemy.orm import Session
from datetime import datetime, date 
from fastapi import HTTPException
from app.models.attendance import Attendance
from app.models.shift import Shift

#----------------------------------
# Clock in out service
#----------------------------------
def clock_in_out(db: Session, employee_id: int):
    today = date.today()
    attendance_record = db.query(Attendance).filter(
        Attendance.employee_id == employee_id,
        Attendance.date == today
    ).first()

    if attendance_record:
        # If clock_out is already set, raise an error
        if attendance_record.clock_out:
            raise HTTPException(status_code=400, detail="Employee has already clocked out for today.")
        
        # Update clock_out time
        attendance_record.clock_out = datetime.utcnow()
        db.commit()
        db.refresh(attendance_record)
        return attendance_record
    else:
        # Create new attendance record with clock_in time
        new_attendance = Attendance(
            employee_id=employee_id,
            date=today,
            clock_in=datetime.utcnow(),
            status='present'
        )
        db.add(new_attendance)
        db.commit()
        db.refresh(new_attendance)
        return new_attendance
    
    
    