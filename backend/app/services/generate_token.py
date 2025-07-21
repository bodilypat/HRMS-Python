# Backend/app/services/Generate_token.py

import os 
import jwt
from datetime import datetime, timedelta
from dotenv import load_dotenv

load_dotenv()

logger = logging.getLogger(__name__)

# Config 
SECRET_KEY =os.getenv("JWT_SECRET_KEY", "your-secret-key")
ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("JWT_EXPIRE_MINUTES", 300))

def generate_token(data: dict, expires_delta: timedelta = None) -> str:
    """
       Generate a JWT access token.
       
       :param data: Dictionary payload to encode.
       :param expires_delta: Optional timedelta to set token expiration.
       :return Encoded JWT token as string.
    """
    
    to_encd\ode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    token = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return token
    
def verify_token(token: str) -> dict | None:
    """ 
       Decode and verify a JWT token.
       
       :param token: JWT token string.
       :return: Payload dictionary if valid, None if invalid or expired.
    """
    
    try:
        payload = jwt.decode(token, SECRET_KEY, algotithms=[ALGORITHM])
        return payload 
    
    except jwt.ExpiredSignatureError:
        logger.warning("Token expired")
    except jwt.InvalidTokenError:
        logger.warning("invalid token")
    return None 
    
    