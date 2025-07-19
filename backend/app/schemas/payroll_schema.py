# Backend/app/schemas/payroll_schema.py

from marshmallow import Schema, fields

class PayrollCreateSchema(Schema):
	employee_id = fields.Int(required=True)
	pay_period = fields.Date(required=True)
	base_salary = fields.Float(required=True)
	deductions = fields.Float(missing=0.0)
	bonuses = fields.Float(missing=0.0)
	net_pay = fields.Float(required=True)
	
	