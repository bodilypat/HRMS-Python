# backend/app/models/training/training_course.py

from app import db 

class TrainingCourse(db.Model):
    """Represents a traing course that employees can attend."""
    
    __tablename__ = 'training_courses'
    
    course_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    course_name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    duration_hour = db.Column(db.Integer) 
    required = db.Column(db.Boolean, default=False) 
    
    # Relationships
    training_records = db.relationship('TrainingRecord', backref='course', lazy=True)
    
    def __repr__(self):
        return f"<TrainingCourse course_name='self.course_name}'>"
        
        