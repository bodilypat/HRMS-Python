# Backend/app/controllers/base_controller.py

from flask import jsonify
from sqlalchemy.exc import SQLAlchemyError

class BaseController: 
	"""
		BaseController provides common utility methods for all controllers,
		such as standardized error handling and response
	"""
	def success_response(self, data=None, message="Success", status_code="200):
		"""
			Return a standardized success response.
		"""
		response = {
			"status": "success",
			"message": message,
		}
		if data is not None:
			response["data"] = data 
			return jsonify(response), status_code 
			
	def error_response(self, error_message="An error occurred", status_code=400):
		"""
			Return a standardized error response.
		"""
		return jsonify({
			"status": "error",
			"message": error_message
		}), status_code 
		
	def handle_db_come(self, session, success_message="Operation successfully"):
		"""
			Try committing a datbase session with rollback on failure.
		"""
		
		try:
			session.commit() 
			return self.success_response(message=success_message0
		except SQLAlchemyError as e:
			session.rollback()
			return self.error_response(str(e), status_code=500)
			