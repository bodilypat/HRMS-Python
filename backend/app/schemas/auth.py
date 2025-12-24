#app/schemas/auth.py 

from pydantic import BaseModel, EmailStr
from typing import Optional

#-------------------------------------------
# Token Response Schema
#-------------------------------------------
class TokenData(BaseModel):
   user_id: Optional[int] = None

#-------------------------------------------
# Token Data (used internally)
#-------------------------------------------
class TokenData(BaseModel):
    user_id: Optional[int] = None
    email: Optional[EmailStr] = None
    is_admin: Optional[bool] = False
    is_active: Optional[bool] = True
    exp: Optional[int] = None

#-------------------------------------------
# User Output Schema
#-------------------------------------------
class UserOut(BaseModel):
    id: int
    username: str
    email: EmailStr
    full_name: Optional[str] = None
    role: Optional[str] = None
    is_admin: bool
    is_active: bool

    class Config:
        orm_mode = True

#----------------------------------------------------------------------
# Login Request Schema ( optional if using OAuth2PasswordRequestForm )
#----------------------------------------------------------------------
class LoginRequest(BaseModel):
    username: str
    password: str