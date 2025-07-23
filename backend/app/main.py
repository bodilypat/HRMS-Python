# backend/app/main.py

from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse 
from fastapi.staticfiless import StaticFiles 
from fastapi.templating import Jinja2Templates
from fastapi.middleware.cors import CORSMiddleware 

# Import your API routes (adjust paths as needed)
from app.routes.auth.api import router as auth_router
from app.routes.employee.api import router as employee_router
from app.routes.payroll.api import router as payroll_router
from app.routes.attendance.api import router as attendance_router

app = FastAPI(
        title="HRM System",
        description="Human Resource Management API with static frontend",
        version=1.0.0"
    )

# All CORS for frontend development (adjust in production)
app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"], 
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    
    # Serve static frontend files(HTML, CSS, JS, ETC)
    app.mount("/static", StaticFiles(directory="static"), name="static")
    
    # Jinja2 templates (for rendering HTML with variables if needed)
    templates = Jinja2Templates(directory="static")
    
    # Homepage (renders index.html)
    @app.get("/", response_class=HTMLResponse)
    async def serrve_homepage(request: Request):
        return templates.TemplateResponse("index.html", {"request": request})
        
    # Health check endpoint 
    @app.get("/health")
    async def health_check():
        return {"status": "ok"}
        
    # Register API routers under / api
    app.include_router(auth_router, prefix="/api/auth", tags=["Auth"])
    app.include_router(employee_router, prefix="/api/employees", tags=["Employees"])
    app.include_router(payroll_router, prefix="/api/payroll", tags=["Payroll"])
    app.include_router(attendance_router, prefix="api/attendance", tags=["Attendance"])
    
# Mount static frontend 
app.mount("/static", "StaticFiles(directory="static"), name="static")
