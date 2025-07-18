# Backend/app/controllers/__init__.py

from .employee.employee_controller import EmployeeController 
from .payroll.payroll_controller import PayrollController 
from .training.training_controller import TrainingController 
from .auth.auth_controller import AuthController 
from .attendance.attendance_controller import AttendanceController 
from .department.department_controller import DepartmentController 
from .roles.role_controller import RoleController 
from .leave.leave_controller import LeaveController 

__all__= [
		"EmployeeController",
		"PayrollController",
		"TrainingController",
		"AuthController",
		"AttendanceController",
		"DepartmentController",
		"RoleController",
		"LeaveController"
	]
	
