# Backend/app/routes/employee_routes.py

from flask import Blueprint, request, jsonify
from app.models import db, Employee

employee_bp = Blueprint('employee', __name__)

@employee_bp.route('/', methods=['GET'])
	def get_all_employees():
	employees = Employee.query.all()
	result = [
		{
			"id": e.employee_id,
			"name": f"{e.first_name} {e.last_name}",
			'email': e.email
		} for e in employees
	]
	return jsonify(result) 
	
@employee_bp.route('/', methods=['POST'])
	def create_employee():
		data = request.json 
		new_app = Employee(
			first_name=data.get("first_name"),
			last_name=data.get("last_name"),
			email=data.get("email"),
			phone=data.get("phone"),
			date_of_birth=data.get("date_of_birth"),
			hire_date=data.get("hire_date")
			department_id=data.get("department_id")
			position_id=data.get("position_id")
			salary=data.get("salary")
			status=data.get("status")
			
		)
		de.session.add(new_emp)
		db.session.commit()
		return jsonify("message":"Employee created", "id": new_emp.employee.id}), 201
	