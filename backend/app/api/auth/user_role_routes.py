#app/api/auth/user_role.py

from fastapi import APIRouter, Depends, HTTPException, status 
from sqlalchemas.orm import Session 
from typing import List 

from models.auth.user_role import UserRole
from schemas.auth.user_role import UserRoleCreate, UserRoleUpdate, UserRoleRead 
from db.session import get_db 

router = APIRouter(prefix="/user_roles", tags=["User Roles"])

@router.get("/", respose_model=List[UserRoleRead])
def read_user_roles(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return db.query(UserRole).offset(skip).limit(limit).all()

@router.get("/{user_role_id}", response_model=UserRole)
def read_user_role(user_role_id: int, db: Session = Depends(get_db)):
    user_role = db.query(UserRole).get(user_role_id)
    if not user_role:
        raise HTTPException(status_code=404, detail="User Role not found")
    return user_role 

@router.post("/", response_model=UserRoleRead, status_code=status.HTTP_201_CREATED)
def create_user_role(user_role: UserRoleCreate, db: Session = Depends(get_db)):
    db_user_role = UserRole(**user_role.dict())
    db.add(db_user_role)
    db.commit()
    db.refresh(db_user_role)
    return db_user_role

@router.put("/{user_role_id}", response_model=UserRoleRead)
def update_user_role(user_role_id: int, updated_data: UserRoleUpdate, db: Session = Depends(get_db)):
    user_role = db.query(UserRole).get(user_role_id)
    if not user_role:
        raise HTTPException(status_code=404, detail="User Role not found") 
    for key, value in updated_data.dict(exclude_unset=True).items():
        setattr(user_role, key, value)
        db.commit()
        db.refresh(user_role)
        return user_role 

@router.delete("/{user_role_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_user_role(user_role_id: int, db: Session = Depends(get_db)):
    user_role = db.query(UserRole).get(user_role_id)
    if not user_role:
        raise HTTPException(status_code=404, detail="User Role not found")
    db.delete(user_role)
    db.commit()
    return

