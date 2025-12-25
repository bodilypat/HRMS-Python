#app/services/auth_service.py 

from datetime import datetime, timedelta
from typing import Optional, Dict, Any
from jose import JWTError, jwt
from fastapi import HTTPException, status
from sqlalchemy.orm import Session


from app.models.user import User
from passlib.context import CryptContext

#----------------------------------------
# Configuration
#----------------------------------------
SECRET_KEY = "12ps8sb12" # TODO: Move to environment variable
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 15
REFRESH_TOKEN_EXPIRE_MINUTES = 7 

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

#----------------------------------------
# Token Generators
#----------------------------------------
def create_access_token(data: Dict[str, Any], expires_delta: Optional[timedelta] = None) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta if expires_delta else timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def create_refresh_token(data: Dict[str, Any], expires_delta: Optional[timedelta] = None) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta if expires_delta else timedelta(minutes=REFRESH_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt
 
#----------------------------------------
# Password Utilities
#----------------------------------------
def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verify a plain password matches the hashed password.
    """
    return pwd_context.verify(plain_password, hashed_password)

#----------------------------------------
# Passsword Hashing
#----------------------------------------
def get_password_hash(password: str) -> str:
    """
    Hash a plain password.
    """
    return pwd_context.hash(password)

#----------------------------------------
# JWT Token Utilities
#----------------------------------------
def create_access_token(data: Dict[str, Any], expires_delta: Optional[timedelta] = None) -> str:
    """
    Create a JWT access token.
    """
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta if expires_delta else timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

#----------------------------------------
# Decode JWT Token
#----------------------------------------
def decode_access_token(data: Dict[str, Any], expires_delta: Optional[timedelta] = None) -> str:
    """
    Decode a JWT access token.
    """
    try:
        payload = jwt.decode(data, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        ) 

#----------------------------------------
# Authentication
#----------------------------------------
def authenticate_user(db: Session, username: str, password: str) -> Optional[User]:
    """
    Authenticate a user by username and password.
    Return user if authentication is successful, else None.
    """
    user = db.query(User).filter(User.username == username).first()

    if not user or not verify_password(password, user.hashed_password):
        return None
    
    if not user.is_active:
        return None

    return user

#----------------------------------------
# Get Current user from JWT Token
#----------------------------------------
def get_current_user(db: Session, token: str) -> User:
    """
    Get the current user from the JWT token.
    Raise 
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    payload = decode_access_token(token)
    user_id: Optional[int] = payload.get("sub")
    if user_id is None:
        raise credentials_exception
    
    user = db.query(User).filter(User.id == user_id).first()
    if not user or not user.is_active:
        raise credentials_exception
    return user

#----------------------------------------
# User status & Roles Checks
#----------------------------------------
def is_active(user: User) -> bool:
    """
    Check if the user account is active.
    """
    return getattr(user, 'is_active', False)

def is_admin(user: User) -> bool:
    """
    Check if the user has admin privileges.
    """
    if getattr(user, 'is_admin', False):
        return True
    
    role = getattr(user, 'role', None)
    return role is not None and role.lower() == 'admin'

