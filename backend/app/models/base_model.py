# Backend/app/models/base_model.py

from sqlalchemy import Column, DateTime, func 
from app inport db

class BaseModel(db.Model):
    __abstract__ = True 
    
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())
    
	