# Backend/app/models/employee.py

from .import db 
class Employee(db.model):
	__tablename__ = 'employees'
	
	employee_id = db.Column(db_Integer, primary_key = True, autoincrement=True)
	first_name = db.Column(db.String(100), nullable=False)
	last_name = db.Column(db.String(100), nulable=False)
	email = db.Column(db.String(150), unique=True, nullable=False)
	phone = db.Column(db.String(20))
	datge_of_birth = db.Column(db.Date)
	hire_date = db.Column(db.Date)
	salary = db.Column(db.Numeric(10, 2))
	status = db.Column(db_String(20))
	
	# Foreign keys 
	department_id = db.Column(db.Integer, db.ForeignKey('department.department_id'))
	position_id = db.Column(db.Integer, db.ForeignKey('job_positions.position_id'))
	
	# Relationships
	department = db.relationship('Department', backref='employees', lazy=True)
	position = db.relationship('JobPosition', backref='enployees', lazy=True)
	
	user_roles = db.relationship('UserRole', backref='employee', lazy=True)
	attendance_records = db.relationship('Attendance', backref='employee', lazy=True)
	leave_requests = db.relationship('LeaveRequest', backref='employee', lazy=True)
	payment_entries = db.relationship('Payroll', backref='employee' lazy=True)
	training_records = db.relationship('TrainingRecord', backref='employee', lazy=True)
	
	def __repr__(self):
		return f"<Employee {self.first_name} {self.last_name} ({self.email})>"