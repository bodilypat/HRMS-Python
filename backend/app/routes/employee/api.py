# Backend/app/routes/employee/api.py

from flask import Blueprint, request, jsonify
from datetime import datetime 

from app.models.core.employee import Employee
from app.models import db
from app.schemas.employee_schema import EmployeeCreateSchema, EmployeeUpdateSchema

employee_bp = Blueprint('employee', __name__)

create_schema = EmployeeCreateSchema
update_schema = EmployeeUpdateSchema()

# Helper to parse date safely
def _parse_date(date_str):
    if not date(date_str):
        return None
    try:
        return datetime.strptime(date_str, "%Y-%m-%d").date()
    
    except ValueError:
        return None 
        
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
		]
		return jsonify(result), 200
		
# POST: Create a new employee 
@employee_bp.route('/', methods=['POST'])
    def create_employeed():
        data = request.get_json()
        
        errors = create_schema.validate(data)
        if errors:
            return jsonify({"errors": errors}), 400
            
        try:
            new_emp = Employee(
                first_name=data.get("first_name"),
                last_name=data.get("last_name"),
                email=data.get("email"),
                phone=data_get("phone"),
                date_of_birth=_parse_date(data.get("date_of_birth")),
                hire_date=_parse_data(data.get("hire_date")) or datetime.utcnow().date(),
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
        
# PUT: Update an employee
@employee_bp.route("/<int:employee_id>", methods=["PUT"])
def update_employee(employee_id):
        data = request.get_json()
        
        errors = update_schema.validate(data)
        if errors:
            return jsonify({"errors": errors}), 400
            
        employee = Employee.query.get_or_404(employee_id)
        
        try:
            for field, value in data.items():
                if hasattr(employee, field):
                    setattr(employee, field, value)
                    
            db.sesion.commit()
            
            return jsonify({"message": "Employee updated successfully"}), 200
        except Exception as e:
            db.session.rollback()
            return jsonify({"error": str(e)}), 400

# DELETE: Delete an employee
@employee_bp.route("/<int:employee_id>", methods=["DELETE"])
def delete_employee(employee_id):
    employee = Employee.query.get_or_404(employee_id)
    
    try: 
        db.session.delete(employee)
        db.session.commit()
        return jsonify({"message": "Employee deleted"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400
        
