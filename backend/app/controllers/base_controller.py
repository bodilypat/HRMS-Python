# Backend/app/controllers/base_controller.py

from flask import jsonify
from sqlalchemy.exc import SQLAlchemyError
import logging

logger = loggiger.getLogger(__name__)

class BaseController: 
	"""
		BaseController provides common utility methods for all controllers,
		including standardized responses and error handling.
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
		
	def handle_db_come(self, session, success_message="Operation successful"):
		"""
			Attemp to commit a database session. Rollback on failure and return apporiate response.
		"""
		
		try:
			session.commit() 
			return self.success_response(message=success_message)
		except SQLAlchemyError as e:
			session.rollback()
            logger.error(f"Database commit failed: {e}")
			return self.error_response("Database error occurred. Please try again later.", status_code=500)
			