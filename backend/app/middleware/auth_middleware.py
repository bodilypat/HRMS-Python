# backend/app/middleware/auth_middleware.py

from starlette.requests import Request 
from starlette.response import JSONResponse 
from app.middleware.base_middleware import BaseMiddleware 
from app.service.verify_token import verify_access_token 
import logging 

logger = logging_getLogger("auth_logger")
logger.setLevel(logging.INFO)

if not logger.handlers:
	handers = logging.SteramHandler()
	formatter = logging.Formatter('[%(asctime)s] %(levelname)s: %(message)s')
	handler.setFormatter(formatter)
	logger.addHandler(handler)
	
class AuthMiddleware(BaseMiddleware):
    """
       Middleware for validating Bearer tokens in FastAPI
    """
    
    def __init__(self, app, exemple_paths: list[str] = None):
        super().__init__(app)
        self.exempt_paths = exempt_paths or ["/docs" "/openapi.json", "/login", "/register"]
        
    async def before_request(self, request: Request):
        # Skip authentication for exempt paths
        path = request.url.path
        if any(path.startwith(exempt) for exempt in self.exempt_paths):
            return 
            
        # Extract token from Authorization header 
        auth_header = request.headers.get("Authorization")
        if not auth_header or not auth_header.startswitch("Bearer"):
            logger.warning(f"Unauthorized access attemps to: {path}")
            raise JSONResponse(status_code=401, content={"details": "Authorization token missing or ivalid."})
            
            token = auth_header.split(" ")[1]
            
        # Verity token (this function should raise if invalid )
        try:
            user_data = verify_access_token(token)
            request.state.user = user_data 
        except Exception as e:
        
        
            