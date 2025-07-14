/* HRMS schema to a .sql file  */
schema_sql = """
-- HRMS Database Schema 

CREATE TABLE IF NOT EXISTS Departments (
	depart_id INT PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(100),
	manager_id INT,
	FOREIGN KEY (manager_id) REFERENCES Employees(employee_id)
);

CREATE TABLE IF NOT EXISTS Job_Positions (
	position_id INT PRIMARY KEY AUTO_INCREMENT,
	title VARCHAR(100),
	description TEXT,
	level VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS Employees (
	employee_id INT PRIMARY KEY AUTO_INCREMENT,
	first_name VARCHAR(100),
	last_name VARCHAR(100),
	email VARCHAR(150) UNIQUE,
	phone VARCHAR(20),
	date_of_birt DATE,
	hire_date DATE,
	department_id INT,
	position_id INT,
	salary DECIMAL(10,2),
	status VARCHAR(20),
	FOREIGN KEY (department_id) REFERENCES Departments(deparment_id),
	FOREIGN KEY (position_id) REFERENCES Job_Positions(position_id)
);

CREATE TABLE IF NOT EXISTS Roles (
	role_id INT PRIMARY KEY AUTO_INCREMENT,
	role_name VARCHAR(100) UNIQUE,
	description TEXT,
);

CREATE TABLE IF NOT EXISTS User_Roles (
	user_role_id INT PRIMARY KEY AUTO_INCREMENT,
	employee_id INT,
	role_id INT,
	assigned_date DATE,
	FOREIGN KEY (employee_id) REFERENCES Employees(employee_id),
	FOREIGN KEY (role_id) REFERENCES Roles(role_id) 
);

CREATE TABLE IF NOT EXISTS Attendance (
	attendance_id INT PRIMARY KEY AUTO_INCREMENT,
	employee_id INT,
	date DATE,
	check_in TIME,
	check_out TIME,
	FOREIGN KEY (employee_id) REFERENCES Employees(employee_id) 
);

CREATE TABLE IF NOT EXISTS Leave_Requests  (
	leave_id INT PRIMARY KEY AUTO_INCREMENT,
	employee_id INT,
	start_date DATE,
	end_date DATE,
	leave_type VARCHAR(50),
	status VARCHAR(20),
	FOREIGN KEY (employee_id) REFERENCES Employees(employee_id)
);

CREATE TABLE IF NOT EXISTS Payroll (
	payroll_id INT PRIMARY KEY AUTO_INCREMENT,
	employee_id INT,
	pay_period DATE,
	base_salary DECIMAL(10, 2),
	deductions DECIMAL(10, 2),
	bonuses DECIMAL(10, 2),
	net_pay DECIMAL(10, 2) 
	FOREIGN KEY (employee_id) REFERENCES Employees(employee_id)
);

CREATE TABLE IF NOT EXISTS Training_Courses (
	course_id INT PRIMARY KEY AUTO_INCREMENT,
	course_name VARCHAR(100),
	description TEXT,
	duration_hour INT,
	require BOOLEAN
);

CREATE TABLE IF NOT EXISTS Training_Records (
	training_id INT PRIMARY KEY AUTO_INCREMENT,
	employee_id INT,
	course_id INT,
	training_name VARCHAR(100),
	start_date DATE,
	end_date DATE,
	status VARCHAR(20),
	score DECIMAL(5, 2),
	certificate VARCHAR(255),
	remarks TEXT,
	FOREIGN KEY (employee_id) REFERENCES Employees(employee_id),
	FOREIGN KEY (course_id) REFERENCES Training_Courses(course_id) 
);

CREATE TABLE IF NOT EXISTS Permissions (
	role_permission_id INT PRIMARY KEY AUTO_INCREMENT,
	permission_name VARCHAR(100),
	description TEXT,
);

CREATE TABLE IF NOT EXISTS Role_Permissions (
	role_permission_id INT PRIMARY KEY AUTO_INCREMENT,
	role_id INT,
	permission_id INT,
	FOREIGN KEY (role_id) REFERENCES Roles(role_id),
	FOREIGN KEY (permission_id) REFERENCES Permissions(permission_id) 
);

"""
	with open("hrms_schema.sql", "w") as file:
		file.write(schema_sql)
	print("SQL file created: hrms_schema.sql")