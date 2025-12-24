#app/core/security.py

from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt
from passlib.context import CryptContext
from fastapi import HTTPException, status

#------------------------------------------
# Configuration
#------------------------------------------
SECRET_KEY = "12ps8sb12" # TODO: move to environment variable
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60  # 1 hour

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

#------------------------------------------
# Password Utilities
#------------------------------------------
def hash_password(password: str) -> str:
    """
    Hash a plain using bcrypt.
    """
    return pwd_context.hash(password)

#------------------------------------------
# Verify Password
#------------------------------------------
def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verify a plain password against its hashed version.
    """
    return pwd_context.verify(plain_password, hashed_password)

#------------------------------------------
# JWT Token Utilities
#------------------------------------------
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

#------------------------------------------
# Decode access token
#------------------------------------------
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
    
#------------------------------------------
# Get subject from token 
#------------------------------------------
def get_subject_from_token(token: str) -> str:
    """
    Extract the subject (sub) from the JWT token.
    """
    payload = decode_access_token(token)
    subject: str = payload.get("sub")
    if subject is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return subject

#------------------------------------------
# Token Expiry Utilities
#------------------------------------------
def token_expiration_time(minutes: int) -> datetime:
    """
    Calculate the expiration time for a token.
    """
    return datetime.utcnow() + timedelta(minutes=minutes)

#------------------------------------------
# Is Token Expired
#------------------------------------------
def is_token_expired(token: str) -> bool:
    """
    Check if the JWT token is expired.
    """
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        exp = payload.get("exp")
        if exp is None:
            return True
        expiration_time = datetime.utcfromtimestamp(exp)
        return expiration_time < datetime.utcnow()
    except JWTError:
        return True

