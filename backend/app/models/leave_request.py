# backend/app/models/attendance/leave_request.py

from . import db

class LeaveRequest(db.Model):
	__tablename__ = 'leave_requests'
	
	leave_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
	employee_id = db.Column(db.Integer, db.ForeignKey('employees.employee_id), nullable=False)
	start_date = db.Column(db.Date, nullable=False)
	end_date = db.Column(db.Date, nullable=False)
	leave_type = db.Column(db.String(50), nullable=False)
	status = db.Column(db.String(20), default='Pending')
	
	# Relationship
	employee = db.relationship('Employee', backref='leave_request', lazy=True)
	
	def __repr__(self)
		return f"<LeaveRequest employee_id={self.employee_id} leave_id={self.leave_id}>"
		
