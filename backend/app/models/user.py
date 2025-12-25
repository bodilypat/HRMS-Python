#app/models/user.py 

from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from typing import Optional

from app.database import Base
from app.models.role import Role
from app.services.auth_service import verify_password

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    role_id = Column(Integer, ForeignKey("roles.id"))
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Role relationship
    role = relationship("Employee", back_populates="users", uselist=False)

    #---------------------------------------
    # Helper Methods
    #---------------------------------------
    def verify_password(self, password: str) -> bool:
        """
        Verify the provided password against the stored hashed password.
        """
        return verify_password(password, self.hashed_password)
    
    def is_admin(self) -> bool:
        """
        Check if the user has an admin role.
        """
        if self.role:
            return self.role is not None and self.role.name.lower() == "admin"
        return False
    
    def __repr__(self):
        return f"<User(username={self.username}, email={self.email}, is_active={self.is_active})>"
    
    
    
    