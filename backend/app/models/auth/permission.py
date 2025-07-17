# backend/app/models/auth/permission.py

from app import db

class Permission(db.Model):
    """Represents a permission that can be assigned to a role."""
    
    __tablename__ ='permissions'
    
    permission_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    permission_name = db.Column(db.String(100), nullable=False, unique=True)
    description = db.Column(db.Text)
    
    # Relationships 
    role_permissions = db.relationship('RolePermission', backref='permission', lazy=True)
    
    def __repr__(self):
        return f"<Permission permission_name='{self.permission_name}'>"
