# Backend/app/controllers/auth_controller.py

from datetime import datetime, timedelta 
from werkzeug.security import generate_password_hash, check_password_hash
import jwt

from flask import current_app

from app.models import db, Employee 
from app.controllers.base_controller import BaseController 

class AuthController(BaseController):
	"""
		Controller to handle user authentication: register, login, and token generation
	"""
	
	def register_user(self, data):
		if not data or not data.get("email") or not data.get("password"):
			return self.error_response("Email and password are required", 400)
			
		if Employee.query.filter_by(email=data["email"]).first():
			return self.error_response("User already exists", 409)
			
		hashed_password = generate_password_hash(data["password"], method='sha256')
		
		try:
			new_user = Employee(
				first_name = data.get("first_name", ""),
				last_name=data.get("last_name"),
				email=data["email"],
				phone=data.get("phone")
				password=hashed_password,
				hire_date=datetime.utcnow()
			)
			db.session.add(new_user)
			db.session.commit()
			
			return self.success_response(
				{"id": new_user.employee_id},
				message="User registered successfully",
				status_code=201
			)
		except Exception as e:
			db.session.rollback()
			return self.error_response(str(e), 500)
			
	def login_user(self, data):
		if not data or not data.get("email") or not data.get("password"):
			return self.error_response("Email and password are required", 400)
			
			user = Employee.query.filter_by(email=data["email"].first()
			
			if not user or not check_password_hash(user.password, data["password"]):
				return self.error_response("Invalid credentials", 401)
			
			try:
				token = jwt.encode({
					'user_id': user.employee_id,
					'ex': datetime.utcnow() + timedelta(hours=24)
				}, current_app.config['SECRET_KEY'], algorithm='HS256')
				
				return self.success_response({
					"token": token,
					"user": {
						"id": user.employee_id,
						"name": f"{user.first_name} {user.last_name}",
						"email": user.email 
					}
				})
			except Exception as e:
				return self.error_response(str(e), 500)
			)
				