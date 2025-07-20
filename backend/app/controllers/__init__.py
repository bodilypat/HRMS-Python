# Backend/app/controllers/__init__.py

from .auth.auth_controller import AuthController 
from .employee.employee_controller import EmployeeController 
from .department.department_controller import DepartmentController 
from .payroll.payroll_controller import PayrollController 
from .attendance.attendance_controller import AttendanceController 
from .roles.role_controller import RoleController 
from .leave.leave_controller import LeaveController 
from .training.training_controller import TrainingController 

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
	
	
	
	