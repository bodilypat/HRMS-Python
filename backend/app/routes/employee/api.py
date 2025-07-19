# Backend/app/routes/employee/api.py

from flask import Blueprint, request, jsonify
from app.models.core.employee import Employee
from app.models import db
from datetime import datetime

employee_bp = Blueprint('employee', __name__)

# GET: Retrieve all employees
@employee_bp.route('/', methods=['GET'])
	def get_all_employee():
        employees = Employee.query.all()
		result = [
			{
				"id": e.employee_id,
				"name": f"{e.first_name} {e.last_name}",
				"email": e.email
                "phone": e.phone,
                "status": e.status
			}
			for e in employees 
		}]
		return jsonify(result), 200
		
# POST: Create a new employee 
@employee_bp.route('/', methods=['POST'])
    def create_employeed():
        data = request.get_json()
        
        required_fields = ["first_name", "last_name", "email"]
        
        if not all(data.get(field) for field in required_fields):
            return jsonify({"error": "Missing required fields"}), 400
            
        try:
            new_emp = Employee(
                first_name=data.get("first_name"),
                last_name=data.get("last_name"),
                email=data.get("email"),
                phone=data_get("phone"),
                date_of_birth=_parse_date(data.get("date_of_birth")),
                hire_date=_parse_data(data.get("hire_date", datetime.utcnow().date())),
                department_id=data.get("department_id"),
                position_id=data.get("position_id"),
                salary=data.get("salary"),
                status=data.get("status", "active")
           )
           
           db.session.add(new_emp)
           db.session.commit()
           
           return jsonify({
                "message": "Employee created successfully",
                "id": new_emp.employee_id
           }), 201
           
     except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400 
                
    # Helper to parse date safely
    def _parse_data(date_str):
        if not date_str:
            return None
        try:
            return datetime.strptime(date_str,"%y-%m-%d).date()
        except ValueError:
            return None
            