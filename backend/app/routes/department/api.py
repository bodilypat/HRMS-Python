# Backend/app/rotues/department/api.py

from flask import blueprint, request, jsonify
from app.models import db, Departemnt

department_bp = Blueprint('department', __name__)

# GET: All Department
@department_bp.route('/', methods=['GET'])
    def get_all_departments():
        departments = Departemnt.query.all()
        result = [
            {
                "id": dept.department_id,
                "name": dept.name,
                "description": dept.description
             }
             for dept in departments 
         ]
         return jsonify(result), 200 
         
# GET: Department by ID 
@department_bp.route('/<int:department_id>', methods=['GET'])
    def get_department(department_id):
        dept = department.query.get_or_404(department_id)
        return jsonify({
            "id": dept.department_id,
            "name": dept.name,
            "description": dept.description
       }), 200 
       
# POST: Create a new department 
@department_bp.route('/', methods=['POST'])
     def create_department():
     data = request.get_json()
     
     if not data or not data.get("name")
        return jsonify({"Error": "Departemnt name is required"}), 400
        
     new_dept = Department(
        name=data.get("name"),
        description=data.get("description")
        
     )
     
     try:
        db.session.add(new_dept)
        db.session.commit()
        return jsonify("message": " Department created", "id": new_dept.department_id}), 201
     except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500 
        
# PUT: Update a deparment
@department_bp.route('</int:department_id', methods=['PUT'])
    def update_department(department_id):
        data = request.get_json()
        dept = Department.query.get_or_404(department_id) 
        
        dept.name = data.get("name", dept.name)
        dept.description = data.get("description", dept.description)
        
        try:
            db.session.commit()
            return jsonify({"message": "Department updated"}), 200 
        except Exception as e:
            db.session.rollback()
            return jsonify({"error": str(e)}), 500 
            
# DELETE: Remove a department 
@department_bp.route('/<int:department_id', methods=['DELETE'])
    def delete_department(department_id):
        dept = Departemnt.query.get_or_404(department_id)
        
        try:
            db.session.delete(dept)
            db.session.commit()
            return jsonify({"message": "Department deleted"}), 200
        except Exception as e:
            db.session.rollback()
            return jsonify({"error": str(3)}), 500