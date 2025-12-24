#app/sevices/employee_service.py

from sqlalchemy.orm import Session
from fastapi import HTTPException, status 
from app.models.employee import Employee
from app.models.department import Department
from app.models.designation import Designation
from app.schemas.employee_schema import EmployeeCreate, EmployeeUpdate

#----------------------------------
# Create Employee
#----------------------------------
def create_employee(db: Session, employee: EmployeeCreate) -> Employee:
    # Check if email or phone number already exists
    existing_employee = db.query(Employee).filter(
        (Employee.email == employee.email) | 
        (Employee.phone_number == employee.phone_number)
    ).first()
    if existing_employee:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Employee with this email or phone number already exists."
        )
    
    # Fetch department and designation
    department = db.query(Department).filter(Department.name == employee.department).first()
    designation = db.query(Designation).filter(Designation.title == employee.position).first()
    
    if not department or not designation:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid department or position."
        )
    
    new_employee = Employee(
        first_name=employee.first_name,
        last_name=employee.last_name,
        email=employee.email,
        phone_number=employee.phone_number,
        department_id=department.id,
        designated_id=designation.id,
        hire_date=employee.hire_date,
        is_active=employee.is_active
    )
    
    db.add(new_employee)
    db.commit()
    db.refresh(new_employee)
    
    return new_employee
#----------------------------------
# Get Employee by ID
#----------------------------------
def get_employee(db: Session, employee_id: int) -> Employee:
    employee = db.query(Employee).filter(Employee.id == employee_id).first()
    if not employee:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Employee not found."
        )
    return employee
#----------------------------------
# Get All Employees
#----------------------------------
def get_employees(db: Session, page: int = 1, limit: int = 10) -> list[Employee]:
    offset = (page - 1) * limit
    return db.query(Employee).offset(offset).limit(limit).all()
#----------------------------------
# Update Employee
#----------------------------------
def update_employee(db: Session, employee_id: int, employee_update: EmployeeUpdate) -> Employee:
    employee = get_employee(db, employee_id)
    
    for var, value in vars(employee_update).items():
        if value is not None:
            setattr(employee, var, value)
    
    db.commit()
    db.refresh(employee)
    
    return employee
#----------------------------------
# Delete Employee
#----------------------------------
def delete_employee(db: Session, employee_id: int) -> None:
    employee = get_employee(db, employee_id)
    db.delete(employee)
    db.commit()
    return None
