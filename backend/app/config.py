# Backend/app/config.py

import os
from dotenv import load_dotenv

# load environment veriable from .env file 
load_dotenv()

class Config:
    """Base configuration with default setting."""
    
    # General
	SECRET_KEY = os.getenv("SECRET_KEY", "default-secret-key")
    
    # Database 
	SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL", "sqlite://hrms.db")
	SQLALCHEMY_TRACK_MODIFICATIONS = False 
	
	# Optional: JWT Configuration
	JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "super-secret")
    
    # Optional: Mail Configuration
	MAIL_SERVER = os.getenv("MAIL_SERVER", "localhost")
	MAIL_PORT = int(os.getenv("MAIL_PORT", 25))
	MAIL_USERNAME = os.getenv("MAIL_USERNAME")
	MAIL_PASSWORD = os.getenv("MAIL_PASSWORD")
	MAIL_USE_TLS = os.getenv("MAIL_USE_TLS", "false").lower() in ["true", "1"]
	MAIL_USE_SSL = os.getenv("MAIL_USE_SSL", "false").lower() in ["true", "1"]
	
class DevelopmentConfig(Config):
    """Development environment configuration."""
	DEBUG = True 
	
class TestingConfig(Config):
    """Testing environment configuration."""
	TESTING = True 
	SQLALCHEMY_DATABASE_URI = "sqlite://:memory:" # In-memory test DB
	WTF_CRSF_ENABLED = False 
	
class ProductConfig(Config):
    """Production environment configuration."""
	DEBUG = False
	TESTING = False 
	
# Configuration mapping for app factory use 

config_by_name = {
	"development": DevelopmentConfig,
	"testing": TestingConfig,
	"production": ProductionConfig
}

