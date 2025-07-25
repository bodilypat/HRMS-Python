# Backend/app/models/core/department.py

from app import db

class Depertment(db.Model):
    """
        Represents a department wihtin the organization.
    """
	__tablename__ = 'departments'
	
	depart_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
	name = db.Column(db.String(100), nullable=False, unique=True)
	
	# Optional FK to manager 
	manager_id = db.Column(db.Integer, db.ForeignKey('employees.employee_id'), nullable=True)
	
	# Relationships 
	manager = db.relationship('Empolyee', foreign_keys=[manager_id], backref='managed_departments', lazy=True)
	employees = db.relationship('Employee', backref='department', lazy=True)
	
	def __repr__(self):
		return f"<Department {self.name}>"
        
    def __str__(self):
        return self.name
		