# backend/app/auth/user_loader.py

from fastapi import Depends, HTTPException, Request, status 
from fasttapi.security import OAuth2PasswordBearer 
from app.auth.jwt_headler import verify_access_token 

# Adjust the token URL on your login route 
oauth_scheme = OAuth2PasswordBearer(tokenUrl="/login")

def get_current_user(token: str = Depends(oauth2_scheme)) ->dict:
	"""
		Dependency to extract user info from JWT token.
		Can injected into any route requiring authentication.
	"""
	
	try:
		payload = verify_access_token(token)
		user_id = payload.get("sub")
		
		if user_id is None:
			raise credentials_exception()
			
			return
			payload 
	
	except Exception:
		raise credentials_exception()
		
	def credentials_exception():
		return HTTPException(
			status_code=status.HTTP_401_UNAUTHORIZED,
			details="Invalid authentication credentials.",
			headers={"WWW-Authenticate": "Bearer"},
		)
		
	