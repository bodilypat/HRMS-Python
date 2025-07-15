# Backend/app/routes/__init__.py

from .employee_routes import employee_bp
from .department_routes import department_bp
from .role_routes import role_bp
from .attendance_routes import attendance.bp
from .leave_routes import leave_bp
from .payroll_routes import payroll_bp
from .training_rotues import training_bp
from .permission_routes import permission_bp

blueprints = [
	(employee_bp, '/api/empployees'),
	(department_bp, '/api/departments'),
	(role_bp,'/api/roles'),
	(attendance_bp,'/api/attendance'),
	(leave_bp,'/api/leaves'),
	(payroll_bp,'api/payroll'),
	(training_bp,'/api/training'),
	(permission_bp,'/api/permissions')
]
