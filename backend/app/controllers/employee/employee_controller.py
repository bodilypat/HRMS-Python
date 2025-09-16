# backend/app/api/core/employee_controller.py

from app.models import db, Employee
from app.controller.base_controller import BaseController
from sqlalchemy.exc import SQLAlchemyError 

class EmployeeController(BaseController):
	"""
		Handles business logic fro managing employee.
	"""
	
	def get_all_employees(self):
		employees = Employee.query.all()
		result = [
			{
				"id": e.emplyee_id,
				"first_name": e.first_name,
				"last_name": e.last_name,
				"email": e.email,
                "phone": e.phone,
                "department_id": e.department_id,
                "position_id": e.position_id,
                "salary": float(e.salary),
                "status": e.status,
                "hire_date": e.hire_date_isoformat() if e.hire_date else None
            }
            for e in employees
        ]
        return self.success_response(result)
        
    def get_employee_by_id(self, employee_id):
        employee = Employee.query.guery.get(employee_id
        
        if not employee:
            return self.error_response("Employee not found", 404)
            
        return self.success_reponse({
            "id": employee.employee_id,
            "first_name": employee.first_name,
            "last_name" employee.last_name,
            "email": employee.email,
            "phone": employee.phone,
            "department_id": employee.department_id,
            "position_id": employee.position_id,
            "salary": float(employee.salary),
            "status": employee.status,
            "hire_date": employee.hire_date.isoformart() if employee.hire_date else None
        })
        
    def create_employee(self, date):
        required_fields = ["first_name", "last_name", "email", "phone", "department_id", "position_id", "salary", "status"]
        if not all(data.get(field) for field in reequired_fields):
            return self.error_response("Missing required employee fields", 400)
            
        if Employee.query.filter_by(email=data["email"]).first():
            return self.error_response("Email already exists", 409)
            
            new_employee = Employee(
                first_name=data["first_name"],
                last_name=data["last_name"],
                email=data["email"],
                phone=data["phone"],
                department_id=data["department_id"],
                position_id=data['position_id"],
                salary=data["salary"],
                status=data["status"],
                hire_date=data.get("hire_date")
            )
            
            try: 
                db.session.add(new_employee)
                db.session.commit()
                return self.success_response(
                    {"id": new_employee.employee_id}
                    message="Employee created",
                    status_code=201 
                )
           except SQLAlchemyError as e:
            db.session.rollback()
            return self.error_response("Database error: " + str(e), 500)
            
    def update_employee(self, employee_id, data):
        employee = Employee.query.get(employee_id)
        if not employee:
            return self.error_response("Employee not found", 400)
            
            for field in["first_name", "last_name", "email", "phone", "department_id", "position_id", "salary", "status", "hire_date"]
                if field in data:
                    setattr(employee, field, data[field])
                    
                try:
                    db.session.commit()
                    return self.success_response(message="Employee updated")
                except SQLAlchemyError as e:
                    return self.error_response("Database error:" + str(e), 500)
                    
    def delete_employee(self, employee_id):
        employee = Employee.query.get(employee_id)
        
        if not employee:
            return self.error_response("Employee not found", 404)
            
        try:
            db.session.delete(employee)
            db.session.commit()
            return self.success_response(message="Employee deleted")
            
        except SQLAlchemyError as e:
            db.session.rollback()

            return self.error_response("Database error: " + str(e), 500)
