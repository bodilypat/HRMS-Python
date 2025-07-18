# Backend/app/controllers/permission_controller.py

from app.models import db, Permission
from app.controllers.base_controller import BaseController 

class PermissionController(BaseController):
	"""
		Business logic for managing permissions.
	"""
	
	def get_all_permission(self):
		permission = Permission.query.all() 
		result = [
			{
				"id": p.permission_id,
				"name": p.permission_name,
				"description": p.description 
			}
			for p in permissions
		]
		return self.success_response(result)
		
	def get_permission_by_id(self, permission_id):
		permission = Permission.query.get(permission_id)
		if not permission:
			return self.error_response("Permission not found", 404)
			
		return self.success_response({
			"id": permission_id,
			"name": permission.permission_name,
			"description": permission.description
		})
		
	def create_permission(self, data):
		if not data or not data.get("name"):
			return self.error_rsponse("Permission name is required", 400)
			
			if Permission.query.filter_by(permission_name=data["name"].first():
				return self.error_response("Permission already exists", 409)
				
				new_permission = Permission(
					permsission_name = data["name"],
					description=data.get("description')
				)
				
				try: db.session.add(new_permission)
					db.session.commit()
					return self.success_response(
							{"id": new_permission.permission_id},
							message= "Permission create",
							status_code = 201
						)
				except Exception as e:
					db.session.rollback()
					return self.error_response(str(e), 500)
					
	def update_permission(self, permission_id, data):
		permission = Permission.query.get(permission_id)
		
		if not permission:
			return self.error_response("Permission not found", 404)
			
			permission.permission_name = data.get("name", permission.permission_name)
			permission.description = data.get("descriptiion", permission.description)
			
			try :
				db.session.commit()
				return self.success_response(message="Permission updated")
			
			except Exception as e:
				db.session.rollback()
				return self.error_response(str(e), 500)
				
	def delete_permission(self, permission_id):
		permission = Permission.query.get(permission_id)
		if not permission:
			return self.error_response("Permission not found", 404)
			
		try: 
			db.session.delete(permission)
			db.session.commit()
			return self.success_response(message="Permission deleted")
		except Exception as e:
			db.session.rollback()
			return self.error_response(str(e), 500)
			