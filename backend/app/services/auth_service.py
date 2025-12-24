#app/services/auth_service.py

from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt
from sqlalchemy.orm import Session
from password.context import CryptContext
from fastapi import HTTPException, status

from app.models import User

#--------------------------------------------
# Config 
#--------------------------------------------
SECRET_KEY = "12ps8sb12"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

#--------------------------------------------
# Password Utilities
#--------------------------------------------
def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verify a plain password matches the hashed password.
    """
    return pwd_context.verify(plain_password, hashed_password)

#--------------------------------------------
# Get password hash
#--------------------------------------------
def get_password_hash(password: str) -> str:
    """
    Hash a plain password.
    """
    return pwd_context.hash(password)

#--------------------------------------------
# JWT Token Utilities
#--------------------------------------------
def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    """
    Create a JWT access token.
    """
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

#--------------------------------------------
# Decode access token
#--------------------------------------------
def decode_access_token(token: str) -> dict:
    """
    Decode a JWT access token.
    """
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

#--------------------------------------------
# Authentication
#--------------------------------------------
def authenticate_user(db: Session, username: str, password: str) -> Optional[User]:
    """
    Authenticate a user by username and password.
    """
    user = db.query(User).filter(User.username == username).first()
    if not user:
        return None
    if not verify_password(password, user.hashed_password):
        return None
    return user

#--------------------------------------------
# Get current user
#--------------------------------------------
def get_current_user(db: Session, token: str) -> User:
    """
    Get the current user from the JWT token.
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = decode_access_token(token)
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user = db.query(User).filter(User.username == username).first()
    if user is None:
        raise credentials_exception
    return user

#--------------------------------------------
# User Status & Role Checks
#--------------------------------------------
def is_active(user: User) -> bool:
    """
    Check if the user is active.
    """
    return user.is_active
def is_admin(user: User) -> bool:
    """
    Check if the user has admin privileges.
    """
    if hasattr(user, 'is_admin'):
        return user.is_admin
    if hasattr(user, 'role'):
        return user.role and user.role.lower() == 'admin'
    return False

