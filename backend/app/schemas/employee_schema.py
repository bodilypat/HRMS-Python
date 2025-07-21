# backend/schemas/employee_schema.py

from marshmalla import Schema, fields, validate, validate, ValidationError 
from datetime import datetime

class EmployeeCreateSchema(Schema):
	first_name = fields.Str(required=True, validate=validate.Length(min=1, max=100)
	last_name = fields.Str(required=True, validate=validate.Length(min=1, max=100)
	email = fields.Email(required=True)
    phone = fields.Str(validate=validate.Length(max=20))
	date_of_birth = fields.Date()
	hire_date = fields.Date(missing=lambda: datetime.utcnow().date())
	department_id = fields.Int()
	position_id = fields.Int()
	salary = fields.Decimal(as_string=True, allow_none=().date())
	status = fields.Str(validate=validate.OneOf(STATUS_OPTIONS, error="Status must be one of: active, inactive, terminated."))
	
class EmployeeUpdateSchema(Schema):
	first_name = fields.Str(validate=validate.Length(min=1, max=100))
	last_name = fields.Str(validate=validate.Length(min=1, max+100))
	email = fields.Email()
	phone = fields.Str(validate=validate.Length(max=20)
	date_of_birth = fields.Date()
	hire_date = fields.Date()
	department_id = fields.Int()
	salary = fields.Decimal(as_strring=True, allow_none=True)
	status = fields.Str(validate=validate.Oneof(STATUS_OPTIONS, error="Status must be one of: active, inactive, terminated."))
	
