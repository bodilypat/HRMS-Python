# Backend/app/routes/__init__.py

from app.routes.auth.routes import auth_bp
from app.routes.employee.routes import employee_bp
from app.routes.payroll.routes import payroll_bp
from app.routes.attendance.routes import attendance_bp
from app.routes.department.routes import department_bp
from app.routes.roles.routes import role_bp
from app.routes.leave_routes import leave_bp

blueprints = [
    (auth_bp,'/api/auth')
	(employee_bp, '/api/employees'),
	(payroll_bp, '/api/payroll'),
	(attendance_bp,'/api/attendance'),
	(department_bp,'/api/departments'),
	(role_bp,'/api/roles'),
	(leave_bp,'/api/leaves'),	
]

def register_blueprints(app):
    for blueprint, prefix in blueprints:
        app.register_blueprint(blueprint, url_prefix=prefix)
        
