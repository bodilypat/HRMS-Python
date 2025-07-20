# Backend/app/controllers/__init__.py

# Authenticateion
from .auth.auth_controller import AuthController 

# HR-related
from .employee.employee_controller import EmployeeController 
from .department.department_controller import DepartmentController 
from .payroll.payroll_controller import PayrollController 

# Operations
from .attendance.attendance_controller import AttendanceController 
from .roles.role_controller import RoleController 
from .leave.leave_controller import LeaveController 
from .training.training_controller import TrainingController 

# Explicitly defining what gets exposed when importing this package
__all__= [
		"AuthController",
		"EmployeeController",
		"DepartmentController",
		"PayrollController",
		"AttendanceController",
		"RoleController",
		"LeaveController",
		"TrainingController"
	]
	
	
	
	