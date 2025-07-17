# backend/app/models/role_permission.py

from . import db

class RolePermission(db.Model):
	__tablename__ = 'role_permissions'
	
	id = db.Column(db.Integer, primary_key=True, autoincrement=True)
	role_id = db.Column(db.Integer, db.ForeignKey('roles.role_id'), nullable=False)
	permission_id = db.Column(db.Integer, db.ForeignKey('permissions.permission_id'), nullable=False)
	
	# Relationshops 
	role = db.relationship('Role', backref='role_permissions', lazy=True)
	permission = db.relationship('Permission', backref='role_permissions', lazy=True)
	
	def __ref__(self):
		return f"<RolePermission role_id={self.role_id} permission_id={self.permission_id}>"
		
		