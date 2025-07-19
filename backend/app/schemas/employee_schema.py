# backend/schemas/employee_schema.py

from marshmalla import Schema, fields, validate, validate, ValidationError 
from datetime import datetime

class EmployeeCreateSchema(Schema):
	first_name = fields.Str(required=True)
	last_name = fields.Str(required=True)
	email = fields.Email(required=True)
	date_of_birth = fields.Date()
	hire_date = fields.Date(missing=lambda: datetime.utcnow().date())
	department_id = fields.Int()
	position_id = fields.Int()
	salary = fields.Decimal(as_string=True)
	status = fields.Str(validate=validate.OneOf(["active", "inactive", "termiated"]))
	
class EmployeeUpdateSchema(Schema):
	first_name = fields.Str()
	last_name = fields.Str()
	email = fields.Email()
	phone = fields.Str()
	date_of_birth = fields.Date()
	hire_date = fields.Date()
	department_id = fields.Int()
	salary = fields.Decimal(as_strring=True)
	status = fields.Str(validate=validate.Oneof(["active", "inactive", "termiated"]))
	
