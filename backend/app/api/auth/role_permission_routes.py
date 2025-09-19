#app/api/auth/role_permission_routes.py

from fastapi import APIRouter, Depends, HTTPException, status 
from sqlalchemy.orm import Session
from typing import List 

from models.auth.role_permission import RolePermission 
from schemas.auth.role_permission import RolePermissionCreate, RolePermissionUpdate, RolePermissionRead 
from db.session import get_db

router = APIRouter(prefix="/role_permissions", tags=["Role Permissions"])

@router.get("/", response_model=List["RolePermissionRead"])
def read_role_permissions(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return db.query(RolePermission).offset(skip).limit(limit).all()

@router.get("/{role_permission_id}", response_model=RolePermissionRead)
def read_role_permission(role_permission_id: int, db: Session = Depends(get_db)):
    role_permission = db.query(RolePermission).get(role_permission_id)
    if not role_permission:
        raise HTTPException(status_code=404, detail="Role Permission not found")
    return role_permission

@router.post("/", response_model=RolePermissionRead, status_code=status.HTTP_201_CREATED)
def create_role_permission(role_permission: RolePermissionCreate, db: Session = Depends(get_db)):
    db_role_permission = RolePermission(**role_permission.dict())
    db.add(db_role_permission)
    db.commint()
    db.refresh(db_role_permission)
    return db_role_permission

@router.put("/{role_permission_id}", response_model=RolePermissionRead)
def update_role_permission(role_permission_id: int, updated_data: RolePermissionUpdate, db: Session = Depends(get_db)):
    role_permission = db.query(RolePermission).get(role_permission_id)
    if not role_permission:
        raise HTTPException(status_code=404, detail="Role Permission not dound")
    for key, value in updated_data.dict(exclude_unset=True).items():
        setattr(role_permission, key, value)
        db.commit()
        db.refresh(role_permission)
        return role_permission

@router.delete("/{role_permission_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_role_permission(role_permission_id: int, db: Session = Depends(get_db)):
    role_permission = db.query(RolePermission).get(role_permission_id)
    if not role_permission:
        raise HTTPException(status_code=404, detail="Role Permission not found")
    db.delete(role_permission)
    db.commit()
    return

