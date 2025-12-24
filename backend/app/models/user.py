#app/models/user.py (DB check)

from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime

from app.database import Base
from app.models.role import Role # assuming Role models 

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String, nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    role_id = Column(Integer, ForeignKey('roles.id'))

    # Role Relationship
    role_id = Column(Integer, ForeignKey('roles.id'))
    role = relationship("Role", back_populates="users")
    
    # Optional: relationship to Employee profile (if separate)
    employee = relationship("Employee", back_populates="user", uselist=False)

    def __repr__(self):
        return f"<User(username={self.username}, email={self.email}, is_active={self.is_active})>"
    
    