Full-Stack-HRMS-Directory-Structure
│
├── backend/                                 
│   ├── app/                                    # Main Application  
│   │   ├── __init.py                           # App factory function
│   │   ├── config.py                           # Configuration settings(Dev, Prod, Test)
│   │   │
│   │   ├── models/                             # SQLALchemy ORM models
│   │   │   ├── __init__.py
│   │   │   ├── employee.py
│   │   │   ├── department.py
│   │   │   ├── job_position.py
│   │   │   ├── attendance.py
│   │   │   ├── leave_request.js
│   │   │   ├── payroll.py
│   │   │   ├── role.py
│   │   │   ├── permission.py
│   │   │   └── training.py  
│   │   │
│   │   ├── routes/                             # API route handlers
│   │   │   ├── __init__.py
│   │   │   ├── auth_routes.py
│   │   │   ├── employee_route.py
│   │   │   ├── payroll_routes.py
│   │   │   └── attendance_routes.py  
│   │   │
│   │   ├── controllers/                        # Business logic layer
│   │   │   ├── __init__.py
│   │   │   ├── employee_controller.py
│   │   │   ├── payroll_controller.py
│   │   │   └── training_controller.py  
│   │   │
│   │   ├── services/                           # Utilities / helpers / external services
│   │   │ 	├── __init__.py
│   │   │ 	├── email_service.py
│   │   │ 	├── auth_service.py
│   │   │   └── pdf_generator.py  
│   │   │
│   │   ├── schemas/                            # Pydantic schemas (validation & serialization)
│   │   │ 	├── __init__.py
│   │   │ 	├── employee_schema.py
│   │   │ 	├── payroll_schema.py
│   │   │   └── auth_schema.py 
│   │   │ 
│   │   ├── middleware/                         # Customer middlewares
│   │   │ 	├── __init__.py
│   │   │   └── auth_middleware.py  
│   │   │
│   │   ├── auth/                               # Authentication logic
│   │   │ 	├── __init__.py
│   │   │ 	├── jwt_handler.py
│   │   │   └── user_loader.py  
│   │   │
│   │   ├── templates/
│   │   └── static/
│   │
│   ├── migrations/                                                                  
│   │
│   ├── tests/                             
│   │   ├── test_employee.py                         
│   │   ├── test_auth.py                                       
│   │   └── test_payroll.py  
│   │
│   ├── database/                                    
│   │   └── hrm_schemal.sql  
│   │ 
│   ├── run.py                             
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
