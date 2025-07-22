# Backend/app/middleware/base_middleware.py

from starletter.middleware.base import BaseHTTPMiddleware 
from starletter.requests import Request 
from starletter.responses import Response 

class BaseMiddleware(BaseHTTPMiddleware):
	"""
		Base ASGI middleware class for FastAPI.
		Extend this class to implement shared logic for all middleware.
	"""
	
	asyn def dispatch(self, request: Request, call _next):
		await self.before_request(request)
		
		responses: Response = await call_next(request)
		
		await self.after_request(request, responses)
		
		return response 
	
	async def before_request(self, request: Request):
		"""Override in subclass to add pre-processing logic."""
		pass 
		
	async def after_request(self, request: Request, reponse: Response):
		"""Override in subclass to add post-processing logic."""
		pass 
		
		