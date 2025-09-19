#app/api/auth/role_routes.py

from fastapi import APIRouter, Depends, HTTPException, status 
from sqlalchemy.orm import Session
from typing import List 

from models.auth.role import Role 
from schemas.auth.role import RoleCreate, RoleUpdate, RoleRead
from db.session import get_db 

router = APIRouter(prefix="/roles", tags=["Roles"])

@router.get("/", response_model=List[RoleRead])
def ge_roles(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return db.query(Role).offset(skip).limit(limit).all()

@router.get("/{role_id}", response_model=RoleRead)
def read_role(role_id: int, db: Session = Depends(get_db)):
    role = db.query(Role).get(role_id)
    if not role:
        raise HTTPException(status_code=404, detail="Role not found")
    return  role 

@router.post("/", response_model=RoleRead, status_code=status.HTTP_201_CREATED)
def create_role(role: RoleCreate, db: Session = Depends(get_db)):
    db.role = Role(**role.dict())
    db.add(db.role)
    db.commit()
    db.refresh(db_role)
    return db.role 

@router.put("/{role_id}", response_model=RoleRead)
def update_role(role_id: int, updated_data: RoleUpdate, db: Session = Depends(get_db)):
    role = db.query(Role).get(role_id)
    if not role:
        raise HTTPException(status_code=404, detail="Role not found")
    for key, value in updated_data.dict(exclude_unset=True).items():
        setattr(role, key, value)
        db.commit()
        db.refresh(role)
        return role 
    
@router.delete("/{role_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_role(role_id: int, db: Session = Depends(get_db)):
    role = db.query(Role).get(role_id)
    if not role:
        raise HTTPException(status_code=404, detail="Role not found")
    db.delete(role)
    db.commit()
    return 

