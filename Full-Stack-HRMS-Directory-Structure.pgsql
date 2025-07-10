Full-Stack-HRMS-Directory-Structure(Django)
│
├── backend/                                 
│   ├── hrms_project/                             
│   │   ├── __init.py
│   │   ├── setting.py
│   │   ├── urls.py
│   │   ├── asgi.py
│   │   └── wsgi.py
│   │
│   ├── authenticateion/                             
│   │   ├── model.py                         
│   │   ├── view.py                    
│   │   ├── url.py                     
│   │   ├── forms.py       
│   │   └── admin.py                       
│   │
│   ├── employees/                             
│   │   ├── model.py                         
│   │   ├── view.py                    
│   │   ├── url.py                      
│   │   └── admin.py  
│   │
│   ├── attendance/                             
│   │   ├── model.py                         
│   │   ├── view.py                    
│   │   ├── url.py                        
│   │   └── admin.py  
│   │ 
│   ├── payroll/                             
│   │   ├── model.py                         
│   │   ├── view.py                    
│   │   ├── url.py                          
│   │   └── admin.py  
│   │    
│   ├── performance/                             
│   │   ├── model.py                         
│   │   ├── view.py                                             
│   │   └── urls.py  
│   │                
│   ├── templates/                             
│   │   ├── base.html                         
│   │   ├── dashboard.html                                          
│   │   └── employees/  
│   │       └── employee_list.html
│   │ 
│   ├── static/                            
│   │   ├── css/
│   │   │   └── styles.css
│   │   ├── js/
│   │   │   └── main.js
│   │   └── images/
│   │       └── logo.png
│   │
│   ├── media/
│   ├── manage.py
│   └── requirements.txt 
│
├── frontend/            
│   ├── index.html
│   ├── css/  
│   │   └── styles.css
│   ├── js/
│   │   └── app.js
│   └── components/                     
│       ├── employeeTable.js
│       └── modal.js
├── .env            
├── docs  
└── README.md
