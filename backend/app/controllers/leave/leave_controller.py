# Backend/app/controllers/leave/leave_controller.py

from app.models import db, LeaveRequest
from app.controllers.base_controller import BaseController 
from sqlalchemy.exc import SQLAlchemyError 

class LeaveController(BaseController):
	"""
		Handles business login for managing employee leave requests.
	"""
	
	def get_all_leaves(self):
		leaves = LeaveRequest.query.all()
		result = [
			{
				"id": leave.leave_id,
				"employee_id": leave.employee_id,
				"start_date": leave.start_date.isoformat(),
				"end_date": leave.end_date.isoformat(),
				"leave_type": leave.leave_type,
				"status": leave.status
			}
			for leave in leaves 
		]
		return self.success_response(result)
		
	def get_leave_by_id(self, leave_id):
        leave = LeaveRequest.query.get(leave_id)
        if not leave:
            return self.error_response("Leave request not found", 404)
            
        return self.success_response({
            "id": leave.leave_id,
            "employee_id": leave.employee_id,
            "start_date": leave.start_date.isoformat(),
            "end_date": leave.end_date.isoformat(),
            "leave_type": leave.leave_type,
            "status": leave.status
        })
        
   def create_leave(self, data):
       required_fields = ["employee_id", "start_date", "end_date", "leave_type"]
       
       if not all(data.get(field) for field in required_fields):
            return self.error_response("Missing required leave fields", 400)
            
       new_leave = LeaveRequest(
           employee_id=data["employee_id"],
           start_date=data["start_date"],
           end_date=data["end_date"],
           leave_type=data["leave_type"],
           status=data.get("status", "Pending")
       )
       
       try: 
           db.session.add(new_leave)
           db.session.commit()
           return self.seccess_response(
               {"id": new_leave.leave_id},
               message="Leave request created",
               status_code=201 
           )
      except SQLAlchemyError as e:
        db.session.rollback()
        return self.error_response(f"Database error: {str(e)}", 500)
        
   def update_leave(self, leave_id, data):
        db.session.rollback()
        return self.error_response(f"Database error: {str(e)}", 500)
        
   def update_leave(self, leave_id, data):
      leave = LeaveRequest.query.get(leave_id)
      if not leave:
            return self.error_response("Leave request not found", 404)
      for field in ["start_date", "end_date", "leave_type", "status"]:
        if field in data:
            setattr(leave, field, data[field])
      try:
            db.session.commit() 
            return self.seccess_response(message="Leave request updated")
      
      except SQLAlchemyError as e:
           db.session.rollback()
           return self.error_response(f"Database error: {str(e)}", 500)
           
    def delete_leave(self, leave_id):
        leave = LeaveRequest.query.get(leave_id)
        if not leave:
             return self.error_response("Leave request not found", 404)
             
        try:
            db.session.delete(leave)
            db.session.commit()
            return self.error_response(message="Leave request deleted")
        except SQLAlchemyError as e:
            db.sessin.roolback()
            return self.error_response(f"Database error: {str(e)}", 500)
      