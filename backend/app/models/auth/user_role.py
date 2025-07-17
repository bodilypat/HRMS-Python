# Backend/app/models/auth/user_role.py

from app import db
    
class UserRole(db.Model):
    """Associates an employee with a specific role in system."""
    
    __tablename__ = 'user_roles'
    
    user_role_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    employee_id = db.Column(db.Integer, db.ForeignKey('employees.employee_id'), nullable=False)
    role_id = db.Column(db.Integer, db.ForeignKey('role.role_id'), nullable=False)
    assigned_date = db.Column(db.Date)
    
    # Relationships
    employee = db.relationship('Employee', backref=db.backref('user_roles', lazy=True)
    role = db.relationship('Role', backref=db.backref('user_roles',lazy=True))
    
    def __repr__(self):
        return f"<UserRole employee_id={self.employee_id}, role_id={self.role_id}>"
        
        