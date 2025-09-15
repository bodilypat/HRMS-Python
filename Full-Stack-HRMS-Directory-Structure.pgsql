Full-Stack-HRMS-Directory-Structure
│
├── backend/                                 
│   ├── app/                                    # Main Application  
│   │   ├── __init.py                           # App factory function
│   │   ├── config.py                           # Configuration settings(Dev, Prod, Test)
│   │   ├── main.py
│   │   ├── models/                             # SQLALchemy ORM models(data layer)
│   │   │   ├── __init__.py                     # Import all model for easy access
│   │   │   ├── base_models.py                  # Declaration base & mixins
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
│   │   ├── schemas/                            # Pydantic schemas
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
│   │   ├── api/                        # Business logic layer
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
│   │   ├── services/                           # Utilities / helpers / external services
│   │   │   ├── __init__.py
│   │   │   ├── send_email.py
│   │   │   ├── authenticate_user.py
│   │   │   ├── generate_token.py
│   │   │   ├── verify_token.py
│   │   │   └── generate_pdf.py  
│   │   │ 	
│   │   ├── middleware/                        
│   │   │   ├── __init__.py
│   │   │   ├── base_middleware.py
│   │   │   ├── auth_middleware.py
│   │   │   ├── logging_middleware.py
│   │   │   ├── exception_middleware.py
│   │  	│   └── rate_limit_middleware.py  
│   │   │	
│   │   ├── auth/                               # Authentication logic
│   │   │   ├── __init__.py
│   │   │   ├── jwt_handler__.py
│   │   │   ├── user_loader.py
│   │   │   ├── oauth2_scheme.py
│   │   │   ├── auth_exception.py
│   │  	│   └── auth_utils.py  
│   │   │	
│   │ 	├── database/                                    
│   │   │ 	└── hrm_schemal.sql                     # SQL schema file
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
