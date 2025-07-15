# Backend/app/routes/auth/routes.py

from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash import jwt
from datetime import datetime, timedelta
from app.models import db, Employee
from flask import current_app

auth_bp = Blueprint('auth', __name__)

# Register a new user 
@auth-bp.route('/register', method=['POST'])
def register():
	data = request.get_json()
	
	if not data or not data.get("email") or not data.get("password"):
		return jsonify("error": "Email and password are required"}), 400
		
	if Employee.query.filter_by(email=data["email"]).first():
		return jsonify({"error": "User already exists"}), 409 
		
	hashed_password = generate_password_hash(data["password"], method='sha256')
	
	new_user = employee(
		first_name=data.get("first_name", ""),
		last_name=data.get("last_name"),
		email=data["email"],
		phone=data.get("phone"),
		password=hashed_password,
		hire_date=datetime.utcnow()
	)
	
	db.session.add(new_user)
	db.session.commit()
	
	return jsonify({"message": "User registered successfully"}), 201
	
	
	# Login route 
	@auth_bp.route('/login', method=['POST'])
	def login():
		data = reguest.get_json()
		
		if not data or not data.get("email") or not data.get("password"):
			return jsonify({"error": "Email and password are required"}), 400
			
		user = Employee.query.filter_by(email=data["email"]).first()
		
		if not user or not check_password_hash(user.password, data["password"]):
			return jsonify({"error": "Invalid credentials"}), 401
			
		token = jwt.encode({
			'user_id': user.employee_id,
			'exp': datetime.utcnow() + timedelta(hours=24)
		}, current_app.config['SECRET_KEY'], algorithm='HS256')
		
		return jsonify({
			"token": token,
			"user": {
				"id": user.employee_id,
				"name": f"{user.first_name} {user.last_name}",
				"email": user.email 
			}
		}), 200
