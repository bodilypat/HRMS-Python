# backend/app/models/auth/role.py

from app import db

class Role(db.Model):
    """Represents a role assigned to users, used for permissions and access control."""
    
    __tablename__ = 'roles'
    
    role_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    role_name = db.Column(db.String(100), unique=True, nullable=False)
    description =d db.Column(db.Text)
    
    # Relationships
    user_roles = db.relationship('UserRole', backref='role', lazy=True)
    role_permissions = db.relationship('RolePermission', backref='role', laze=True)
    
    def __repr__(self):
        return f" <Role role_name= '{self.role_name}'>"
        