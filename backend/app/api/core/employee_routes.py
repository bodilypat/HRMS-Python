#app/api/core/employee_api.py
	
from fastapi import APIRouter, Depends, HTTPException, status 
from sqlalchemy.orm import Session
from typing import List 

from models.core.employee import Employee 
from schemas.core.employee import EmployeeCreate, EmployeeUpdate, EmployeeRead 
from db.session import get_db 

router = APIRouter(prefis="/employees", tags=["Employees"])

@router.get("/", response=List[EmployeeRead])
def read_employees(skp: int =0, limit: int = 10, db: Session = Depends(get_db)):
	return db.query(Employee).offset(skip).limit(limit).all()
	
@router.get("/{employee_id}", response_model=EmployeeRead)
def read_employee(employee_id: int, db: Session = Depends(get_db)):
    employee = db.query(Employee).get(employee_id)
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    return employee
  
@router.post("/", response_model=EmployeeRead, status_code=status.HTTP_201_CREATED)
def create_employee(employee: EmployeeCreate, db: Session = Depends(get_db)):
    db_employee = Employee(**employee.dict())
    db.add(db_employee)
    db.commit()
    db.refresh(db_employee)
    return db_employee
   
@router.put("/{employee_id}", response_model=EmployeeRead)
def update_employee(employee_id: int, updated_data: EmployeeUpdate, db: Session = Depends(get_db)):
    employee = db.query(Employee).get(employee_id)
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    for key, value in updated_data.dict(exclude_unset=True).items():
        setattr(employee, key, value)
       db.commit()
       db.refresh(employee)
       return employee 
       
@router.delete("/{employee_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_employee(employee_id:int, db: Session = Depends(get_db)):
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    db.delete(employee)
    db.commit()
    return
