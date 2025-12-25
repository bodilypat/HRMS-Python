#app/services/employee_service.py

from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from fastapi import HTTPException, status 
from typing import List, Optional

from app.models.employee import Employee
from app.models.department import Department
from app.models.designation import Designation
from app.schemas.employee import EmployeeCreate, EmployeeUpdate
from app.models.user import User


#----------------------------------------
# Create Employee
#----------------------------------------
def create_employee(
        db: Session, 
        employee: EmployeeCreate, 
        created_by: Optional[int]
    ) -> Employee:
    """
    Create a new employee record.
    """

    # Validate department
    department = db.query(Department).filter(Department.id == employee.department_id).first()

    if not department:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Department with id {employee.department_id} does not exist."
        )
    
    # Validate designation
    designation = db.query(Designation).filter(Designation.id == employee.designation_id).first()
    if not designation:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Designation with id {employee.designation_id} does not exist."
        )
    
    new_employee = Employee(
        first_name=employee.first_name,
        last_name=employee.last_name,
        email=employee.email,
        phone_number=employee.phone_number,
        department_id=employee.department_id,
        designation_id=employee.designation_id,
        hire_date=employee.hire_date,
        is_active=employee.is_active,
        created_by=created_by
    )

    try:
        db.add(new_employee)
        db.commit()
        db.refresh(new_employee)
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Employee with this email already exists."
        )   
        return new_employee
    
#--------------------------------------------
# Get Employee by ID (with ownership support)
#--------------------------------------------
def get_employee_by_id(
        db: Session, 
        employee_id: int, 
        user: Optional[User] = None
    ) -> Employee:
    """
    Retrieve an employee by ID, with optional ownership check.
    """
    if not employee:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Employee with id {employee_id} not found."
        )
    
    # Ownership rule: EMPLOYEE Can only access own record 
    if current_user and current_user.role.name == "EMPLOYEE":
        if employee.created_by != current_user.id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You do not have permission to access this employee record."
            )
    return employee

#-------------------------------------------
# List Employees (Pagination & Soft Delete)
#-------------------------------------------
def list_employees(
        db: Session, 
        skip: int = 0, 
        limit: int = 100, 
        include_inactive: bool = False
    ) -> List[Employee]:
    """
    List employees with pagination and soft delete support.
    """
    query = db.query(Employee)
    
    if not include_inactive:
        query = query.filter(Employee.is_active == True)
    
    employees = query.offset(skip).limit(limit).all()
    return employees

#----------------------------------------
# Update Employee
#----------------------------------------
def update_employee(
        db: Session, 
        employee_id: int, 
        employee_update: EmployeeUpdate
    ) -> Employee:
    """
    Update an existing employee record.
    """
    employee = db.query(Employee).filter(Employee.id == employee_id).first()
    
    if not employee:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Employee with id {employee_id} not found."
        )
    
    # Update fields
    for var, value in vars(employee_update).items():
        if value is not None:
            setattr(employee, var, value)
    
    try:
        db.commit()
        db.refresh(employee)
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
    
    return employee

#----------------------------------------
# Soft Delete Employee
#----------------------------------------
def soft_delete_employee(
        db: Session, 
        employee_id: int
    ) -> None:
    """
    Soft delete an employee by setting is_active to False.
    """
    employee = db.query(Employee).filter(Employee.id == employee_id).first()
    
    if not employee:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Employee with id {employee_id} not found."
        )
    
    employee.is_active = False
    
    try:
        db.commit()
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
    
    return None

    