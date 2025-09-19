#app/api/payroll/payroll_route.py 

from fastapi import APIRouter, Depends, HTTPException, status 
from sqlalchemy.orm import Session
from typing import List 

from models.payroll.payroll import Payroll
from schemas.payroll.payroll import PayrollCreate, PayrollUpdate, PayrollRead 
from db.session import get_db 

router = APIRouter(prefix="/payrolls", tags=["Payrolls"])

@router.get("/", response_mode=List[PayrollRead])
def read_payrolls(skip: int = 0, limit: int = 10, db: Session = Depends(get_db))
    return db.query(Payroll).offset(skip).limit(limit).all()

@router.get("/{payroll_id}", response_model=PayrollRead)
def read_payroll(payroll_id: int, db: Session = Depends(get_db)):
    payroll = db.query(Payroll).get(payroll_id)
    if not payroll:
        raise HTTPException(status_code=404, detail="Payroll not found")
    return payroll

@router.post("/", response_model=PayrollRead, status_code=status.HTTP_201_CREATED)
def create_payroll(payroll: PayrollCreate, db: Session = Depends(get_db)):
    payroll = Payroll(**payroll.dict())
    db.add(payroll)
    db.commit()
    db.refresh(payroll)
    return payroll

@router.put("/{payroll_id}", response_model=PayrollUpdate)
def update_payroll(payroll_id: int, updated_data: PayrollUpdate, db: Session = Depends(get_db)):
    payroll = db.query(Payroll).get(payroll_id)
    if not payroll:
        raise HTTPException(status_code=404, detail="Payroll not found")
    for key, value in updated_data.dict(exclude_unset=True).items():
        setattr(payroll, key, value)
        db.commit()
        db.refresh(payroll)
        return payroll 
    
@router.delete("/{payroll_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_payroll(payroll_id: int, db: Session = Depends(get_db)):
    payroll = db.query(Payroll).get(payroll_id)
    if not payroll:
        raise HTTPException(status_code=404, detail="payroll not found")
    db.delete(payroll)
    db.commit()
    return 

