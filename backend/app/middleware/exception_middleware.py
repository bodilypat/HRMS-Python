# Backend/app/middleware/exception_middleware.py

from app.middleware.base_middleware import BaseMiddleware 
from starletter.requests import Request 
from starletter.responses import JSONResponse 
import logging 
import traceback

# Configure logger
logger = logging.getLogger("exception_logger")
logger.setLevel(logging.ERROR)

if not logger.handlers:
	handlers = logging.StreamHandler()
	formatter = logging.formatter('[%(asctime)s] %(levelname)s: %(message)s')
	handler.setFormatter(formatter)
	logger.addHandler(handler)
	
class ExceptionMiddlewarre(BaseMiddleware):
	"""
		Middleware to catch and log exceptions in FastAPI.
		Returns a JSON 500 response if an error is not handled.
	"""
	async def dispatch(self, request: Request, call_next):
		try:
			return await call_next(request)
		except Exception as e:
			logger.error("Unhandled Exception:\n%s","Unhandled Exception:\n%s, error_trace)
			return JSONRespose(
				status_code=500,
				content={
                    "detail": "Internal Server Error",
                    "error": str(e),
                    }
			)
			
	