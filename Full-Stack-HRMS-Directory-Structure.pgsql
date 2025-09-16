Full-Stack-HRMS-Directory-Structure
│
├── backend/                                 
│   ├── app/                                    	# Main Application  
│   │   ├── __init.py                           	# App factory function
│   │   ├── config.py                           	# Configuration settings(Dev, Prod, Test)
│   │   ├── main.py
│   │ 	├── database/ 
│   │   │   ├── session.py                                        
│   │   │ 	└── schemal.sql                     	# SQL schema file
│   │   ├── middleware/                        
│   │   │   ├── __init__.py
│   │   │   ├── base.py
│   │   │   ├── auth.py
│   │   │   ├── logging.py
│   │   │   ├── exception.py
│   │  	│   └── rate_limit.py  
│   │   │	
│   │   ├── auth/                               	# Authentication logic
│   │   │   ├── __init__.py
│   │   │   ├── jwt_handler__.py
│   │   │   ├── oauth2_scheme.py
│   │   │   ├── user_loader.py
│   │   │   ├── exceptions.py
│   │  	│   └── utils.py  
│   │   ├── models/                             	# SQLALchemy ORM models(data layer)
│   │   │   ├── __init__.py                     	# Import all model for easy access
│   │   │   ├── base_models.py                  	# Declaration base & mixins
│   │   │   ├── core/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── employee.py
│   │   │   │   ├── department.py
│   │   │   │   └── job_position.py
│   │   │   ├── attendance/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── attendance.py
│   │   │   │   └── leave_request.py
│   │   │   ├── payroll/
│   │   │   │   ├── __init__.py	
│   │   │   │   └── payroll.py
│   │   │   ├── auth/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── role.py
│   │   │   │   ├── user_role.py
│   │   │   │   ├── permission.py
│   │   │   │   └── role_permission.py
│   │   │   └── training/
│   │   │       ├── __init__.py
│   │   │       ├── training_course.py
│   │   │       └── training_record.py
│   │   │
│   │   ├── schemas/                            	# Pydantic schemas
│   │   │   ├── __init__.py
│   │   │   ├── core/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── employee.py
│   │   │   │   ├── department.py
│   │   │   │   └── job_position.py
│   │   │   ├── attendance/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── attendance.py
│   │   │   │   └── leave_request.py
│   │   │   ├── payroll/
│   │   │   │   ├── __init__.py	
│   │   │   │   └── payroll.py
│   │   │   ├── auth/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── role.py
│   │   │   │   ├── user_role.py
│   │   │   │   ├── permission.py
│   │   │   │   └── role_permission.py
│   │   │   └── training/
│   │   │       ├── __init__.py
│   │   │       ├── training_course.py
│   │   │       └── training_record.py
│   │   │
│   │   ├── api/                        			# FastAPI router
│   │   │   ├── __init__.py
│   │   │   ├── core/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── employee_routes.py
│   │   │   │   ├── department_routes.py
│   │   │   │   └── job_position_routes.py
│   │   │   ├── attendance/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── attendance_routes.py
│   │   │   │   └── leave_request_routes.py
│   │   │   ├── payroll/
│   │   │   │   ├── __init__.py	
│   │   │   │   └── payroll_routes.py
│   │   │   ├── auth/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── role_routes.py
│   │   │   │   ├── user_role_routes.py
│   │   │   │   ├── permission_routes.py
│   │   │   │   └── role_permission_routes.py
│   │   │   └── training/ 
│   │   │       ├── __init__.py
│   │   │       ├── training_course_routes.py
│   │   │       └── training_record_routes.py
│   │   │   
│   │   ├── services/                        # Business logic layer
│   │   │   ├── __init__.py
│   │   │   ├── core/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── employee/
│   │   │   │   │   └── service.py
│   │   │   │   ├── department/
│   │   │   │   │   └── service.py
│   │   │   │   └── job_position/
│   │   │   │       └── service.py
│   │   │   ├── attendance/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── attendance/
│   │   │   │   │   └── service.py
│   │   │   │   └── leave_request/
│   │   │   │       └── service.py
│   │   │   ├── payroll/
│   │   │   │   ├── __init__.py	
│   │   │   │   └── payroll
│   │   │   │       └── service.py
│   │   │   ├── auth/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── role/
│   │   │   │   │   └── service.py
│   │   │   │   ├── user_role/
│   │   │   │   │   └── service.py
│   │   │   │   ├── permission/
│   │   │   │   │   └── service.py
│   │   │   │   └── role_permission/
│   │   │   │       └── service.py
│   │   │   └── training/ 
│   │   │       ├── __init__.py
│   │   │       ├── training_course/
│   │   │       │   └── service.py
│   │   │       └── training_record
│   │   │           └── service.py
│   │   │	
│   │   ├── templates/                          
│   │   └── static/                             # Static files (CSS, JS, image
│   │   
│   ├── migrations/                             # Alemlic or Flask-Migrate migration files                                      
│   │
│   ├── tests/                                  # Unit and integration tests
│   │   ├── __init__.py
│   │   ├── test_employee.py                         
│   │   ├── test_auth.py                                       
│   │   └── test_payroll.py  
│   │
│   │ 
│   ├── run.py                                  # Entry point to start app 
│   ├── requirements.txt                         
│   ├── .env                                                             
│   ├── .flaskenv                            
│   ├── .gitinore
│   └── README.md
│
├── frontend/ 
│   ├── public/  
│   │   ├── index.html
│   │   ├── login.html      
│   │   ├── register.hml 
│   │	├── components/  
│   │	│   ├── header.html
│   │	│   ├── footer.html
│   │	│   └── sidebar.html
│   │   └── favicon.ico
│   │   
│   ├── asset/
│   │   ├── images/
│   │   ├── icons/
│   │   └── fonts/
│   ├── style/
│   │   ├── base/
│   │	│	├── layout.css  
│   │	│   ├── form.css
│   │	│   ├── themes.css
│   │	│   └── variables.css
│   │   │
│   │   ├── components/
│   │   │   └── card.css
│   │   └── main.css
│   │ 
│   ├── scripts/
│   │   ├── api/
│   │	│	├── auth.api.js
│   │	│   ├── employee.api.js
│   │	│   └── payroll.api.js
│   │   ├── modules/
│   │	│	├── auth.js
│   │	│   ├── employee.js
│   │	│   ├── payroll.js
│   │	│   └── attendance.js
│   │   ├── utils/
│   │   │   └── domUtils.js
│   │   └── main.js
│   │   
│   └── data/                     
│       ├── employees.json
│       └── payroll.json
├── static/                                     # Linked from backend for FastAPI
│   └── (symlink or copy of frontend/public)           
├── .gitignore 
└── README.md
