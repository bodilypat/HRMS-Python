# backend/app/models/training/training_record.py

from app import db 

class TrainingRecord(db.Model):
    """Stores training partcipation and performance data for employees."""
    
    __tablename__ = 'training_records'
    
    training_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    employee_id = db.Column(db.Integer, db.ForeignKey('employees.employee_id'), nullable=False)
    course_id = db.Column(db.Integer, db.ForeignKey('training_course.course_id'), nullable=False)
    
    training_name = db.Column(db.String(100))
    start_date = db.Column(db.Date)
    end_date = db.Column(db.Date)
    status = db.Column(db.String(20))
    score = db.Column(db.Numeric(5, 2))
    certificate = db.Column(db.String(255))
    remarks = db.Column(db.Text)
    
    # Relationships
    employee = db.relationship('Employee', backref=db.backref('training_records', lazy=True))
    course = db.relationship('TrainingCourse', backref=db.backref('training_record_ref', lazy=True))
    
    def __repr__(self):
        return f"<TrainingRecord employee_id={self.employee_id}, course_id={self.course_id}>"
