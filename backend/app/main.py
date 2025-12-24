#app/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.session import Base, engine 
from app.api.routes import auth, employees, attendance, leave, payroll, recruitment, reports 

#--------------------------------------------
# Create all database tables
#--------------------------------------------
Base.metadata.create_all(bind=engine)

#--------------------------------------------
# Initialize FastAPI 
#--------------------------------------------
app = FastAPI(
    title="HR Management System API",
    description="API for managing HR operations including employee management, attendance tracking, leave management, payroll processing, recruitment, and reporting.",
    version="1.0.0",
)

#--------------------------------------------
# CORS Settings
#--------------------------------------------
origins = [
    "http://localhost",
    "http://localhost:8000",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
#--------------------------------------------
# Include API Routers
#--------------------------------------------
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(employees.router, prefix="/api/employees", tags=["Employees"])
app.include_router(attendance.router, prefix="/api/attendance", tags=["Attendance"])
app.include_router(leave.router, prefix="/api/leave", tags=["Leave Management"])
app.include_router(payroll.router, prefix="/api/payroll", tags=["Payroll"])
app.include_router(recruitment.router, prefix="/api/recruitment", tags=["Recruitment"])
app.include_router(reports.router, prefix="/api/reports", tags=["Reports"])

#--------------------------------------------
# Root Endpoint
#--------------------------------------------
@app.get("/")
def read_root():
    return {"message": "Welcome to the HR Management System API"}

