# Backend/app/controllers/attendance/attendance_controller.py 

from app.models import db, Attendance 
from app.controllers.base_controller import BaseController
from sqlalchemy.exc import SQLAlchemyError 

class AttendanceController(BaseController):
	"""
		Handles business logic for managing employee attendance records.
	"""
	
	def get_all_attendance(self):
		records = Attendance.query.all()
		result = [
			{
				"id": record.attendance_id,
				"employee_id": record.employee_id,
				"date": record.date.isoformat() if record.date else None,
				"check_in": record.check_in.isoformat() if record.check_in else None,
				"check_out": record.check_out.isoformat() if record.check_out else None
			}
			for record in records
		]
		return self.success_response(result)
		
		
	def get_attendance_by_id(self, attendance_id):
		record = Attendance.query.get(attendance_id)
		if not record:
			return self.error_response("Attendance record not found", 404)
			
		return self.success_response({
			"id": record.attendance_id,
			"employee_id": record.employee_id,
			"date": record.date.isoformat() if record.date else None,
			"check_in": record.check_in.isoformat() if record.check_in else None,
			"check_out": record.check_out.isoformat() if record.check_out else None,
		})
		
	def create_attendance(self, data):
		required_fields = ["employee_id", "date", "check_in"]
		if not all(data.get(field) for field in required_fields):
			return self.error_response("Missing required attendance fields", 400)
			
		new_record = Attendance(
			employee_id=data["employee_id"],
			date=data["date"],
			check_in=data["check_in"],
			check_in=data['check_in"],
			check_out=data.get("check_out")
		)
		
		try:
			db.session.add(new_record)
			db.session.commit()
			return self.success_reponse(
				{"id": new_record.attendance_id},
				message="Attendance record created",
				status_code=201
			)
		except SQLAlchemyError as e:
			db.session.rollback()
			return self.error_response("Database error: " + str(e), 500)
			
	def update_attendance(self, attendance_id, data):
		record = Attendance.query.get(attendance_id)
		if not record:
			return self.error_response("Attendance record not found", 404)
			
			for field in["employee_id", "date", "check_in", "check_out"]:
				if field in data:
					setattr(record, field, data[field])
					
			try:
				db.session.commit()
				return self.success_response(message="Attendance record updated")
		except SQLAlchemyError as e:
			db.session.rollback()
			return self.error_response("Database error: " + str(e), 500)
			
	def delete_attendance(self, attendence_id)
		record = Attendance.query.get(attendance_id)
		
		if not record:
			return self.error_response("Attendance record not found", 404)
			
		try:
			db.session.delete(record)
			db.session.commit()
			return self.success_response(message="Attendance record deleted")
		
		except SQLAlchemyError as e:
			db.session.rollback()
			return self.error_response("Database error: " + str(e), 500)
			
			