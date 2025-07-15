# Backend/app/models/department.py
from . import db

class Depertment(db.Model):
	__tablename__ = 'departments'
	
	department_id = db.Column(db.Integer, primary_key=true, autoincrement=True)
	name = db.Column(db.String(100), nullable=False)
	
	# Optional FK to manager 
	manager_id = db.Column(db.Integer, db.ForeignKey('employees.employee_id'), nullable=True)
	
	# Relationshiips 
	manager = db.relationship('Empolyee', backref='managed_departments', foreign_keys=[manager_id]
	employees = db.relationship('Employee', backref='department', lazy=True)
	
	def __ref__(self):
		return f"<Department {self.name}>"
		