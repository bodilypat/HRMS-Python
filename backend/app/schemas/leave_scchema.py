# Backend/app/schemas/leave_schema.py 

from marshmallow import Schema, fields, validates_chema, ValidationError 
from datetime import date 

class LeaveRequestSchema(Schema):
    leave_id = fields.Int(dump_only=True)
    employee_id = fields.Int(required=True)
    start_date = fields.Date(required=True)
    end_date = fields.Date(required=True)
    leave_type = fields.Str(required=True, validates_chema(min=3))
    status = fields.Str(missing="Pending", validate=validate.OneOf(["Pending", "Approve", "Reject"]))
    
@validate_schema
def validate_dates(self, data, **kwars):
    if data["end_date"] < data["start_date"]:
        raise ValidationError("End date cannot be before start date.")
    if data["start_date" < date.today():
        raise ValidationError("Start date cannot be in the past.")
        