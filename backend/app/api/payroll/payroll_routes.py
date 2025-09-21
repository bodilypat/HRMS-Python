#app/api/payroll/payroll_routes.py 

from fastapi import APIRouter, Depends, HTTPException, status, Query, Response 
from sqlalchemy.orm import Session 
from typing import List 

from schemas.payroll.payroll import PayrollCreate, PayrollUpdate, PayrollRead 
from db.session import get_db 
from services.payroll import payroll_service 

router = APIRouter(prefix="/Payrolls", tags=["Payrolls"])

@router.get("/", response_model=List[PayrollRead], summary="Get a list all of Payroll")
def read_payrolls(
        skip: int = Query(0, ge=0),
        limit: int = Query(10, le=100),
        db: Session = Depends(get_db)
    ):
    return payroll_service.get_all_payroll(db, skip, limit)

@router.get("/{payroll_id}", response_model=PayrollRead, summary="Get a single Payroll by ID")
def read_payroll(
        payroll_id: int,
        db: Session = Depends(get_db)
    ):
    payroll = payroll_service.get_payroll_by_id(db, payroll_id);
    if not payroll:
        raise HTTPException(status_code=404, detail="Payroll not found")
    return payroll

@router.post("/", response_model=PayrollRead, status_code=status.HTTP_201_CREATED, summary="Create a new payroll")
def create_payroll(
        payroll: PayrollCreate,
        db: Session = Depends(get_db)        
    ):
    return payroll_service.create_payroll(db, payroll)

@router.put("/{payroll_id}", response_model=PayrollRead, summary="Update an existing Payroll")
def update_payroll(
        payroll_id: int,
        updated_data: PayrollUpdate,
        db: Session = Depends(get_db)
    ):
    updated = payroll_service.update_payroll(db, payroll_id, updated_data)
    if not updated:
        raise HTTPException(status_code=404, detail="Prayroll not found")
    return updated 

@router.delete("/payroll_id", status_code=status.HTTP_204_NO_CONTENT, summary="Delete Payroll")
def delete_payroll(
        payroll_id: int,
        db: Session = Depends(get_)        
    ):
    success = payroll_service.delete_payroll(db, payroll_id)
    if not success:
        raise HTTPException(status_code=404, detail="payroll not found")
    return Response(status_code=status.HTTP_NO_CONTENT)