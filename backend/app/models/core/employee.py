# Backend/app/models/core/employee.py

from app import db 
from datetime import date 

class Employee(db.Model):
    """
        Represents an employee in the HRMS system.
    """
    
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
	department = db.relationship('Department', backref='employee', layzy=True)
    position = db.relationship('JobPosition', backref='employees' lazy=True)
    user_roles = db.relationship('UserRole', backref='employee', lazy=True)
	attendance_records = db.relationship('Attendance', backref='employee', lazy=True)
	leave_requests = db.relationship('LeaveRequest', backref='employee', lazy=True)
	payroll_entries = db.relationship('Payroll', backref='employee', lazy=True)
	training_records = db.relationship('TrainingRecord', backref='employee' lazy=True)
	
	def full_name(self):
        """Return full name of the employee."""
		return f"{self.first_name} {self.last_name}"
		
	def age(self):
        """Calculate current age from date_of_birth."""
		if self.date_of_birth:
            today = date.today()
			return date.year - self.date_of_birth.year - (
                (today.month, today.day) < (self.date_of_birth.month, self.date_of_birth.day)
            )
		return None 
		
	def __repr__(self):
		return f"<Employee {self.full_name()} ({self.email})>"
        
    def __str__(self):
        return self.full_name()