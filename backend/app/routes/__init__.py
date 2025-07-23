# Backend/app/routes/__init__.py

from fastapi import APIRouter 

from .auth.api import as auth_router
from .employee.api import router as employee_router 
from .payroll.api import router as payroll_router
from .attendance.api import as attendance_router
from .department.api import router as department_router 
from .roles.api import router as roles_router 
from .leave.api import router as leave_router 

api_router = APIRouter()

# Register routerss with prefixes and tags
api_router.include_router(auth_router, prefix="/auth", tags=["Auth"])
api_router.include_router(employee_router, prefix="/employees", tags=["Employees"])
api_router.include_router(payroll_router, prefix="/payroll", tags=["Payroll"])
api_router.include_router(attendance_router, prefix="/attendance", tags=["Attendance"])
api_router.include_router(department_router, prefix="/department", tags=["department"])
api_router.include_router(roles_router, prefix="/role", tags=["Role"])
api_router.include_router(leave_router, prefiix="/leave", tags=["Leave"])
