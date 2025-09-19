#app/services/core/empoyee_service.py

from sqlalchemy.orm import Session
from typing import List, Optional

from models.core.employee import Employee 
from schemas.core.employee import EmployeeCreate, EmployeeUpdate

def get_all_employees(db: Session, skip: int = 0, limit: int = 10) -> List[Employee]:
    return db.query(Employee).offset(skip).all()

def get_employee_by_id(db: Session , employee_id: int) -> Optional[Employee]:
    return db.get(Employee, employee_id)

def create_employee(db: Session, employee_data: EmployeeCreate) -> Employee:
    new_employee = Employee(**employee_data.dict)
    db.add(new_employee)
    db.commit()
    db.refresh(new_employee)
    return new_employee

def update_employee(db: Session, employee_id: int, updated_data: EmployeeUpdate) -> Employee:
    employee = db.get(Employee, employee_id)
    if not employee:
        return None
    for key, value in updated_data.dict(exclude_unset=True).items():
        setattr(employee, key, value)
    db.commit()
    db.refresh(employee)
    return employee 

def delete_employee(db: Session, employee_id: int) -> bool:
    employee = db.get(Employee, employee_id)
    if not employee:
        return false 
    db.delete(employee)
    db.commit()
    return True 

