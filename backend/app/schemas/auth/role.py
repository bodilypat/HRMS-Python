#app/schemas/auth/role.py

from sqlalchemy import Column, Integer, String, Text, TIMESTAMP, func, CheckConstraint 
from app.database import Base

class Role(Base):
	__tablename__ = "roles"
	
	role_id = Column(Integer, primary_key=True, index=True)
	role_name = Column(String(50), unique=True, nullable=False)
	description = Column(Text, nullable=True)
	created_at = Column(TIMESTAMP, server_default=func.current_timestamp())
	updated_at = Column(TIMESTAMP, server_default=func.current_timestamp(), ondelete=func.current_timestamp())
	
	__table_args__ = (
		CheckConstraint("char_length(role_name) >= 3", name="role_name_length"),
	)
	
	def __repr__(self):
		return f"<Role(id={self.role_id}, name={self.role_name})>"
