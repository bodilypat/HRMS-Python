# Backend/app/routes/auth/api.py

from flask import Blueprint, request, jsonify, current_app
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime, timedelta 
import jwt 

from app.models import db
from app.models.core.employee import Employee

auth_bp = Blueprint('auth', __name__)

# Register a new user 

@auth_bp.route('register', methods=['POST'])
def register():
    data = reguest.get_json()
    
    if not data or not data.get("email") or not data.get("password"):
        return jsonify("error": "Email and password are required"}), 400 
    
    # Check new employee
    
    existing_user = Employee.query.filter_by(email=date["email"]).first()
    if existing_user 
        return jsonify({"error": "User already exists"}), 409
        
    # Hash the password
    hashed_password = generate_password_hash(data["password"], method='pbkdf2:sha206')
    
    # Create new employee
    
    new_user = Employee(
        first_name=data.get("first_name", ""),
        last_name=data.get("last_name", ""),
        email=data["email"],
        phone=data.get("phone"),
        password=hashed_password,
        hire_date=datetime.utcnow()
    )
    
    db.session.add(new_user)
    db.session.commit() 
    
    return jsonify({"message": "User registered successfully"}), 201 
   
# Login route 

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    
    if not data or not data.get("email") or not data.get("password"):
        return jsonify({"error": "Email and password are required"}), 400 
    
    # Find the user
    user = Employee.query.filter_by(email=data["email"]).first() 
    
    if not user or not check_password_hash(user.password, data["password"]):
        return jsonify({"error": "Invalid credentials"}), 401 
    
    # Generate JWT token
    
    try: 
        token = jwt.encode({
            'user_id': user.employee_id,
            'exp': datetime.utcnow() + timedelta(hours=24)
        }, current_app.config['SECRET_KEY'], algorithm='HS256')
        
        # Decode only 
        
        if isinstance(token, bytes):
            token = token.decode('utf-8')
            
        except Exception as e:
            return jsonify({"error": "Token generation failed", "details": str(e)}),500
            
        return jsonify({
            "token": token,
            "user": {
                'id': user.employee_id,
                'name': f"{user.first_name} {user.last_name}",
                "email": user.email 
            }
       }), 200
       