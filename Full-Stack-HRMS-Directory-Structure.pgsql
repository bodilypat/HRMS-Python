Full-Stack-HRMS-Directory-Structure
│
├── backend/                                 
│   ├── app/                                    # Main Application  
│   │   ├── __init.py                           # App factory function
│   │   ├── config.py                           # Configuration settings(Dev, Prod, Test)
│   │   │
│   │   ├── models/                             # SQLALchemy ORM models
│   │   │   ├── __init__.py
│   │   │   ├── base_models.py
│   │   │   ├── core/
│   │   │   │   ├── employee.py
│   │   │   │   ├── department.py
│   │   │   │   └── job_position.py
│   │   │   ├── attendance/
│   │   │   │   ├── attendance.py
│   │   │   │   └── leave_request.py
│   │   │   ├── payroll/
│   │   │   │   └── payroll.py
│   │   │   ├── auth/
│   │   │   │   ├── role.py
│   │   │   │   ├── user_role.py
│   │   │   │   ├── permission.py
│   │   │   │   └── role_permission.py
│   │   │   ├── training/
│   │   │   │   ├── training_course.py
│   │   │   │   └── training_record.py
│   │   │   │ 
│   │   ├── routes/                             # Route handler (Blueprint)
│   │   │   ├── __init__.py
│   │   │   ├── auth/
│   │   │   │   └── api.py
│   │   │   ├── employee/
│   │   │   │   └── api.py
│   │   │   ├── payroll/
│   │   │   │   └── api.py
│   │   │   ├── attendance/
│   │   │   │   └── api.py
│   │   │   ├── department/
│   │   │   │   └── api.py
│   │   │   ├── roles/
│   │   │   │   └── api.py
│   │   │   └── leave/ 
│   │   │       └── api.py 
│   │   │
│   │   ├── controllers/                        # Business logic layer
│   │   │   ├── __init__.py
│   │   │   ├── base_controller.py
│   │   │   ├── auth/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── auth_controller.py
│   │   │   │   ├── permission_controller.py
│   │   │   │   └── role_controller.py
│   │   │   ├── employee/
│   │   │   │   ├── __init__.py
│   │   │   │   └── employee_controller.py
│   │   │   ├── department/
│   │   │   │   ├── __init__.py
│   │   │   │   └── department_controller.py
│   │   │   ├── payroll/
│   │   │   │   ├── __init__.py
│   │   │   │   └── payroll_controller.py
│   │   │   ├── attendance/
│   │   │   │   ├── __init__.py
│   │   │   │   └── attendance_controller.py
│   │   │   ├── roles/
│   │   │   │   ├── __init__.py
│   │   │   │   └── role_controller.py
│   │   │   ├── leave/
│   │   │   │   ├── __init__.py
│   │   │   │   └── leave_controller.py
│   │   │   ├── training/
│   │   │   │   ├── __init__.py
│   │   │   │   └── training_controller.py
│   │   │   │
│   │   │	├── services/                           # Utilities / helpers / external services
│   │   │   │	├── __init__.py
│   │   │   │	├── send_email.py
│   │   │  	│	├── authenticate_user.py
│   │   │   │	├── generate_token.py
│   │   │   │	├── verify_token.py
│   │   │   │	└── generate_pdf.py  
│   │   │   │
│   │   │	├── schemas/                            # Pydantic schemas
│   │   │   │	├── __init__.py
│   │   │   │	├── employee_schema.py
│   │   │   │	├── payroll_schema.py
│   │   │   │	└── auth_schema.py 
│   │   │ 	│
│   │   │	├── middleware/                        
│   │   │	│   ├── __init__.py
│   │   │	│   ├── auth_middleware.py
│   │   │	│   ├── logging_middleware.py
│   │   │	│   ├── exception_middleware.py
│   │  	│	│   └── rate_limit_middleware.py  
│   │   │	│
│   │   │	├── auth/                               # Authentication logic
│   │   │	│   ├── __init__.py
│   │   │	│   ├── jwt_handler.py
│   │  	│	│   └── user_loader.py  
│   │   │	│
│   │   │	├── templates/                          
│   │   │	└── static/                             # Static files (CSS, JS, image
│   │   │
│   ├── migrations/                             # Alemlic or Flask-Migrate migration files                                      
│   │
│   ├── tests/                                  # Unit and integration tests
│   │   ├── __init__.py
│   │   ├── test_employee.py                         
│   │   ├── test_auth.py                                       
│   │   └── test_payroll.py  
│   │
│   ├── database/                                    
│   │   └── hrm_schemal.sql                     # SQL schema file
│   │ 
│   ├── run.py                                  # Entry point to start app 
│   ├── requirements.txt                         
│   ├── .env                                                             
│   ├── .flaskenv                            
│   ├── .gitinore
│   └── README.md
│
├── frontend/            
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   ├── employee.html
│   ├── payroll.html
│   ├── attendance.html
│   ├── assets/  
│   │   ├── images/
│   │   ├── icons/
│   │   └── fonts/
│   │   
│   ├── css/
│   │   ├── main.css/
│   │   ├── layout.css
│   │   ├── form.css
│   │   ├── components/
│   │   │   └── card.css
│   │   └── themes.css
│   ├── js/
│   │   ├── main.js
│   │   ├── api.js
│   │   ├── auth.js
│   │   ├── employee.js
│   │   ├── payroll.js
│   │   ├── attendance.js
│   │   └── utils/
│   │       └── domUtils.js
│   ├── components/
│   │   ├── header.html
│   │   ├── sidebar.html
│   │   └── footer.html
│   │   
│   └── data/                     
│       ├── employees.json
│       └── payroll.json
├── favicon.ico           
├── .gitignore 
└── README.md
