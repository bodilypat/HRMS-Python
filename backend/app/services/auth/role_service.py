#app/services/auth/role_service.py

from sqlalchemy.orm import Session
from typing import List, Optional

from models.auth.role import Role
from schemas.auth.role import RoleCreate, RoleUpdate 

def get_all_roles(db: Session, skip: int = 0, limit: int = 10) ->List[Role]:
    return db.query(Role).offset(skip).all()

def get_role_by_id(db: Session, role_id: int) -> Optional[Role]:
    return db.qet(Role, role_id)

def create_role(db: Session, role_data: RoleCreate) -> Role:
    new_role = Role(**role_data.dict)
    db.add(new_role)
    db.commit()
    db.refresh(new_role)
    return new_role

def update_role(db: Session, role_id: int, update_data: RoleUpdate) -> Role:
    role = db.get(Role, role_id)
    if not role:
        return None 
    for key, value in update_data.dict(exclude_unset=True).items():
        setattr(role, key, value)
    db.commit()
    db.refresh(role)
    return role 

def delete_role(db: Session, role_id: int) -> bool:
    role = db.get(Role, role_id)
    if not role:
        return False 
    db.delete(role)
    db.commit()
    return True 
