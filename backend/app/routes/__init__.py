# Backend/app/routes/__init__.py

def register_blueprints(app):
    """Register all API blueprints with their URL prefixes."""
    
    from app.routes.auth.api import auth_bp
    from app.routes.employee.api import employee_bp
    from app.routes.payroll.api import payroll_bp
    from app.routes.attendance.api import attendance_bp
    from app.routes.department.api import department_bp
    from app.routes.roles.api import role_bp
    from app.routes.leave.api import leave_bp 
    
    # Register each blueprint with a consistent API prefix 
    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(employee_bp, url_prefix="/api/employees")
    app.register_blueprint(payroll_bp, url_prefix="/api/payroll")
    app.register_blueprint(attendance_bp, url_prefix="/api/attendance")
    app.register_blueprint(department_bp, url_prefix="/api/departments")
    app.register_blueprint(role_bp, url_prefix="/api/roles")
    app.register_blueprint(leave_bp, url_prefix="/api/leave")
    