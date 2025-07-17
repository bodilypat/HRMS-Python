# Backend/app/models/attendance/attendance.py

from app import db

class Attendance(db.Model):
	__tablename__ = 'attendance'
	
	attendance_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
	employee_id = db.Column(db.Integer, db.ForeignKey('employees.employee_id'), nullable=False)
	date = db.Column(db.Date, nullable=False) 
	check_in = db.Column(db.Time)
	check_out = db.Column(db.Time)
	
	# Relationship
	employee = db.relationship('Employee', backref=db.backref('attendance_records', lazy="dynamic'))
	
	def __repr__(self):
		return f"<Attendance employee_id={self.employee_id}, date={self.date}>"
		
