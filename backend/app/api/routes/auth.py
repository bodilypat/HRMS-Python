#app/api/routes/auth.py 

from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status, Response
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from jose import JWTError

from app.database.session import get_db
from app.schemas.auth import Token, UserOut 
from app.services.auth_service import (
    authenticate_user,
    create_access_token,
    create_refresh_token,
    get_current_user,
)

router = APIRouter(prefix="/auth", tags=["Authentication"])

ACCESS_TOKEN_EXPIRE_MINUTES = 30
REFRESH_TOKEN_EXPIRE_MINUTES = 7 

#-----------------------------------------------------
# Login Endpoint
#-----------------------------------------------------
@router.post("/login", response_model=Token)
def login(
    response: Response,
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    """
    Authenticate user and return access and refresh tokens.

    Args:
        response (Response): FastAPI response object to set cookies.
        form_data (OAuth2PasswordRequestForm): Form data containing username and password.
        db (Session): Database session.
    Returns:
        Token: Access and refresh tokens.
    """
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Generate tokens
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.id, "role": user.role}, 
        expires_delta=access_token_expires
    )

    refresh_token = create_refresh_token(
        data={"sub": user.id}, 
        expires_delta=timedelta(minutes=REFRESH_TOKEN_EXPIRE_MINUTES)
    )

    # Set refresh token in HttpOnly cookie
    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        max_age=REFRESH_TOKEN_EXPIRE_MINUTES * 60,
        expires=REFRESH_TOKEN_EXPIRE_MINUTES * 60,
        path="/auth/refresh-token",
        secure=True,
        samesite="strict"
    )
    return {"access_token": access_token, "token_type": "bearer"}

#-----------------------------------------------------
# Get Current Logged-in User 
#-----------------------------------------------------
@router.get("/me", response_model=UserOut)
def read_users_me(
    current_user: User = Depends(get_current_user)
):
    """
    Return details of the currently authenticated user.
    Args:
        current_user (User): The currently authenticated user.
    Returns:
        UserOut: User details.
    """
    return current_user

#-----------------------------------------------------
# Refresh Token Endpoint
#-----------------------------------------------------
@router.post("/refresh-token", response_model=Token)
def refresh_token(
    response: Response,
    refresh_token: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """
    Refresh access token using the refresh token from cookies.

    Args:
        response (Response): FastAPI response object to set cookies.
        refresh_token (str): Refresh token from HttpOnly cookie.
        db (Session): Database session.
    Returns:
        Token: New access and refresh tokens.
    """
    if not refresh_token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Refresh token missing",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    try:
        payload = jwt.decode(refresh_token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid refresh token",
                headers={"WWW-Authenticate": "Bearer"},
            )
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid refresh token",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Generate new tokens
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.id, "role": user.role}, 
        expires_delta=access_token_expires
    )

    new_refresh_token = create_refresh_token(
        data={"sub": user.id}, 
        expires_delta=timedelta(minutes=REFRESH_TOKEN_EXPIRE_MINUTES)
    )

    # Set new refresh token in HttpOnly cookie
    response.set_cookie(
        key="refresh_token",
        value=new_refresh_token,
        httponly=True,
        max_age=REFRESH_TOKEN_EXPIRE_MINUTES * 60,
        expires=REFRESH_TOKEN_EXPIRE_MINUTES * 60,
        path="/auth/refresh-token",
        secure=True,
        samesite="strict"
    )
    return {"access_token": access_token, "token_type": "bearer"}

#-----------------------------------------------------
# Logout Endpoint
#-----------------------------------------------------
@router.post("/logout")
def logout(response: Response):
    """
    Logout user by clearing the refresh token cookie.

    Args:
        response (Response): FastAPI response object to clear cookies.
    Returns:
        dict: Logout confirmation message.
    """
    response.delete_cookie(key="refresh_token", path="/auth/refresh-token")
    return {"detail": "Successfully logged out"}

