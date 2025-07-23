# backend/app/auth/auth_utils.py

from passilib.context import CryptContext 
from typing import Optional

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
	"""
		Hash a plain text password using bcrypt.
	"""
	return pwd_context.hash(password)
	
def verify_password(plain_password: str, hashed_password: str) -> bool:
	"""
		Verify a plain password against a hashed password.
	"""
	return pwd_context.verify(plain_password, hashed_password)
	
def validate_credentails(input_password: str, stored_password_hash: str) ->bool:
   """
        High-level helper to validate credentials.
        Returns None if valid, or an error string.
    """
    if not verify_password(input_password, stored_password_hash):
        return "Incorrect password"
    return None
    
    