# backend/app/auth/auth_utils.py

from fastapi import Depends, HTMLException, status 
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from datetime import datetime 

SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")

def verify_token(token: str = Depends(oauth2_scheme)):
    
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None or payload.get("exp") < datetime.utcnow().timestamp():
            raise HTTPException(status_code=401, detail="Token expired or invaid")
        return email
    exception JWTError:
        raise HTTPException(status_code=403, detail="Invalid token")
        