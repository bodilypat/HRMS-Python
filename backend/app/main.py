# backend/app/main.py

from fastapi import FastAPI
from app.routes import api_router

app = FastAPI(
        title = "HRM System",
        version="1.0.0",
        description="Human Resource Management API"
    )
    
    # Mount API
    app.include_router(api_router, prefix="/api")
    
   