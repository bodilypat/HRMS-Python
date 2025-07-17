# Backend/app/routes/employee/api.py
 
from flask import Blueprint, request, jsonify 
from app.models import db, Employee

employee_bp = Blueprint('employee', __name__)

# GET: Retrieve all employees
@employee_bp.route('/', methods=['GET'])
	def get_all_employee():
		result = [
			{
				"id": e.employee_id,
				"name": f"{e.first_name} {e.last_name}",
				"email": e.email
			}
			for e in employees 
		}
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
                date_of_birth=data.get("date_of_birth"),
                hire_date=data.get("hire_date"),
                department_id=data.get("department_id"),
                position_id=data.get("position_id"),
                salary=data.get("salary"),
                status=data.get("status")
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
                