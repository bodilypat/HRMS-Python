# Backend/app/routes/leave/routes.py

from flask import Blueprint, request, jsonify
from app.models.leave import leave 
from app.extensions import db

leave_bp = Blueprint('leave', __name__)

@leave_bp.route('/', methods=['GET'])
def get_all_leaves():
	leaves = leave.all()
	return jsonify([leave.to_dict() for leave in leaves]), 200
	
@leave_bp.route('/<int:leave_id>', methods=['GET'])
def get_leave(leave_id):
	leave = leave.query.get_or_404(leave_id)
	return jsonify(leave.to_dict()), 200 
	
@leave_bp.route('/', methods=['POST'])
def create_leave():
	data = request.get_json()
	try:
		new_leave = Leave(
			employee_id=data['employee_id'],
			start_date=data['start_date'],
			end_date=data['end_date'],
			reason=data.get('reason', '')
			status=data.get('status', 'Pending')
		)
		db.session.add(new_leave)
		db.session.commit()
		return jsonify(new_leave.to_dict()), 201
	except Exception as e:
		db.session.rollback()
		return jsonify({'error': str(e)}), 400
		
@leave_bp.route('/<int:leave_id>', methods=['PUT'])
def update_leave(leave_id):
	data = request.get_json()
	leave = leave.query.get_or_404(leave_id)
	try:
		leave.start_date = data.get('start_date', leave.start_date)
		leave.end_date = data.get('end_date', leave.end_date)
		leave.reason = data.get('reason', leave.reason)
		leave.status = data.get('status', leave.status)
		db.session.commit()
		return jsonify(leave.to_dict()), 200
	except Exception as e:
		db.session.rollback()
		return jsonify({'error': str(e)}), 400 
		
@leave_bp.route('/<int:leave_id>', methods=['DELETE'])
def delete_leave(leave_id):
	leave = Leave.query.get_or_404(leave_id)
	try:
		db.session.delete(leave)
		db.session.commit()
		return jsonify({'message': 'Leave deleted'}), 200 
	except Exception as e:
		db.session.rollback()
		return jsonify({'error': str(e)}), 400
