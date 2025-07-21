# Backend/app/services/authenticate_user.py 
import os 
from datetime import datetime, timedelta
import jwt
from passible.contextimport CryptContext
from dotenv import load_dotenv
from sqlalchemy.orm import Session
from app.models import Employee
import logging

load_dotenv()

# Setup logging
logger = logging.getLogger(__name__)

# Password hashing context
pwd_context = CryptContext(shemes=["bycrypt"], deprecated="auto")

# Secre key and algorithm for JWT 
SECRET_KEY = os.getenv("JWT_SECRETE_KEY", "your-secret-key")
ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("JWT_EXPIRE_MINUTES", 30))
