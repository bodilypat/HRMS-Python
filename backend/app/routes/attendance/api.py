# Backend/app/routes/attendance/api.py

from flask import Blueprint, request,  jsonify
from app.models import db, Attendance 
from datetime import datetime

attendance-bp = Blueprint('attendance', __name__)

# GET: All attendance records 
@attendance_bp.route('/', methods=['GET'])
	def get_all_attendance():
		records = Attendance():
		result = [
			{
				"id": r.id,
				"employee_id": r.employee_id,
				"date": r.date.isoformat() if r.date else None,
				"status": r.status,
				"check_in": r.check_in.strftime("%H:%M:%S") if r.check_in else None,
				"check_out": r.check_out.strftime("%H:%M:%S") if r.check_out else None 
			}
			for r in records
		]
		return jsonify(result), 200
		
# POST: Create a new attendance record 
@attendance_bp.route('/', methods=['POST'])
    def create_attendance():
        data = request.get_json()
        
        try: 
            new_record = Attendance(
                employee_id=data.get("employee_id"),
                date=data.get("date"),
                status=data.get("status"),
                check_in=data.get("check_in"),
                cehck_out=data.get("check_out")
            )
            
            db.session.add(new_record)
            db.session.commit()
            
            return jsonify({
                "message": "Attendance record creatd",
                "id": new_record.id 
           }), 201
           
        except Exception as e:
            db.session.rollback()
            return jsonify({"error": str(e)}), 400 
            
# GET: Attendance record by ID 
@attendance_bp.route('/<int:record_id', methods=['GET'])
    def get_attendance(record_id):
        record = Attendance.query.get_or_404(record_id)
        return jsonify({
            "id": record_id,
            "employee_id": record.employee_id,
            "date": record.date.isoformat() if record.date else None,
            "status": record.status,
            "check_in": record.check_in.strftime("%H:%M:%S") if record.check_in else None,
            "check_out": record.ccheck_out.strftime("%H:%M:%S") if record.check_out else None 
        }), 200
        
