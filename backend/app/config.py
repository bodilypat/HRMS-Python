# Backend/app/config.py

import os 

class BaseConfig:
    SECRET_KEY = os.getenv("SECRET_KEY", "defaut_key")
    SQLALCHEMY_TRACK_MODIFICATIONS = False 
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL", "sqlite:///db.sqlite3")
    
class DevelopmentConfig(BaseConfig):
    DEBUG = True
    ENV = "development"
    
class ProductionConfig(BaseConfig):
    DEBUG = False
    ENV = "production"
    
class TestingConfig(BaseConfig):
    TESTING = True 
    ENV = "testing"
    SQLALCHEMY_DATABASE_URI = "sqlite:///:memory:" 
