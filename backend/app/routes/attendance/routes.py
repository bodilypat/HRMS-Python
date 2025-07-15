# Backend/app/routes/attendance/routes.py

from flask import Blueprint, request, jsanify
from app.models import db, Attendance 

attendance_bp = Blueprint('attendance', __name__)

# Get all attendance records 
@attendance_bp.route('/', methods['Get'])
def get_all_attendance():
	records = Attendance.query.all()
	result = [
		{
			"id": r.id,
			"employee_id": r.employee_id,
			"date": r.date.isoformat(),
			"status": r.status,
			"check_in": r.check_in.strtime("%H:%M:S") if r.check_in else None,
			"check_out": r.check_out.strftime("%H:%M:%S") if r.check_out else None
		}
		for r in records 
	]
	return jsanify(result), 200
	
# POST: Create a new attendance record 
@attendance_bp.route('/', method=['POST'])
def create_attendance():
	data = request.get_json()
	
	try:
		new_record = Attendance(
			employee_id=data.get("employee_id"),
			date=date.get("date"),
			status=data.get("status")
			check_in=data.get("check_in"),
			check_out=data.get("check_out")
		)
		
		db.session.add(new_record)
		db.session.commit()
		
		return jsanify({
			"message": "Attendance record created",
			"id": new_record.id
			}), 201
			
		except Exception as e:
			db.session.rollback()
			return jsonify({"error": str(e)}), 400
		
# Get attendance record by ID 
@attendance_bp.route('/<int:record_id>', methods=['GET'])
def get_attendance(record_id):
	record = Attendance.query.get_or_404(record_id)
	return jsanify({
		"id": record.id,
		"employee_id": record.employee_id,
		"date": record.date.isoformat(),
		"status": record.status,
		"check_in": record.check_in.strftime("%H:%M:%S") if record.check_in else None,
		"check_out": record.check_out.strftime("%H:%M:%s) if record.check_out else None,
	}), 200
	
