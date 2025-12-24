#app/schemas/attendance.py

from pydantic import BaseModel
from datetime import datetime, date
from typing import Optional

class AttendanceBase(BaseModel):
    employee_id: int
    date: date
    check_in: Optional[datetime] = None
    check_out: Optional[datetime] = None
    status: Optional[str] = "present"  #  present, absent, on_leave
    notes: Optional[str] = None

class Config:
        orm_attributes = True
