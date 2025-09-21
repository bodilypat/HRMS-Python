#app/api/auth/role_routes.py

from fastapi import APIRouter, Depends, HTTPException, Query, Response 
from sqlalchemy.orm import Session
from typing import List 

from schemas.auth.role import RoleCreate, RoleUpdate, RoleRead 
from db.session import get_db 
from services.auth import role_service 

router= APIRouter(prefix="/roles", tags=["Roles"])

@router.get("/", response_model=List[RoleRead], summary="Get a list of Roles")
def read_roles(
        skip: int = Query(0, ge=0),
        limit: int = Query(10, le=100),
        db: Session = Depends(get_db)
    ):
    return role_service.get_all_roles(db, skip, limit)

@router.get("/{role_id}", respose_model=RoleRead, summary="Get a single Role by ID")
def read_role(
        role_id: int,
        db: Session = Depends(get_db)
    ):
    role = role_service.get_role_by_id(db, role_id)
    if not role:
        raise HTTPException(status_code=404, detail="Role not found")
    return role 

@router.post("/", response_model=RoleRead, status_code=status.HTTP_201_CREATED, summary="Create a new Role")
def create_role(
        role_data: RoleCreate,
        db: Session = Depends(get_db)
    ):
    return role_service.create_role(db, role_data)

@router.put("/{role_id}", response_model=RoleRead, summary="Update an existing Role")
def update_role(
        role_id: int,
        updated_data: RoleUpdate,
        db: Session = Depends(get_db)
    ):
    updated = role_service.update_role(db, role_id, updated_data)
    if updated:
        raise HTTPException(status_code=404, detail="Role not found")
    return updated

@router.delete("/{role_d}", status_code=status.HTTP_204_NO_CONTENT, summary="Delete an Role")
def delete_role(
        role_id: int,
        db: Session = Depends(get_db)
    ):
    success = role_service.delete_role(db, role_id)
    if not success:
        raise HTTPException(status_code=404, detail="Role not found")
    return Response(status_code=status.HTTP_204_NO_CONTENT)
