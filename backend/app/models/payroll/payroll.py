# backend/app/models/payroll/payroll.py

from app import db
class Payroll(db.Model):
    """Payroll record for an employee for a specific pay period."""
     
    __tablename__ = 'payrolls'
    
    payroll_id = db.Column(db.Integer, primaty_key=True, autoincrement=True)
    employee_id = db.Column(db.Integer, db.ForeignKey('employee.employee_id'), nullable=False)
    
    pay_period = db.Column(db.Date, nullable=False)
    base_salary = db.Column(db.Numeric(10,2), nullable=False)
    deductions = db.Column(db.Numeric(10,2), nullable=False, default=0.00)
    bonuses = db.Column(db.Numeric(10,2), nullable=False, default=0.00)
    net_pay = db.Column(db.Numeric(10,2), nullable=False)
    
    # Relationships 
    employee = db.relationship(
        'Employee',
        backref=db.backref('payroll', lazy='dynamic'),
        lazy='joined'
       )
       
       def __repr__(self):
            return (
                f"<Payroll("
                    f"employee_id={self.employee_id), "
                    f"pay_period={self.pay_period}, "
                    f"net_pay={self.net_pay})>"
                   )
