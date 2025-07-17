# backend/app/models/auth/role_permission.py

from app import db

class RolePermission(db.Model):
    """Association table linking roles to permissions (many-to-many)."""
    
    __tablename__ = 'role_permissions'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True) 
    role_id = db.Column(db.Integer, db.ForeignKey('roles.role_id'), nullable=False)
    permission_id = db.Column(db.Integer, db.ForeignKey('permissions.permission_id'), nullable=False)
    
    # Relationships 
    role = db.relationship('Role', backref=db.backref('role_permissions_assoc', lazy=True))
    permission = db.relationship('Permission', backref=db.backref('role_permission_assoc', lazy=True))
    
    def __repr__(self):
        return f"<RolePermission role_id={self.role_id}, permission_id={self.permission_id}>"
	
