# backend/app/models/payroll.py

from . import db

class Payroll(db.Model):
	__tablename__ = 'Payroll'
	
	payroll_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
	employee_id = db.Column(db.Integer, db.ForeignKey('employees.employee_id'), nullable=False)
	pay_period = db.Column(db.Date, nullable=False)
	base_salary = db.Column(db.Numeric(10, 2), nullable=False)
	deductions = db.Column(db.Numeric(10, 2), default=0)
	bonuses = db.Column(db.Numeric(10, 2), default=0)
	net_pay = db.Column(db.Numeric(10, 2), nullable=False)
	
	# Relationship
	employee = db.relationship('Employee', backref='payroll_entries', lazy=True)
	
	def __repr__(self):
		return f"<Payroll employee_id={self.employee_id} period={self.pay_period}>"
		
		