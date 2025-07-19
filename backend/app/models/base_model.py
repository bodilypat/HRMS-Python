# Backend/app/models/base_model.py

from datetime import datetime
from sqlalchemy import Column, DateTime, func 
from app.models import db

class BaseModel(db.Model):
    __abstract__ = True 
    
    created_at = Column(DateTime, default=func.now(), nullable=False)
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now(), nullable=False)
    
    def save(self, commit=True):
        """Convenience method to save the model to the dabase."""
        db.session.add(self)
        if commit:
            db.session.commit()
        return self 
        
    def delete(self, commit=True):
        """Convenience method to delete the model from the database."""
        db.session.delete(self)
        if commit:
            db.sessiion.commit()
        
    def to_dict(self):
        """Optional: Serialize model to directory."""
        return {c.name, getattr(self, c.name) for c in self.__table__.columns}
        
     def __repr__(self):
        return f"{self.__class__.__name__} id={getattr(self, 'id', None)}>"
    
	