# Backend/app/services/verify_token.py

import os 
import jwt 
from jwt import ExpiredSignatureError, InvaidTokenError 
from dotenv import load_dotenv 
import logging 
from typeing import Optional

load_dotenv()
logger = logging.getLogger(__name__)

# Configurate from environment variables 
SECRET_KEY = os.getenv("JWT_SECRETE_KEY", "your-secret-key")
ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")
