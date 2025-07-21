# SQLAlchemy Models for HRMS 

from app import db
from datetime import date 
from sqlalchemy import Numeric, Boolean

class JobPosition(db.Model):
	__tablename__ = 'job_positions'
	
	position_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
	title = db.Column(db.String(100))
	description = db.Column(db.Text)
	level = db.Column(db.String(50))
	
	employees = db.relationship('Employee', backref='position', lazy=True)
	
class Department(db.Model):
	__tablename__= 'departments'
	
	depart_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
	name = db.Column(db.String(100))
	manager_id = db.Column(db.Integer, db.ForeignKey('employees.employee_id'))
	
	employees = db.relationship('Employee', backref='department', lazy=True)
	
	
class Employee(db.Model):
	__tablename__='employees'
	
	employee_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
	first_name = db.Column(db.String(100), nullable=False)
	last_name = db.Column(db.String(100), nullable=False)
	email = db.Column(db.String(150), unique=True, nullable=False)
	phone = db.Column(db.String(20))
	date_of_birth = db.Column(db.Date)
	hire_date = db.Column(db.Date, nullable=False)
	department_id = db.Column(db.Integer, db.ForeignKey('departments.depart_id'))
	position_id = db.Column(db.Integer, db.ForeignKey('job_positions.position_id'))
	salary = db.Column(db.Numeric(10, 2))
	statuss = db.Column(db.String(20))
	
	user_role = db.relationship('UserRole', backref='employee', lazy=True)
    attendance = db.relationship('Attendance', backref='employee', lazy=True)
    leave_request = db.relationship('LeaveRequest', backref='employee', lazy=True)
    payroll = db.relationship('Payroll', backref=='employee', lazy=True)
    training_records = db.relationship('TrainingRecord', backref='employee', lazy=True)
    
class Role(db.Model):
    __tablename__ = 'roles'
    
    role_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    role_name = db.Column(db.String(100), unique=True)
    description = db.Column(db.Text)
    
    user_roles = db.relationship('UserRole', backref='role', lazy=True)
    role_permission = db.relationship('RolePermission', backref='role', lazy=True)
    
class UserRole(db.Model):
    __tablename__= 'user_roles'
    user_role_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    employee_id = db.Column(db.Integer, db.ForeignKey('employees.employee_id'))
    role_id = db.Column(db.Integer, db.ForeignKey('roles.role_id'))
    assigned_date = db.Column(db.Date, default=date.today)
    
class Attendance(db.Model):
    __tablename__ = 'attendance'
    
    attendance_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    employee_id = db.Column(db.Integer, db.ForeignKey('employees.employee_id'))
    date = db.Column(db.Date)
    check_in  = db.Column(db.Time)
    check_out = db.Column(db.Time)
    
class LeaveRequest(db.Model):
    __tablename__ = 'leave_requests'
    
    leave_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    employee_id = db.Column(db.Integer, db.ForeignKey('employees.employee_id'))
    start_date = db.Column(db.Date)
    end_date = db.Column(db.Date)
    leave_type = db.Column(db.String(50))
    status = db.Column(db.String(20))
    
class Payroll(db.Model):
    __tablename__ = 'payroll'
    
    payroll_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    employee_id = db.Column(db.Integer, db.ForeignKey('employees.employee_id'))
    pay_period = db.Column(db.Date)
    base_salary = db.Column(db.Numeric(10, 2))
    deductions = db.Column(Numeric(10, 2))
	bonuses = db.Column(db.Numeric(10, 2))
    net_pay = db.Column(db.Numeric(10, 2))
    
class TrainingCourse(db.Model):
    __tablename__ = 'training_courses'
    
    course_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    course_name = db.Column(db.String(100))
    description = db.Column(db.Text)
    duration = db.Column(db.Integer)
    required = db.Column(Boolean)
    
    training_records = db.relationship('TrainingRecord', backref='course', lazy=True)
    
class TrainingRecord(db.Model):
    __tablename__ = 'training_records'
    
    training_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    employee_id = db.Column(db.Integer, db.ForeignKey('employees.employee_id'))
    course_id = db.Column(db.Integer, db.ForeignKey('traning_course.course_id'))
    training_name = db.Column(db.String(100))
    start_date = db.Column(db.Date)
    end_date = db.Column(db.Date)
    status = db.Column(db.String(20))
    score = db.Column(db.Numeric(10, 2))
    certificate = db.Column(db.String(255))
    remarks = db.Column(db.Text)
    
class Permission(db.Model):
    __tablename__ = 'permissions'
    
    permission_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    permission_name = db.Column(db.String(100))
    description = db.Column(db.Text)
    
    role_permission = db.relationship('RolePermission', backref='permission', lazy=True)
    
class RolePermission(db.Model):
    __tablename__ = 'role_permissions'
    
    role_perm_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    role_id = db.Column(db.Integer, db.ForeignKey('roles.role_id'))
    permission_id = db.Column(db.Integer, db.ForeignKey('permissions.permission_id')) 
    
    