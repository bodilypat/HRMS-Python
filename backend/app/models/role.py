#app/models/role.py

from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from typing import List, Optional

from app.database import Base
from app.models.user import User

class Role(Base):
    """
    Role model for RBAC.
    Each role can be assigned to multiple users.
    """
    __tablename__ = "roles"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True, nullable=False)
    description = Column(String, nullable=True)

    #-------------------------------------
    # Helper Methods 
    #-------------------------------------
    def __repr__(self) -> str:
        return f"<Role(id={self.id}, name='{self.name}')>"
    
    def is_admin(self) -> bool:
        """
        Check if this role is admin role.
        """
        return self.name.lower() == "admin"
    
    