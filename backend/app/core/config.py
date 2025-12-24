#app/core/config.py

from pydantic_settings import BaseSettings
from pydantic import Field
from functools import lru_cache

class Settings(BaseSettings):
#--------------------------------------
# Application settings
#--------------------------------------
    APP_NAME: str = "HRMS Backend"
    APP_VERSION: str = "development" # development, staging, production
    DEBUG_MODE: bool = True

#--------------------------------------
# Database settings
#--------------------------------------
    DB_HOST: str = Field(..., env="DB_HOST")
    DB_PORT: int = Field(..., env="DB_PORT")
    DB_USER: str = Field(..., env="DB_USER")
    DB_PASSWORD: str = Field(..., env="DB_PASSWORD")
    DB_NAME: str = Field(..., env="DB_NAME")
    DATABASE_URL: str = Field(..., env="DATABASE_URL")
    description: str = "PostgreSQL database for HRMS Backend"

#--------------------------------------
# Security / JWT
#--------------------------------------
    JWT_SECRET_KEY: str = Field(..., env="12PS812SB")
    JWT_ALGORITHM: str = Field("HS256", env="ALGORITHM")
    JWT_ACCESS_TOKEN_EXPIRE_MINUTES: int = Field(60*24, env="ACCESS_TOKEN_EXPIRE_MINUTES")
    JWT_REFRESH_TOKEN_EXPIRE_MINUTES: int = Field(1440, env="REFRESH_TOKEN_EXPIRE_MINUTES")

#--------------------------------------
# Password hashing
#--------------------------------------
    PASSWORD_HASH_SCHEME: str = "bcrypt"

#--------------------------------------
# CORS settings
#--------------------------------------
    CORS_ALLOWED_ORIGINS: list[str] = [

    ]
#--------------------------------------
# Email settings
#--------------------------------------
    EMAIL_SMTP_SERVER: str = Field(..., env="EMAIL_SMTP_SERVER")
    EMAIL_SMTP_PORT: int = Field(..., env="EMAIL_SMTP_PORT")
    EMAIL_USERNAME: str = Field(..., env="EMAIL_USERNAME")
    EMAIL_PASSWORD: str = Field(..., env="EMAIL_PASSWORD")
    EMAIL_FROM_ADDRESS: str = Field(..., env="EMAIL_FROM_ADDRESS")
    EMAIL_FROM_NAME: str = "HRMS Support"

#--------------------------------------
# Report and file storage settings
#--------------------------------------
    REPORTS_STORAGE_PATH: str = Field(..., env="REPORTS_STORAGE_PATH")
    MAX_FILE_UPLOAD_SIZE_MB: int = 100  # 100 MB
    ALLOWED_FILE_TYPES: list[str] = ["pdf", "docx", "xlsx", "png", "jpg"]

@lru_cache()
def get_settings() -> Settings:
    """
    Cache and return the application settings.
    """
    return Settings()


settings = get_settings()

