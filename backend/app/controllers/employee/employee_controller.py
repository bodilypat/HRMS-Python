# backend/app/controllers/employee/employee_controller.py

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