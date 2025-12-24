#app/api/routes/employees.py

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from app.database.session import get_db
from app.schemas.employee import EmployeeCreate, EmployeeResponse, EmpoyeeUpdate
from app.services.employee_service import (create_employee, get_employee, get_employees, update_employee, delete_employee)
from app.middleware.rbac import require_role

router = APIRouter(prefix="/employees", tags=["employees"])
#-------------------------------
# Create Employee
#-------------------------------
@router.post(
        "/", response_model=EmployeeResponse, 
        dependencies=[Depends(require_role("admin"))]
    )
def create_employee_endpoint(
        employee: EmployeeCreate, 
        db: Session = Depends(get_db)
    ):
    return create_employee(db, employee)

#-------------------------------
# Get Employee by ID
#-------------------------------
@router.get(
        "/{employee_id}", 
        response_model=EmployeeResponse, 
        dependencies=[Depends(require_role("user"))]
    )
def get_employee_endpoint(
        employee_id: int, 
        db: Session = Depends(get_db)
    ):
    return get_employee(db, employee_id)

#-------------------------------
# Get All Employees
#-------------------------------
@router.get(
        "/", 
        response_model=List[EmployeeResponse], 
        dependencies=[Depends(require_role("ADMIN", "HR"))]
    )
def get_employees(page: int = 1, limit: int = 10, db: Session = Depends(get_db)):
    return get_employees(db, page=page, limit=limit)

#-------------------------------
# Update Employee
#-------------------------------
@router.put(
        "/{employee_id}", 
        response_model=EmployeeResponse, 
        dependencies=[Depends(require_role("admin"))]
    )
def update_employee_endpoint(
        employee_id: int, 
        employee: EmpoyeeUpdate, 
        db: Session = Depends(get_db)
    ):
    return update_employee(db, employee_id, employee)

#-------------------------------
# Delete Employee
#-------------------------------
@router.delete(
        "/{employee_id}", 
        dependencies=[Depends(require_role("admin"))]
    )
def delete_employee_endpoint(
    employee_id: int, 
    db: Session = Depends(get_db)
):
    return delete_employee(db, employee_id)




