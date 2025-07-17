# Backend/app/models/core/employee.py

from app import db 
from datetime import date 

class Employee(db.Model):
	__tablename__ = 'employees'
	
	employee_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
	first_name = db.Column(db.String(100), nullable=False)
	last_name = db.Column(db.String(100), nullable=False)
	email = db.Column(db.String(150), unique=True, nullable=False)
	phone = db.Column(db.String(20))
	date_of_birth = db.Column(db.Date)
	hire_date = db.Column(db.Date)
	salary = db.Column(db.Numeric(10,2))
	status = db.Column(db.String(20))
	
	# Foreign keys 
	department_id = db.Column(db.Integer, db.ForeignKey('departments.depart_id'))
	position_id = db.Column(db.Integer, db.ForeignKey('job_positions.position_id'))
	
	# Relationships 
	department = db.relationship('UserRole', backref='employee', layzy=True)
	attendance_records = db.relationship('Attendance', backref='employee', lazy=True)
	leave_requests = db.relationship('LeaveRequest', backref='employee', lazy=True)
	payroll_entries = db.relationship('payroll', backref='employee', lazy=True)
	training_records = db.relationship('TrainingRecord', backref='employee' lazy=True)
	
	def full_name(self):
		return f"{self.first_name} {self.last_name}"
		
	def age(self):
		if self.date_of_birth:
			return date.today().year - self.date_of_birth.year 
		return None 
		
	def __repr__(self):
		return f"<Employee {self.full_name()} ({self.email})>"