#app/api/routes/attendence.py

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.api.deps import get_current_user
from app.schemas.attendence import  AttendenceResponse
from app.services.attendence_service import clock_in_out

router = APIRouter(prefix="/attendence", tags=["Attendence"])

#----------------------------------------
# Create Attendence Record (Clock In/Out)
#----------------------------------------
@router.post("/clock", response_model=AttendenceResponse)
def mark_attendence(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    """
    Mark attendence (Clock In/Out) for the current user.
    """
    attendence_record = clock_in_out(db, current_user)
    return attendence_record

