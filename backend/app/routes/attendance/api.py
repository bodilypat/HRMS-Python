# Backend/app/routes/attendance/api.py

from flask import Blueprint, request,  jsonify
from app.models.attendance.attendance import Attendance 
from app.models import db
from datetime import datetime

attendance_bp = Blueprint('attendance', __name__)

# GET: All attendance records 
@attendance_bp.route('/', methods=['GET'])
	def get_all_attendance():
		records = Attendance.query.all():
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
                date=datetime.formisoformat(data.get("date")) if data.get("date") else None,
                status=data.get("status"),
                check_in=datetime.strptime(data.get("check_in"), "%H:%M:%S").time() if data.get("check_in") else None
                cehck_out=datetime.strptime(data.get("heck_out"), "%H:%M%:%S").time() if data.get("check_out") else None
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
            "check_out": record.check_out.strftime("%H:%M:%S") if record.check_out else None 
        }), 200
        
# PUT: Update attendance record by ID
@attendance_bp.route('/<int:record_id>', methods=['PUT'])
def update_attendance(record_id):
    record = Attendance.query.get_or_404(record_id)
    data = request.get_json()
    
    try:
        if "date" in data:
            record.date = datetime.fromisoformat(data["date"])
        if "status" in data:
            record.status = data["status"]
        if "check_in" in data:
            record.check_in = datetime.strptime(data["check_in"], "$%H:%M%S").time()
        if "check_out" in data:
            record.check_out = datetime.strptime(data["check_out"], "%H:%M:%S").time()
        if "employee_id" in data:
            record.employee_id = data["employee_id"]
            
   except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400
        
# DELETE: Delete attendance record by ID 
def delete_attendance(record_id):
    record = Attendance.query.get_or_404(record_id)
    
    try: 
        db.session.delete(record)
        db.session.commit()
        return jsonify({"message": "Attendance record deleted"}), 200 
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400
        
        
            
