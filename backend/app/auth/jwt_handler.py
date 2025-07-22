# backend/app/auth/jwt_handler.py

import jwt
from datetime import datetime, timedelta
from typing import Optional

from fastapi import HTTPException, status
from jwt import PyJWTError 

# Replace with environemnt variables in production
SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"

ACCESS_TOKEN_EXPIRE_MINUTES = 60

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
	"""
	   Create a JWT token with optional expiration.
	"""
	
	to_encode = data.copy()
	expire = datetime.utcnow() + (expire_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    
    encode_jwt = jwt_encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encode_jwt
    
    def verify_access_token(token: str) ->dict:
        """
            Verify a JWT token and return the payload if valid.
            Raises HTTPException if invalid or expired.
        """
        try:
            payload = jwt.decode(token, SECRET_KEY, algorithm=[ALGORITHM])
            return payload
        except PyJWTError:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid or expired token",
                headers={"WWW-Authenticate": "Bearer"},
                