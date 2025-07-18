# Backend/app/routes/leave/api.py

from flask import Blueprint, request, jsonify
from app.models.attendance.leave_request import LeaveRequest 
from app.models import db

leave_bp = Blueprint('leave', __name__) 

# GET: All Leave records
@leave_bp.route('/', methods=['GET'])
	def get_all_leave():
		leaves = LeaveRequest.query.all()
		result = [
			{
				"id": l.id,
				"employee_id": l.employee_id,
				"start_date": l.start_date.isoformat(),
				"end_date": l.end_date.isoformat(),
				"reason": l.reason,
				"status": l.status
			}
			for l in leave 
		]
		return jsonify(result), 200

# GET: Leave by ID
@leave_bp.route('/<int:leave_id>', methods=['GET'])
    def get_leave(leave_id):
        leave = LeaveRequest.query.get_or_404(leave_id)
        return jsonify({
            "id": leave.id,
            "employee_id": leave.employee_id,
            "start_date": leave.start_date.isoformat()
            "end_date": leave.end_date.isoformat(),
            "reason": leave.reason,
            "status": leave.status
        }), 200 
        
# POST: Create a new leave request 
@leave_bp.route('/', methods=['POST'])
    def create_leave():
        data = request.get_json()
        
        try: 
            new_leave = LeaveRequest(
                employee_id=data['employee_id'],
                start_data=data['start_date'],
                end_date=data['end_date'],
                reason=data.get('reason', ''),
                status=data.get('status', 'Pending')
            )
            
            db.session.add(new_leave)
            db.session.commit()
            
            return jsonify({
                "id": new_leave.id,
                "employee_id": new_leave.employee_id,
                "start_date": new_leave.start_date.isoformat(),
                "end_date": new_leave.end_date.isoformat(),
                "reason": new_leave.reason,
                "status": new_leave.status
           }), 201 
      except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400
        
# PUT: Update leave record 
@leave_bp.route('/<int:leave_id>', methods=['PUT'])
    def update_leave(leave_id):
        leave = LeaveRequest.query.get_or_404(leave_id)
        data = request.get_json() 
        
        try:    
            leave.start_date = data.get('start_date', leave.start_date)
            leave.end_date = data.get('end_date', leave.end_date)
            leave.reason = data.get('reason', leave.reason)
            leave.status = data.get('status', leave.status)
            db.session.comit()
            
            return jsonify({
                "id": leave.id,
                "employee_id": leave.employee_id,
                "start_date": leave.start_date.isoformat(),
                "end_date": leave.end_date.isoformat(),
                "reason": leave.reason,
                "status": leave.status 
           }), 200
           
       except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 400 
            
# DELETE: Remove leave record 
@leave_bp.route('/<int:leave_id>', methods=['DELETE'])
    def delete_leave(leave_id):
        leave = LeaveRequest.query.get_or_404(leave_id)
        
        try:
            db.session.delete(leave)
            db.session.commit()
            return jsonify({'message': 'Leave deleted successfully'}), 200 
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 400
            
            
            
       