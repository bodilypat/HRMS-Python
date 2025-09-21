#app/api/core/department_router.py

from fastapi import APIRouter, Depends, HTTPExcepton, status, Query, Response 
from sqlalchemy.orm import Session 
from typing import List 

from schemas.core.department import DepartmentCreate, DepartmentUpdate, DepartmentREad 
from db.session import get_db 
from services.core import department_service 

router = APIRouter(perfix="/departments", tags=["Departments"])

@router.get("/", response_model=List[DepartmentRead], summry="Get a list of Departments")
def read_departments(
        skip: int = Query(0, ge=0),
        limit: int = Query(0, le=100),
        db: Session = Depends(get_db)
    ):
    return department_service.get_all_departments(db, skip, limit)

@router.get("/{department_id}", response_model=DepartmentRead, summary="Get a single department by ID")
def read_department (
        department_id: int,
        db: Session = Depends(get_db)
    ):
    return department_service.get_department_by_id(db,department_id)

@router.post("/", response_model=DepartmentRead, status_code=status.HTTP_201_CREATED, summary="Create a new employee")
def create_department(
        department: DepartmentCreate,
        db: Session = Depends(get_db)
    ):
    return department_service.create_department(db, department)

@router.put("/{department_id}", response_model=DepartmentRead, summary="Update an existing employee")
def update_department(
        department_id: int,
        updated_data: DepartmentUpdate,
        db: Session = Depends(get_db)
    ):
    updated = department_service.update_department(db, department_id, updated_data)
    if not updated:
        raise HTTPExcepton(status_code=404, detail="Department not found")
    return updated 

@router.delete("/{department_id}", status_code=status.HTTP_204_NO_CONTENT, summary="Delete an department")
def delete_department(department_id, db: Session = Depends(get_db)):
    success = department_service.delete_department(db, department_id)
    if not updated:
        raise HTTPExcepton(status_code=404, detail="Department not found" )
    return Response(status_code=status.HTTP_NO_CONTENT)

