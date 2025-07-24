# Backend/app/models/base_model.py

from datetime import datetime
from sqlalchemy import Column, DateTime, func 
from sqlalchemy.orm import declarative_base, Session

Base = declarative_base():

class BaseModel(db.Model):
    __abstract__ = True 
    
    created_at = Column(DateTime, default=func.now(), nullable=False)
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now(), nullable=False)
    
    def save(self, db_session: Session, commit: bool = True):
        """Save the current instance to the database."""
        db.session.add(self)
        if commit:
            db.session.commit()
        return self 
        
    def delete(self, db_session: Session, commit : bool = True):
        """Delete the current instance from the database."""
        db.session.delete(self)
        if commit:
            db.sessiion.commit()
        
    def to_dict(self) -> dict:
        """Convert model fields to directory."""
        return {column.name: getattr(self, column.name) for column in self.__table__.columns}
        
     def __repr__(self):
        return f"{self.__class__.__name__} id={getattr(self, 'id', None)}>"
    
	