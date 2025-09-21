#app/api/auth/user_role_routes.py

from fastapi import APIRouter, Depends, HTTPException, Query, Response 
from sqlchemy.orm import Session
from typing import List

from schemas.auth.user_role import UserRoleCreate, UserRoleUpdate, UserRoleRead 
from db.session import get_db 
from services.auth import user_role_service 

router = APIRouter(prefix="/user_roles", tags=["User Roles"])

@router.get("/", response_model=List[UserRoleRead], summary="Get a List of User Roles")
def read_user_roles(
        skip: int = Query(0, ge=0),
        limit: int = Query(10, le=0),
        db: Session = Depends(get_db)
    ):
    return user_role_service.get_all_user_role(db, skip, limit)

@router.get("/{user_role_id}", response_model=UserRoleRead, summary="Get a single User Role by ID")
def read_user_role(
        user_role_id: int,
        db: Session = Depends(get_db)
    ):
    user_role = user_role_service.get_user_role_by_id(db, user_role_id)
    if not user_role:
        raise HTTPException(status_code=404, detail="User Role not found")
    return user_role 

@router.post("/", response_model=UserRoleRead, status_code=status.HTTP_201_CREATED, summary="Create a new User Role")
def create_user_role(
        user_role: UserRoleCreate,
        db: Session = Depends(get_db)
    ):
    return user_role_service.create_user_role(db, user_role)

@router.put("/{user_role_id}", response_model=UserRoleRead, summary="Update and existing User Role")
def update_user_role(
        user_role_id: int,
        updated_data: UserRoleUpdate,
        db: Session = Depends(get_db)
    ):
    updated = user_role_service.update_user_role(db, user_role_id, updated_data)
    if not updated:
        raise HTTPException(status_code=404, detail="User Role not foud")
    return updated 

@router.delete("/{user_role_id}", status_code=status.HTTP_204_NO_CONTENT, summary="Delete an User Role ")
def delete_user_role(
        user_role_id: int,
        db: Session = Depends(get_db)
    ):
    success = user_role_service.delete_user_role(db, user_role_id)
    if not success:
        raise HTTPException(status_code=404, detail="User Role not found")
    return Response(status_code=status.HTTP_NO_CONTENT)