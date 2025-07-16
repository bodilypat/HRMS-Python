# Backend/app/models/__init__.py

from .core.employee import Employee
from .core.department import Department 
from .core.job_position import JobPosition

from .attendance.attendance import Attendance 
from .attendance.leave_request import LeaveRequest

from .payroll.payroll import Payroll

from .auth.role import Role 
from .auth.user_role import UserRole 
from .auth.permission import Permission 
from .auth.role_permission import RolePermission 

from .training.training_course import TrainingCourse 
from .training.training_record import TrainingRecord 

