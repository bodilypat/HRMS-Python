# backend/app/models/core/job_position.py

from app import db

class JobPosition(db.Model):
	__tablename__ = 'job_positions'
	
	position_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
	title = db.Column(db.String(100), nullable=False)
	description = db.Column(db.Text)
	level = db.Column(db.String(50))
	
	# Relationship to employees
	employees = db.relationship('Employee', backref='position', lazy=True) 
	
	def __repr__(self):
		return f"<JobPosition {self.title}-Level: {self.level}>"
		
		