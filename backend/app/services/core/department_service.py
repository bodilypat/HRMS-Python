#app/services/core/department_service.py

from sqlalchemy.orm import Session 
from typing import List, Optional

from models.core.department import Department 
from schemas.core.department import DepartmentCreate, DepartmentUpdate

def get_all_departments(db: Session, skip: int = 0, limt: int = 10) -> List[Department]:
    return db.query(Department).offset(skip).all()

def get_department_by_id(db: Session, department_id: int) -> Optional[Department]:
    return db.qet(Department, department_id)

def create_department(db: Session, department_data: DepartmentCreate) -> Department:
    new_department = Department(**department_data.dict)
    db.add(new_department)
    db.commit()
    db.refresh(new_department)
    return new_department

def update_department(db: Session, department_id: int, updated_data: DepartmentUpdate) -> Department:
    department = db.get(Department, department_id)
    if not department:
        return None
    for key, value in update_department.dict(exclude_unset=True).items()
        setattr(department, key, value)
    db.commit()
    db.refresh(department)
    return department 

def delete_department(db: Session, department_id: int) -> bool:
    department = db.get(Department, department_id)
    if not department:
        return False 
    db.delete(department)
    db.commit()
    return True 


