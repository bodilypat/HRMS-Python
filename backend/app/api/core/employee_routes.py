#app/api/core/employee_routes.py
	
from fastapi import APIRouter, Depends, HTTPException, status , Query, Response
from sqlalchemy.orm import Session
from typing import List 

from schemas.core.employee import EmployeeCreate, EmployeeUpdate, EmployeeRead 
from db.session import get_db 
from services.core import employee_service

router = APIRouter(prefix="/employees", tags=["Employees"])

@router.get("/", response_model=List[EmployeeRead], summary="Get a list of employees")
def read_employees(
        skip: int = Query(0, ge=0), 
        limit: int = Query(10, le=100), 
        db: Session = Depends(get_db)
    ):
	return employee_service.get_all_employees(db, skip, limit)
	
@router.get("/{employee_id}", response_model=EmployeeRead, summary="Get a single employee by ID")
def read_employee(
        employee_id: int, 
        db: Session = Depends(get_db)
    ):
    employee = employee_service.get_employee_by_id(db, employee_id)
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    return employee
  
@router.post("/", response_model=EmployeeRead, status_code=status.HTTP_201_CREATED, summary="Create a new employee ")
def create_employee(
        employee: EmployeeCreate, 
        db: Session = Depends(get_db)
    ):
    return employee_service.create_employee(db, employee)
   
@router.put("/{employee_id}", response_model=EmployeeRead, summary="Update an existing employee")
def update_employee(employee_id: int, updated_data: EmployeeUpdate, db: Session = Depends(get_db)):
    updated = employee_service.update_employee(db, employee_id, updated_data)
    if not updated:
        raise HTTPException(status_code=404, detail="Employee not found")
    return updated
       
@router.delete("/{employee_id}", status_code=status.HTTP_204_NO_CONTENT, summary="Delete an employee")
def delete_employee(employee_id:int, db: Session = Depends(get_db)):
    success = employee_service.delete_employee(db, employee_id)
    if not success:
        raise HTTPException(status_code=404, detail="Employee not found")
    return Response(status_code=status.HTTP_NO_CONTENT)
       
        
    