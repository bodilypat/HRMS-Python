Full-Stack-HRMS-Directory-Structure
│
backend/  # Python / Database: PostgreSQL, RESTfull APIs                          
├── app/                                    	
│   ├── main.py                        	                        	
│ 	├── core/ 
│   │   ├── config.py                    # Environment variables, secrets
│   │   ├── security.py                  # JWT, password hashing, token utilities 
│   │ 	└──   
│ 	├── database/ 
│   │   ├── session.py                   # SQLAlchemy session
│   │   ├── base.py                      # Base Metadata for models
│   │ 	└──                           	
│   ├── models/                          # SQLAlchemy ORM models
│   │   ├── user.py
│   │   ├── role.py
│   │   ├── employee.py                  # Employee DB model
│   │   ├── department.py                # Deparment table
│   │   ├── designation.py               # Designation table
│   │   ├── attendance.py                # Attendance table
│   │   ├── shift.py                     # Work shift timing
│   │   ├── leave_request.py             # Leave applications
│   │   ├── leave_type.py                # Sick, Casual, Paid 
│   │   ├── leave_balance.py             # Available leaves per employee     
│   │   ├── salary_structure.py          # Fixed salary components
│   │   ├── payroll.py                   # Monthly payroll
│   │   ├── payslip.py                   # Generated payslips        
│   │   ├── job.py                       # Job positions
│   │   ├── candidate.py                 # Applicant details
│   │   ├── interview.py                 # Interview rounds                                                              
│  	│   └── report_log.py
│   │	
│   ├── schemas/                         # Pydantic models for Request / Response schemas
│   │   ├── user.py
│   │   ├── auth.py
│   │   ├── employee.py
│   │   ├── department.py
│   │   ├── attendance.py               
│   │   ├── leave.py                   
│   │   ├── payroll.py                   
│   │   ├── recruitment.py
│  	│   └── reports.py                         	
│   ├── services/                        # Business logic per module
│   │   ├── auth_service.py             
│   │   ├── employee_service.py         
│   │   ├── attendance_service.py  
│   │   ├── leave_service.py  
│   │   ├── payroll_service.py           # Payroll logic
│  	│   └── recruitment_service.py
│   ├── api/                            	
│   │   ├── deps.py
│   │   └── routes/ 
│   │       ├── auth.py                 #api/routes/auth.py  @login endpoint
│   │       ├── employees.py
│   │       ├── attendance.py           # Attendance APIs
│   │       ├── leave.py                # Leave API
│   │       ├── payroll.py
│   │       ├── recruitment.py          # Recruitment APIs
│   │       └── reports.py                	
│   ├── middleware/                     # Middleware for RBAC, Loggic
│   │   ├── auth.py                	    # middleware/auth.py
│   │   ├── rbac.py                     # Role checks (HR/Admin)
│   │   └── 
│   │
│   ├── resource/                        			
│   │   └── views/ 
│   │   
│   ├── storage/                        
│   ├── tests/                          
│   └── composer.json
│ 
frontend/  # React / 
│ 
├── src/
│   ├── assets/
│   │   ├── images/
│   │   ├── icons/
│   │   └── fonts/
│   │
│   ├── components/ 
│   │   ├── common/
│   │	│   ├── Button.jsx
│   │	│   ├── Input.jsx
│   │	│   ├── Modal.jsx
│   │	│   └── Loader.jsx
│   │   └── layout/
│   │	    ├── Header.jsx
│   │	    ├── Sidebar.jsx
│   │	    └── Footer.jsx
│   │   
│   ├── pages/
│   │   ├── auth/
│   │	│   ├── Login.jsx                                # User login page
│   │	│   ├── Register.jsx                             # Registration page (optional for employees)
│   │	│   ├── ForgotPassword.jsx                       # Request password reset
│   │	│   ├── ResetPassword.jsx                        # Reset password via token
│   │	│   └── ChangePassword.jsx                       # Logged-in user password change
│   │   ├── dashboard/
│   │	│   ├── Dashboard.jsx                            # Main dashbord page
│   │	│   ├── DashboardCards.jsx                       # Summary cards
│   │	│   ├── AttendanceChart.jsx                      # Attendance visualization
│   │	│   ├── LeaveChart.jsx                           # Leave analytics
│   │   │   └── RecentActivities.jsx                     # Latest actions
│   │   ├── employee/
│   │	│   ├── EmployeeList.jsx                         # List & search employees
│   │	│   ├── EmployeeProfile.jsx                      # View employee details
│   │	│   ├── AddEmployee.jsx                          # Create new Employee
│   │	│   ├── EditEmployee.jsx                         # Update employee info
│   │   │   └── EmployeeDocuments.jsx                    # Upload / view documents
│   │   ├── attendance/
│   │	│   ├── AttendanceList.jsx                       # Daily / monthy attendance view
│   │	│   ├── MarkAttendance.jsx                       # Clock in / Clock out
│   │	│   ├── AttendanceReport.jsx                     # HR / Admin reports
│   │   │   └── AttendanceDetail.jsx                     # Individual employee attendance
│   │   ├── leave/
│   │	│   ├── ApplyLeave.jsx                           # Employee applies for leave
│   │	│   ├── LeaveList.jsx                            # Leave history (employee / HR)
│   │	│   ├── LeaveApproval.jsx                        # Approval / Reject leave
│   │	│   ├── LeaveBalance.jsx                         # Available leave count
│   │   │   └── LeaveDetails.jsx                         # Salary structure, allowance. deductions
│   │   ├── payroll/
│   │	│   ├── PayrollList.jsx                          # List of salary records
│   │	│   ├── GemeratePaysLip.jsx                      # Create monthy payslip
│   │	│   ├── PayrollDetails.jsx                       # View paylist details
│   │   │   └── PayrollSettings.jsx                      # Salary structure, allowance. deductions
│   │   ├── recruitment/
│   │	│   ├── JobList.jsx                              # List of job openings
│   │	│   ├── JobDetial.jsx                            # View job details
│   │	│   ├── AddJob.jsx                               # Create new job posting
│   │	│   ├── EditJob.jsx                              # Update job posting
│   │	│   ├── CandidateList.jsx                        # List of applications
│   │	│   ├── CandidateDetails.jsx                     # View candidate profile
│   │   │   └── ApplicationStatus.jsx                    # Approve / Reject candidate
│   │   └── report/
│   │	    ├── AttendanceReport.jsx                     # Attendance analytics 
│   │	    ├── LeaveReport.jsx                          # Leave summary and trends
│   │	    ├── PayrollReport.jsx                        # Payroll summary & payslips
│   │	    ├── EmployeeReport.jsx                       # Employee statistics
│   │	    └── RecruitmentReport.jsx                    # Hiring & recruitment metrics
│   │ 
│   ├── services/
│   │   ├── api.js                                       # axios / fetch configuration, interceptors
│   │   ├── authService.js                               # login, register, logout, password reset
│   │   ├── employeeService.js                           # Employee CRUD & profile APIs
│   │   ├── leaveService.js                              # Leave apply, leave list, approval APIs
│   │   ├── attendanceService.js                         # Clock in/out, attendance list APIs
│   │   ├── payrollService.js                            # Payroll generation, payslip, setting
│   │   ├── recruitmentService.js                        # Job Posting , candidate applications
│   │   ├── reportServices                               # Attendance, leave, payroll, employee reports
│   │   └── dashboardService.js                          # Dashboard stats & recent ctivities
│   ├── hooks/
│   │   └── useAuth.js                                   # authenticate logic
│   ├── context/
│   │   └── AuthContext.jsx                              # user session , token
│   ├── routes/
│   │   └── AppRoutes.jsx                                # all React Router routes
│   └── utils/                     
│       ├── constants.js                                 # app - wide constants
│       └── helpers.js                                   # reusable function
│
├── App.jsx                                
├── main.jsx (or index.js)
└── README.md
