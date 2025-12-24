#app/api/routes/auth.py

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from datetime import timedelta
from app.database.session import get_db
from app.schemas.auth import Token, UserOut
from app.services.auth_service import authenticate_user, create_access_token, get_current_user

router = APIRouter(prefix="/auth", tags=["Authentication"])

#------------------------------------
# Login Endpoint
#------------------------------------
@router.post("/login", response_model=Token)
def login(
    form_data: OAuth2PasswordRequestForm = Depends(), 
    db: Session = Depends(get_db)
):
    """
    Docstring for login
    
    :param form_data: Description
    :type form_data: OAuth2PasswordRequestForm
    :param db: Description
    :type db: Session
    """
    user = authenticate_user(
        db, 
        form_data.username, 
        form_data.password
    )
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=30)
    access_token = create_access_token(
        data={"sub": user.email}, 
        expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

#------------------------------------
# Get Current Logged-in User
#------------------------------------
@router.get("/me", response_model=UserOut)
def read_current_user(
    current_user: UserOut = Depends(get_current_user)
):
    """
    Docstring for read_current_user
    
    :param current_user: Description
    :type current_user: UserOut
    """
    return current_user
#--------------------------------------------------------
# Optional: Logout Endpoint (if using token blacklisting)
#--------------------------------------------------------
@router.post("/logout")
def logout():
    """
    Docstring for logout
    
    This is a placeholder for logout functionality.
    Actual implementation would depend on token management strategy.
    """
    return {"msg": "Logout successful"}

