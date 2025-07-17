# backend/app/models/payroll/payroll/payroll.py

from . import db 
class Payroll(db.Model):
    __tablename__= 'payrolls'
    
    payroll_id = db.Column(db.Integer, primaty_key=True, autoincrement=True)
    employee_id = db.Column(db.Integer, db.ForeignKey('employees.employee_id'), nullable=False)
    
    pay_period = db.Column(db.Date, nullable=False)
    base_salary = db.Column(db.Numeric(10, 2), nullable=False)
    deductions = db.Column(db.Numeric(10, 2), nullable=False, default=0.00)
    bonuses = db.Column(db.Numeric(10, 2), nullable=False, default=0.00)
    net_pay = db.Column(db.Numeric(10, 2), nullable=False)
    
    # Relationship
    employee = db.relationship('Employee', backref=db.backref('payrolls', lazy='dynamic'))
    
    def __repr__(self):
        return f"<Payroll employee_id={self.employee_id}, pay_period={self.pay_period}, net_pay={self.net_pay}>"
