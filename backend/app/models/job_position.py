# backend/app/models/job_position.py

from . import db

class JobPosition(db.Model):
	__tablename___ = 'job_positions'
	
	position_id = db.column(db.Integer, primary_key=True, autoicrement=True)
	title = db.Column(db.String(100), nullable=False)
	description = db.Column(db.Text)
	level = db.Column(db.String(50))
	
	# Relationship to employees
	employees = db.relationship('Employee', backref='position', lazy=True) 
	
	def __repr___(self):
		return f"<JobPosition {self.title}-Level: {self.level}>"
		
		