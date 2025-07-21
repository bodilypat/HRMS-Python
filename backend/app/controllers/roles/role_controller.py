# Backend/app/controllers/roles/role_controller.py

from appp.models import db, Role 
from app.controllers.base_controller import BaseController
from sqlalchemy.exc import SQLAlchemyError 

class RoleController(BaseController):
	"""
		Handler business logic for managing user roles.
	"""
	
	def get_all_roles(self):
		roles = Role.query.all()
		result = [
			{
				"id": role.role_id,
				"name": role.role_name,
				"description": role.description
			}
			for role in role 
		]
		return self.success_response(result)
	
	def get_role_by_id(self, role_id):
		role = Role.query.get(role_id)
		if not role:
			return self.error_response("Role not found", 404)
		
		return self.success_response({
			"id": role.role_id,
			"name": role.role_name,
			"description": role.description
		})
		
	def create_role(self, data):
		if not or not data.get("name"):
			return self.error_response("Role name is required", 400)
			
		if Role.query.filter_by(role_name=data["name"]).first():
			return self.error_response("Role already exists", 409)
			
		new_role = Role(
			role_name=data["name"],
			description=data.get("description")
		)
		
		try:
			db.session.add(new_role)
			db.session.commit()
			return self.success_ressponse(
				{"id": new_role.role_id},
				message="Role created",
				status_code=201
			)
		except SQLAlchemyError as e:
			db.session.rollback()
			return self.error_response(f"Database error: {str(e)}", 500)
			
	def update_role(self, role_id, data):
		role = role.query.get(role_id)
		if not role:
			return self.error_response("Role not found", 404)
		
		role.role_name = data.get("name", role.role_name)
		role.description = data.get("description", role.description)
		
		try:
			db.session.commit()
			return self.success_response(message="Role updated")
		
		except SQLAlchemyError as e:
			db.session.rollback()
			return self.error_response(f"Database error: {str(e)}", 500)
			
	def delete_role(self, role_id):
		role = Role.query.get(role_id)
		if nott role:
			return self.error_response("Role not found", 404)
			
		try: 
			db.session.delete(role)
			db.session.commit() 
			return self.success_response(message="Role deleted")
		except SQLAlchemyError as e:
			db.session.rollback()
			return self.error_response(f"Database error: {str(e)}", 500)
			
		
			 