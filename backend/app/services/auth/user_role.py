#app/services/auth/user_role_service.py

from sqlalchemy.orm import Session
from typing import List, Optional

from models.auth.user_role import UserRole 
from schemas.auth.user_role import UserRoleCreate, UserRoleUpdate

def get_all_user_roles(db: Session, skip: int = 0, limit: int = 10) -> List[UserRole]:
    return db.query(UserRole).offset(skip).all()

def get_user_role_by_id(db: Session, user_role_id: int) -> Optional[UserRole]:
    return db.get(UserRole, user_role_id)

def create_user_role(db: Session, user_role_data: UserRoleCreate) -> UserRole:
    new_user_role = UserRole(**user_role_data.dict)
    db.add(new_user_role)
    db.commit()
    db.refresh(new_user_role)
    return new_user_role

def update_user_role(db: Session, user_role_id: int, updated_data: UserRoleUpdate) -> UserRole:
    user_role = db.get(UserRole, user_role_id)
    if not user_role:
        return None 
    for key, value in update_user_role.dict(exclude_unset=True).items():
        setattr(user_role, key, value)
    db.commit()
    db.refresh(user_role)
    return user_role 

def delete_user_role(db: Session, user_role_id: int) -> bool:
    user_role = db.get(UserRole, user_role_id)
    if not user_role:
        return False
    db.delete(user_role)
    db.commit()
    return True 


