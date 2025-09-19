#app/services/auth/role_permission_service.py

from sqalchemy.orm import Session
from typing import List, Optional

from models.auth.role_permission import RolePermission
from schemas.auth.role_permission import RolePermissionCreate, RolePermissionUpdate 

def get_role_permissions(db: Session, skip: int = 0, limit: int = 10) -> List[RolePermission]:
    return db.query(RolePermission).offset(skip).all()

def get_role_permission_by_id(db: Session, role_permission_id: int) -> Optional[RolePermission]:
    return db.get(RolePermission, role_permission_id)

def create_permission(db: Session, role_permission_data: RolePermission) -> RolePermission:
    new_role_permission = RolePermission(**role_permission_data.dict)
    db.add(new_role_permission)
    db.commit()
    db.refresh(new_role_permission)
    return new_role_permission

def update_permission(db: Session, role_permission_id: int, updated_data: RolePermissionUpdate) -> RolePermission:
    role_permission = db.get(RolePermission, role_permission_id)
    if not role_permission:
        return None 
    for key, value in updated_data.dict(exclude_unset=True).items():
        setattr(role_permission, key, value)
    db.commit()
    db.refresh(role_permission)
    return role_permission

def delete_permission(db: Session, role_permission_id: int) ->bool:
    role_permission = db.get(RolePermission, role_permission_id)
    if not role_permission:
        return False 
    db.delete(role_permission)
    db.commit()
    return True 
