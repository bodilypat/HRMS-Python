Full-Stack-HRMS-Directory-Structure
│
├── backend/                                 
│   ├── app/                                    	                      	
│   │   ├── main.py                           	                  # Entry point (FastAPI app setup)
│   │ 	├── api/                                                  # API endpoints
│   │   │   ├── routes/    
│   │   │   │   ├── auth_routes.py                                # Login / Register / Logout
│   │   │   │   ├── employee_routes.py                            # Endpoint CRUD for employees      
│   │   │   │   ├── department_routes.py                          # Endpoint CRUD for departments
│   │   │   │   ├── attendance_routes.py                          # Endpoint Attendance tracking APIs
│   │   │ 	│   └── payroll_routes.py                             # Endpoint Salary and payroll operation               
│   │   │ 	└── __init__.py    
│   │   │ 
│   │   ├── services/                                             # Business Logic 
│   │   │   ├── auth_service.py
│   │   │   ├── employee_service.py
│   │   │   ├── department_service.py
│   │   │   ├── attendance_service.py
│   │  	│   └──payroll_service.py
│   │   │	
│   │   ├── models/                                               # SQLAlchemy models
│   │   │   ├── user_model.py
│   │   │   ├── employee_model.py
│   │   │   ├── department_model.py
│   │   │   ├── attendance_model.py
│   │  	│   └── payroll_model.py   
│   │  	│                        	
│   │   ├── schemas/                                              # Pydantic models (request/response)
│   │   │   ├── auth_schema.py
│   │   │   ├── employee_schema.py
│   │   │   ├── department_schema.py
│   │   │   ├── attendance_schema.py
│   │  	│   └── payroll_schema.py          
│   │  	│                	
│   │   ├── core/
│   │   │   ├── database.py        
│   │   │   ├── config.py              	
│   │   │   ├── security.py
│   │   │   └── utils.py      
│   │   │                 
│   │   └── __init__.py
│   │ 
├── frontend/ 
│   ├── public/  
│   │   ├── index.html
│   │   ├── login.html      
│   │   ├── register.hml 
│   │	├── components/  
│   │	│   ├── header.html
│   │	│   ├── footer.html
│   │	│   └── sidebar.html
│   │	│ 
│   │   ├── favicon.ico   
│   │   ├── manifest.json 
│   │   └── robots.txt
│   │   
│   ├── asset/
│   │   ├── images/
│   │   ├── icons/
│   │   ├── fonts/
│   │   └── uploads/
│   ├── style/
│   │   ├── base/
│   │	│	├── layout.css  
│   │	│   ├── form.css
│   │	│   ├── themes.css
│   │	│   └── variables.css
│   │   │
│   │   ├── components/
│   │	│	├── card.css  
│   │	│   ├── navbar.css
│   │	│   ├── sidebar.css
│   │   │   └── table.css
│   │	│ 
│   │   ├── pages/
│   │	│	├── dashboard.css  
│   │	│   ├── employee.css
│   │	│   ├── payroll.css
│   │   │   └── attendance.css
│   │   └── main.css
│   │ 
│   ├── src/
│   │   ├── models/                                            # Data schema / business logic representation
│   │	│	├── auth.js                                        # User / Login / register
│   │	│   ├── employee.js                                    # Employee info model
│   │	│	├── department.js                                  # Department data model
│   │	│   ├── payroll.js                                     # Payroll and salary structure
│   │	│   └── attendance.js                                  # Attendance and leave
│   │	│ 
│   │   ├── views/                                             # UI reading and Event handling
│   │	│	├── authView.js                                    # Login/register screens
│   │	│   ├── employeeView.js                                # Employee management table + form
│   │	│   ├── departmentView.js                              # Management department(Option)
│   │	│   ├── payrollView.js                                 # Payroll view - salary slips, updates
│   │	│   ├── attendanceView.js                              # Attendance/Leave display
│   │	│   └── dashboardView.js                               # Dashboard summary view
│   │	│ 
│   │   ├── controllers/                                       # Application logic / event coordination , Mediates between views and services (main logic)
│   │	│	├── authController.js                              # Handles Login/Logout/register Logic
│   │	│   ├── employeeController.js                          # Controls employee CRUD
│   │	│   ├── departmentController.js                        # Controls department operations
│   │	│   ├── payrollController.js                           # Controls payroll and salary processing
│   │	│   ├── attendanceController.js                        # Controls attendance logic
│   │   │   └── domUtils.js                                    # Reusable DOM helper functions ( Loaders, Models, etc.)
│   │   │
│   │   ├── services/                                          # API calls and backend communication/ Handles API and Data access
│   │	│   ├── apiService.js                                  # Base API configuration (fetch wrapper, headers)
│   │	│   ├── authService.js                                 # Auth-related API calls
│   │	│   ├── employeeService.js                             # Employee CRUD API
│   │	│   ├── departmentService.js                           # Department data API
│   │	│   ├── payrollService.js                              # Payroll CRUD and reports API
│   │   │   └── attendanceService.js                           # Attendance/Leave API Calls
│   │   ├── utils/
│   │	│   ├── formatDate.js                                  # Utility and helper functions
│   │	│   ├── validation.js                                  # Input validation helpers
│   │	│   ├── constants.js                                   # Shared constants (API endpoint, roles)
│   │   │   └── storage.js                                     # Local/session storage helpers (token, cache)
│   │   └── main.js                                            # Application entry point / bootstrapping
│   │   
│   └── data/                     
│       ├── employees.json
│       ├── payroll.json
│       ├── departtment.json
│       └── attendance.json
├── static/                                     # Linked from backend for FastAPI
│   └── (symlink or copy of frontend/public)           
├── .gitignore 
└── README.md


full stack flow :
UI (Button click)
   ↓
payrollView.bindRefresh()
   ↓
payrollController.loadPayrolls()
   ↓
payrollService.getPayrolls()
   ↓
apiService.get('/payrolls')
   ↓
FastAPI backend (GET /api/payrolls)
   ↓
Response JSON → apiService.handleResponse()
   ↓
payrollView.renderPayrollTable()


architecture Flow : 
[UI] Refresh button → attendanceView.bindRefresh()
   ↓
[Controller] attendanceController.loadAttendance()
   ↓
[Service] attendanceService.getAll()
   ↓
[API] apiService.get('/attendance')
   ↓
[Backend] FastAPI → returns JSON list
   ↓
[Model] Attendance.fromApi() → model objects
   ↓
[View] attendanceView.renderAttendanceTable()
