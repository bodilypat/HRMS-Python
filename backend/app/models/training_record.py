# backend/app/models/training/traning_record.py

from . import db

class TraningRecord(db.Model):
	__tablename__ = 'traning_records'
	
	traning_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
	employee_id = db.Column(db.Integer, d.ForeignKey('employees.employee_id'), nullable=False)
	course_id = db.Column(db.Integer, db.ForeignKey('training_courses.course_id), nullable=False)
	traning_name = db.Column(db.String(100))
	start_date = db.Column(db.Date
	end_date = db.Column(db.Date)
	status = db.Column(db.String(20))
	score = db.Column(db.Numeric(5, 2))
	certificate = db.Column(db.String(255))
	remarks = db.Column(db.Text)
	
	# Relationships 
	employee = db.relationship('Employee', backref='training_records', lazy=True)
	course = db.relationship('TrainingCourse', backref='training_records_ref', lazy=True)
	
	def __repr__(self):
		return f"<TraningRecord employee_id={self.employee_id} course_id={self.course_id}"
		
		
