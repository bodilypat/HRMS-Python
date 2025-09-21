#app/api/auth/permission_routes.py 

from fastapi import APIRouter, Depends, HTTPException, Query, Response 
from sqlalchemy.orm import Session
from typing import List

from shemas.auth.permission import PermissionCreate, PermissionUpdate, PermissionRead 
from db.session import get_db
from services.auth import permission_service 

router = APIRouter(prefix="/permissions", tags=["Permissions"])

@router.get("/",response_model=List[PermissionRead], summary="Get a list of Permission")
def read_permissions(
        skip: int = Query(0, ge=0),
        limit: int = Query(10, le=100),
        db: Session = Depends(get_db)
    ):
    return permission_service.get_all_permissions(db, skip, limit)

@router.get("{/permission_id}", response_model=PermissionRead, summary="Get a single Permission by ID")
def read_permission(
        permission_id: int,
        db: Session = Depends(get_db)
    ):
    permission = permission_service.get_permission_by_id(db, permission_id)
    if not permission:
        raise HTTPException(status_code=404, detail="Permission not found")
    return permission

@router.post("/", response_model=PermissionRead, status_code=status.HTTP_201_CREATED, summary=" Create a new permission")
def create_permission(
        permission: PermissionCreate,
        db: Session = Depends(get_db)
    ):
    return permission_service.create_permission(db, permission)

@router.put("/{permission_id}", response_model=PermissionRead, summary="Update an existing Permission")
def update_permission(
        permission_id: int,
        updated_data: PermissionUpdate,
        db: Session = Depend(get_db)
    ):
    updated = permission_service.update_permission(db, permission_id, updated_data)
    if not updated:
        raise HTTPException(status_code=404, detail="Permission not found")
    return updated
