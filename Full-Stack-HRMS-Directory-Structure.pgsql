Full-Stack-HRMS-Directory-Structure
│
├── backend/                                 
│   ├── app/                                    	
│   │   ├── console/                         	
│   │   ├── Exceptions/                           	
│   │ 	├── endpoints/ 
│   │   │   ├── controllers/    
│   │   │   │   ├── AuthController.py                                # Login / Register / Logout
│   │   │   │   ├── EmployeeController.py                            # CRUD for employees      
│   │   │   │   ├── DepartmentController.py                          # CRUD for departments
│   │   │   │   ├── AttendanceController.py                          # Attendance tracking APIs
│   │   │   │   ├── LeaveController.py                               # Leave requests and approvals
│   │   │ 	│   └── PayrollController.py                             # Salary and payroll operation
│   │   │   ├── middleware/  
│   │   │   │   ├── AuthMiddleware.py    
│   │   │   │   ├── RoleMiddleware.py       
│   │   │ 	│   └── LoggingMiddleware.py                        
│   │   │ 	└── requests/     
│   │   │       ├── StoreEmployeeRequest.py
│   │   │       ├── UpdateEmployeeRequest.py
│   │   │       ├── StorePayrollRequest.py
│   │   │ 	    └── UpdatePayrollRequest.py            	
│   │   ├── models/                        
│   │   │   ├── User.py
│   │   │   ├── Employee.py
│   │   │   ├── Department.py
│   │   │   ├── Attendance.py
│   │   │   ├── Leave.py
│   │  	│   └── Payroll.py
│   │   │	
│   │   ├── Policies/  
│   │   │   ├── EmployeePolicy.py
│   │   │   ├── LeavePolicy.py
│   │  	│   └── PayrollPolicy.py                           	
│   │   ├── config/    
│   │   │   ├── database.py
│   │   │   ├── auth.py
│   │   │   ├── setting.py
│   │  	│   └── mail.py                         	
│   │   ├── database/
│   │   │   ├── factories/                     	
│   │   │   ├── migration/
│   │   │   └── seeders/
│   │   │
│   │   ├── routes/                            	
│   │   │   ├── api.php
│   │   │   └── web.php
│   │   │
│   │   ├── resource/                        			
│   │   │   └── views/ 
│   │   │   
│   │   ├── storage/                        
│   │   ├── tests/                          
│   │   └── composer.json
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
│   │   ├── models/                                            # Data Models mapping to backend entities
│   │	│	├── auth.js                                        # User / Login / register
│   │	│   ├── employee.js                                    # Employee info model
│   │	│	├── department.js                                  # Department data model
│   │	│   ├── payroll.js                                     # Payroll and salary structure
│   │	│   └── attendance.js                                  # Attendance and leave
│   │	│ 
│   │   ├── views/                                             # Responsible for renering UI & user interaction
│   │	│	├── authView.js                                    # Login/register screens
│   │	│   ├── employeeView.js                                # Employee management table + form
│   │	│   ├── departmentView.js                              # Management department(Option)
│   │	│   ├── payrollView.js                                 # Payroll view - salary slips, updates
│   │	│   ├── attendanceView.js                              # Attendance/Leave display
│   │	│   └── dashboardView.js                               # Dashboard summary view
│   │	│ 
│   │   ├── controllers/                                       # Controllers - coordinate View & Services
│   │	│	├── authController.js                              # Handles Login/Logout/register Logic
│   │	│   ├── employeeController.js                          # Controls employee CRUD
│   │	│   ├── departmentController.js                        # Controls department operations
│   │	│   ├── payrollController.js                           # Controls payroll and salary processing
│   │	│   ├── attendanceController.js                        # Controls attendance logic
│   │   │   └── domUtils.js                                    # Reusable DOM helper functions ( Loaders, Models, etc.)
│   │   │
│   │   ├── services/                                          # Service - handle API calls and data communication
│   │	│   ├── apiService.js                                  # Base API configuration (fetch wrapper, headers)
│   │	│   ├── authService.js                                 # Auth-related API calls
│   │	│   ├── employeeService.js                             # Employee CRUD API
│   │	│   ├── departmentService.js                           # Department data API
│   │	│   ├── payrollService.js                              # Payroll CRUD and reports API
│   │   │   └── attendanceService.js                           # Attendance/Leave API Calls
│   │   ├── utils/
│   │	│   ├── formatDate.js                                  # Date formatting 
│   │	│   ├── validation.js                                  # Input validation helpers
│   │	│   ├── constants.js                                   # Shared constants (API endpoint, roles)
│   │   │   └── storage.js                                     # Local/session storage helpers (token, cache)
│   │   └── main.js
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

Core HR Entities departments, employees, job_position, attendance, leave_request, payroll 
Training and Development training_course, training_records
User Management & Security users, roles, permission, permission_roles, login_attempts 

Data Flow 
	user click "View Payroll" -> 
		payrollController.js handles click -> 
			payrollService fetchs from FastAPI /api/payroll -> 
				payroll.js model formats the data ->
					payrollView.js render to DOM using tamplate in/public/components/card.html ->
						styled by /styles/pages/payroll.css
						
	