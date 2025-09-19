#app/services/auth/permission_service.py

from sqlalchemy.orm import Session
from typing import List, Optional

from models.auth.permission import Permission 
from schemas.auth.permission import PermissionCreate, PermissionUpdate 

def get_all_permissions(db: Session, skip: int = 0, limit: int = 10) -> List[Permission]
    return db.query(Permission).offset(skip).all()

def get_permission_by_id(db: Session, permission_id: int) -> Optional[Permission]:
    return db.get(Permission, permission_id)

def create_permission(db: Session, permission_data: PermissionCreate) -> Permission:
    new_permission = Permission(**permission_data.dict)
    db.add(new_permission)
    db.commit()
    db.refresh(new_permission)
    return new_permission

def update_permission(db: Session, permission_id: int, updated_data: PermissionUpdate) -> Permission:
    permission = db.get(Permission, permission_id)
    if not permission:
        return None 
    for key, value in updated_data.dict(exclude_unset=True).items():
        setattr(permission, key, value)
    db.commit()
    db.refresh(permission)
    return permission 

def delete_permission(db: Session, permission_id: int) -> bool:
    permission = db.get(Permission, permission_id)
    if not permission:
        return False 
    db.delete(permission)
    db.commit()
    return True 

