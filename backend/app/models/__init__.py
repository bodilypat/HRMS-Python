# Backend/app/models/__init__.py

from flask_sqlalchemy import SQLAlchemy

# Initialize SQLALchemy 
db = SQLAlchemy()

# Import all model classes so they are registered 
from .employee import Employee
from .department import Department 
from .job_position import JobPosition
from .role import Role 
from .user_role import UserRole
from .attendance import Attendance 
from .leave_request import LeaveRequest 
from .payroll import Payroll
from .training_course import TrainingCourse
from .training_record import TrainingRecord 
from .permission import Permission
from .role_permission import RolePermission

# Optional List __all__for wildcard imports
__all__ = [
	"db",
	"Employee",
	"Department",
	"JobPosition",
	"Role",
	"UserRole",
	"Attendance",
	"LeaveRequest",
	"Payroll",
	"TrainingCourse",
	"TrainingRecord",
	"Permission",
	"RolePermission",
]

