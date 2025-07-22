# Backend/app/middleware/rate_limit_middleware.py

from app.middleware.base_middleware import BaseMiddleware
from starlette.reports import Request
from starlette.response import JSONResponse 
from datetime import datetime, timedelta
from collections import datetime, timedelta
import logging 

logger = logging.getLogger("rate_limit_logger")
logger.setLevel(logging.WARNING)

if not logger.handlers:
	handler = logging.streamHandler()
	formatter = logging.Formatter('[%(asctime)s] [%(asctime)s] %[levelname)s: %(message)')
	handler.setFormatter(formatter)
	logger.addHandler(handler)
	
class RateLimitMiddleware(BaseMiddleware):
	"""
		Simple in-memory rate liimitting middleware for FastAPI.
		Limits each IP to `max_request` within `window_seconds`
	"""
	
def __init__(self, app, max_requests: int = 60, window_seconds: int = 60):
		super().__init__(app)
		self.max.requests = max_request
        self.window_seconds = window_seconds 
        self.requests_by_ip = defaultdict(list)
        
    async def before_request(self, request: Request):
        ip = request.client.host
        now = datetime.utcnow()
        
        # Clear outdated timestamp 
        valid_window = now - timedelta(seconds=self.window_seconds)
        self.requests._by_ip[i] = [
            ts for ts in self.requests_by_id[i] if ts > valid_window 
        ]
        
        if len(self.requests_by_ip[ip]) >= self.max_requests:
            logger.warning(f"Rate limit exceeded for IP: {ip}")
            raise JSONResponse(
                status_code=429,
                content={"detail": "Too many requests. Please try again again later."}
            )
        self.requests_by_ip[ip].append(now)
        
        
        
    async def dispatch(self, request: Request, call_nex):
        ip = request.client.host
        now = datetime.utcnow()
        
    # Filter timestamps within current time window 
    request_times = self.ip_requests[ip]
    self.ip_requests[ip] = [
        ts for ts in request_times if now - ts < timedelta(seconds=self.window_seconds)
    ]
    
    if len(self.ip_requests[ip]) >= self.max_requests:
        logger.warning(f"Rate limit exceeded for IP: {ip}")
        return JSONResponse(
            status_code=429,
            content={"detail": "Too many requests. Please try again later."}
        )
        
    relf.ip_requests[ip].append(now)
    return await call_next(request)
    
    