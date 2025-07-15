# Backend/app/models/department.py
from . import db

class Depertment(db.Model):
	__tablename__ = 'departments'
	
	department_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
	name = db.Column(db.String(100), nullable=False, unique=True)
	
	# Optional FK to manager 
	manager_id = db.Column(db.Integer, db.ForeignKey('employees.employee_id'), nullable=True)
	
	# Relationshiips 
	manager = db.relationship('Empolyee', foreign_keys=[manager_id], backref='managed_departments')
	employees = db.relationship('Employee', backref='department', lazy=True)
	
	def __repr__(self):
		return f"<Department {self.name}>"
		