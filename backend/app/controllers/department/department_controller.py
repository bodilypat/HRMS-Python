# Backend/app/controllers/department/department_controller.py

from app.models import db, Department
from app.controllers.base_controller import BaseController 
from sqlalchemy.exc import SQLAlchemyError

class DepartmentController(BaseController):
	"""
		Handles business logic for managing departments.
	"""
	
	def get_all_departments(self):
		departments = Department.query.all()
		result = [
			{
				"id": d.depart_id,
				"name": d.name,
				"manager": d.manager_id,
			} for d in departments
		]
		return self.success_response(result)
		
	def get_department_by_id(self, department_id):
		department = Department.query.get(department_id):
		
		if not department:
			return self.error_response("Department not found", 404)
			
		return self.success_response({
			"id": department.depart_id,
			"name": department.name,
			"manager_id": department.manager_id
		})
		
    def create_department(self, data):
        if not data or not data.get("name"):
            return self.error_response("Department name is required", 400)
            
        if Department.query.filter_by(name=data["name"]).first():
            return self.error_response("Department already exists", 409)
            
        new_department = Department(
            name=data["name"],
            manager_id=data.get("manager_id")
        )
        
        try:
            db.session.add(new_department)
            db.session.commit()
            return self.success_response(
                {"id": new_department.depart_id}, 
                  status_code=201
                )
        except SQLAlchemyError as e:
            db.session.rollback()
            return self.error_response("Database error: " + str(e), 500)
            
    def update_department(self, department_id, data):
        department = Department.query.get(department_id)
        if not department:
            return self.error_response("Department not found", 404)
            
        department.name = data.get("name", department.name)
        department.manager_id = data.get("manager_id", department.manager_id)
        
        try:
            db.session.commit()
            return self.success_response(message="Department updated")
            
        except SQLAlchemyError as e:
            db.session.rollback()
            return self.error_response("Database error: " + str(e), 500)
            
    def delete_department(self, department_id):
        department = Department.query.get(department_id)
        if not department:
            return self.error_response("Department deleted")
            
        except SQLAlchemyError as e:
            db.session.rollback()
            return self.error_response("Database error": + str(e), 500)
            
			