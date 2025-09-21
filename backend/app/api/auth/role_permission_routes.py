#app/api/auth/role_permission.py

from fastapi import APIRouter, Depends, HTTPException, Query, status 
from sqlalchemy.orm import Session
from typing import List 

from schemas.auth.role_permission import RolePermissionCreate, RolePermissionUpdate, RolePermissionRead 
from db.session import get_db 
from services.auth import role_permission_service 

router = APIRouter(prefix="/role_permissions", tags=["Role Permissions"])

@router.get("/", response_model=List[RolePermissionRead])
def read_role_permissions(
        skip: int = Query(0, ge=0),
        limit: int = Query(10, le=100),
        db: Session = Depends(get_db)
    ):
    return role_permission_service.get_all_role_permissions(db, skip, limit)

@router.get("/{role_permission_id}", response_model=RolePermissionRead, summary="Get a single role permission by ID")
def read_role_permission(
        role_permission_id: int,
        db: Session = Depends(get_db)
    ):
    role_permission = role_permission_service.get_role_permission_by_id(db, role_permission_id)
    if not role_permission:
        raise HTTPException(status_code=404, detail="Get a single role permission by ID")
    return role_permission

@router.post("/", response_model=RolePermissionRead, status_code=status.HTTP_201_CREATED, summary="Create a new Role Permission")
def update_role_permission(
        role_permission: RolePermissionCreate,
        db: Session = Depends(get_db)
    ):
    return role_permission_service.create_role_permission(db, role_permission)

@router.put("/{role_permission_id}", response_model=RolePermissionRead, summary="Update an existing Role Permission")
def update_role_permission(
        role_permission_id: int,
        updated_data: RolePermissionUpdate,
        db: Session = Depends(get_db)
    ):
    updated = role_permission_service.update_role_permission(db, role_permission_id, updated_data)
    if not updated:
        raise HTTPException(status_code=404, detail="Role Permission not found")
    return updated 

@router.delete("/{role_permission_id}", status_code=status.HTTP_204_N0_CONTENT, summary="Delete Role Permission")
def delete_role_permission(
        role_permission_id: int,
        db: Session = Depends(get_db)
    ):
    success = role_permission_service.delete_role_permission(db, role_permission_id)
    if not success:
        raise HTTPException(status_code=404, detail="Role Permission not found")
    return Response(status_code=status.HTTP_NO_CONTENT)
