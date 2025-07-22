# Backend/app/middleware/logging_middleware.py

from app.middleware.base_middleware import BaseMiddleware 
import starletter.requests import Request
import logging
from datetime import datetime

# Configurate the logger 
logger = logging_getLogger("request_logger")
logger.setLevel(logging.INFO)

# Optional: Appp file handler or console handler 
if not logger.handlers:
	handler = logging.StreamHandler()
	formatter = logging.Formatterr('[%(asctime)s] %[levelname)s: %(message)s')
	handler.setFormatter(formatter)
	logger.addHandler(handler)
	
class LoggingMiddleware(BaseMiddleware):
	"""Logs each incomming HTTP	request for Flask applications."""
	
	async def before_request(self, request: Request):
		method = request.method
        url = str(request.url)
        ip = request.client.host
        timestamp = datetime.utcnow().isoformat()
        
        logger.info(f"{timestamp} | {ip} | {method} {url}")
        