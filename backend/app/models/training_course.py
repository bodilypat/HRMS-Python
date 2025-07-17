# backend/app/models/training/training_course.py

from . import db

class TrainingCourse(db.Model):
	__tablename__ = 'training_courses'
	
	course_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
	course_name = db.Column(db.String(100), nullable=False)
	description = db.Column(db.Text)
	duration_hour = db.Column(db.Integer)
	required = db.Column(db.Boolean, default=False)
	
	# Relationship 
	trainning_records = db.relationship('TrainingRecord', backref='course', lazy=Ture)
	
	def __repr__(self):
		return f"<TrainingCourse {self.course_name}>"
