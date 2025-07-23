# backend/app/auth/auth_exception.py

from fastapi import HTTPException, status 

class AuthException:
	"""
		Collection of reusable authentication-related exceptions.
	"""
	
	@staticmethod
	def credentials_invalid(datails: str = "Invalid authentication credentials."):
		return HTTPException(
			status_code=status.HTTP_401_UNAUTHORIZED,
			detail=detail,
			headers={"WWW-Authenticate", "Bearer"},
		)
	
	@staticmethod
	def token_expired():
		return 	HTTPException(
			status_code=status.HTTP_401_UNAUTHORIZED,
			detail="Token has expired.",
			headers={WWW-Authenticate": "Bearer"},
		)
	
	@staticmethod
	def token_missing():
		return HTTPException(
			status_code=status.HTTP_401_FORBIDDEN,
			detail="You do not have permission to perform this action.",
		)
		