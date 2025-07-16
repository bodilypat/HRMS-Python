# backend/app/models/role.py

from . import db
class Role(db.model):
	__tablename__ = 'roles'
	
	role_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
	role_name = db.Column(db.String(100), unique=True, nullable=False)
	description = db.Column(db.Text)
	
	# Relationships 
	user_roles = db.relationship('UserRole', backref='role', lazy=True)
	role_permissions = db.relationship('RolePermission', backref='role', lazy=True)
	
	def __repr__(self):
		return f"<Role {self.name}>"