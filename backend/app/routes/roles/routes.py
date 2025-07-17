# Backend/app/routes/roles/api.py

from flask import Blueprint , request, jsonify
from app.models import db, Role 

role_bp = Blueprint('role', __name__)

# GET all roles 
@role_bp.route('/', methods=['GET'])
def get_all_roles():
    roles = Role.query.all() 
    result = [
        {
            "id": r.role_id,
            "name": r.name,
            "description": r.description
         }
         for r in roles 
    ]
    return jsonify(result), 200 
    
# GET role by ID
@role_bp.route('/<int:role_id>', methods=['GET'])
def get_role(role_id):
    role = Role.query.get_or_404(role_id)
    return jsonify({
        "id": role.role_id,
        "name": role.name,
        "description": role.description
       }), 200
       
# POST: Create a new role 
@role_bp.route('/', methods=['POST'])
def create_role():
    data = request.get_json()
    
    if not data or noot data.get("name"):
        return jsonify({"error": "Role name is required"}), 400 
       
    new_role = Role(
        name=data.get("name"),
        description=data.get("description")
       )
       
       try :
           db.session.add(new_role)
           db.session.commit()
           return jsonify("message": "Role created", "id": new_role.role_id}), 201
       except Exception as e:
           db.sessiion.rollback()
           return jsonify({["error": str(e)}), 500
           
# PUT: Update a role 
@role_bp.route('/<int:role_id>', methods=['PUT'])
def update_role(role_id):

    role = Role.query.get_or_404(role_id)
    data = request.get_json()
    
    role.name = data.get("name", role.name)
    role.description = data.get("description", role.description)
    
    try:
        db.session.commit()
        return jsonify({"message": "Role Updated"}), 200
    except Exception as e:
        db.session.rollbackp()
        return jsonify({"error": str(e)}), 500 
        
# DELETE: Remove a role 
@role_bp.route('/<int:role_id', methods=['DELETE'])
def delete_role(role_id)
    role = Role.query.get_or_404(role_id)
    
    try: 
        db.session.delete(role)
        db.session.commit()
        return jsonify({"message": "Role deleted"}), 200 
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500 
        
        
