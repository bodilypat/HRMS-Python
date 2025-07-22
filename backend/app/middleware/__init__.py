# middleware/__init__.py

from fastapi import FastAPI
from .auth.auth_middleware import AuthMiddleware 
from .logging.logging_middleware import LoggingMiddleware 
from .exceptions.exception_middleware import ExceptionMiddleware 
from .rate_limiting.rate_limit_middleware import RateLimitMiddleware 

def register_middlewares(app: FastAPI):
	"""Register all middlewares for FastAPI app"""
	app.add_middleware(LoggingMiddleware)
	app.add_middleware(ExceptionMiddleware)
	app.add_middleware(RateLimitMiddleware)
	app.add_middleware(AuthMiddleware)
	
	
