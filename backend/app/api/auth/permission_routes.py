#app/api/auth/permission_routes.py

from fastapi import APIRouter, Depends, HTTPException, status 
from sqlalchemy.orm import Session
from typing import List 

from models.auth.permission import Permission 
from schemas.auth.permission import PermissionCreate, PermissionUpdate, PermissionRead 
from db.session import get_db 

router = APIRouter(prefix="/permissions", tags=["Permissions"])

@router.get("/", response_model=List[PermissionRead])
def read_permissions(skip: int = 0, limit: int =10, db: Session = Depends(get_db)):
    return db.query(Permission).offset(skip).limit(limit).all()

@router.get("/{permission_id}", response_model=PermissionRead)
def read_permission(permission_id: int, db: Session = Depends(get_db)):
    permission = db.query(Permission).get(permission_id)
    if not permission:
        raise HTTPException(status_code=404, detail="Permission not found")
    return permission 

@router.post("/", response_model=PermissionRead, status_code=status.HTTP_201_CREATED)
def create_permission(permission: PermissionCreate, db: Session = Depends(get_db)):
    db_permission = Permission(**permission.dict())
    db.add(db_permission)
    db.commit()
    db.refresh(db_permission)
    return db_permission

@router.put("/{permission_id}", response_model=PermissionRead)
def update_permission(permission_id: int, updated_data: PermissionUpdate, db: Session = Depends(get_db)):
    permission = db.query(Permission).get(permission_id)
    if not permission:
        raise HTTPException(status_code=404, detail="Permission not found")
    for key, value in updated_data.dict(exclude_unset=True).items():
        setattr(permission, key, value)
        db.commit()
        db.refresh(permission)
        return permission 
    
@router.delete("/{permission_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_permission(permission_id: int, db: Session = Depends(get_db)):
    permission = db.query(Permission).get(permission_id)
    if not permission:
        raise HTTPException(status_code=404, detail="Permission not found")
    db.delete(permission)
    db.commit()
    return 
