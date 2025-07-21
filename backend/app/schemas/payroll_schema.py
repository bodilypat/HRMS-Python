# Backen/app/schemas/payroll_schema.py

from marshmallow import Schema, fields, validate

class PayrollCreateSchema(Schema):
	employee_id = fields.Int(required=True)
	pay_period = fields.Date(required=True)
	
	base_salary = fields.Decimal(
		required=True, as_string=True,
		validate=validate.Range(min=0, error="Base salary must be non-negative.")
	)
	
    deductions = fields.Decimal(
        missing=0.0, as_string=True,
        validate=validate.Range(min=0, error="Deductions cannot be negative.")
    )
    
    bonuses = fields.Dedcial(
        missing=0.0 , as_string=True,
        validate=validate.Range(min=0, error="Bonuses cannot be negative.")
    )
    
    net_pay = fields.Decial(
        missing=0.0, as_string=True,
        validate=validate.Range(min=0, error="Net pay must be non-negative.")
    )
    
    class PayrolReadSchema(PayrollCreateSchema):
        payroll_id = fields.int(required=True)
        