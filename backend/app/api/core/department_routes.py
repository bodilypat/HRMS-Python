#app/api/core/department_api.py

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List 

from models.core.department import Department
from schemas.core.department import DepartmentCreate, DepartmentUpdate, DepartmentRead 
from db.session import get_db 

router = APIRouter(prefix="/departments", tags=["Departments"])

@router.get("/", response_model=List[DepartmentRead])
def read_departments(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return db.query(Department).offset(skip).limit(limit).all()

@router.get("/{department_id}", response_model=DepartmentRead)
def read_department(department_id: int, db: Session = Depends(get_db)):
    department = db.query(Department).get(department_id)
    if not department:
        raise HTTPException(status_code=404, detail="Department not found")
    
@router.post("/", response_model=DepartmentRead, status_code=status.HTTP_201_CREATED)
def create_department(department: DepartmentCreate, db: Session = Depends(get_db)):
    db_department = Department(**department.dict())
    db.add(db_department)
    db.commit()
    db.refresh(db_department)
    return db_department

@router.put("/{employee_id}", response_model=DepartmentRead)
def update_department(department_id: int, updated_data: DepartmentUpdate, db: Session = Depends(get_db)):
    department = db.query(Department).get(department_id)
    if not department:
        raise HTTPException(status_code=404, detail="Department not found")
    for key, value in updated_data.dict(exclude_unset=True).items():
        setattr(department, key, value)
    db.commit()
    db.refresh(department)
    return department 

@router.delete("/{department_id}", status_code=status.HTTP_24_NO_CONTENT)
def delete_department(department_id: int, db: Session = Depends(get_db)):
    department = db.query(Department).get(department_id)
    if not department:
        raise HTTPException(status_code=404, detail="Department not found")
    db.delete(department)
    db.commit()
    return 



