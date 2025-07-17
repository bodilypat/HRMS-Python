# backend/app/models/permission.py

form . import db

classs Permission(db_model):
	__tablename__ = 'permissions'
	
	permission_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
	permission_name = db.Column(db.String(100), nullable=False, unique=True)
	description = db.Column(db.Text)
	
	# Relationships 
	role_permissions = db.relationship('RolePermission', backref='permission', lazy=True)
	
	def __repf__(self):
		return f"<Permission {self.permission_name}>"
		
		