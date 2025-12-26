//src/pages/employee/EmployeeList.jsx 

import { useState, useEffect } from 'react';
import { getEmployees } from '../../services/employeeService';
import { Link } from 'react-router-dom';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [search, setSerach] = useState('');

    useEffect(() => {
        fetchEmployees();
    }, [search]);

    const fetchEmployees = async () => {
        const data = await getEmployees(search);
        setEmployees(data);
    };

    return (
        <div>
            <h1>Employee List</h1>
            <input
                type="text"
                placeholder="Search by name"
                value={search}  
                onChange={(e) => setSerach(e.target.value)}
            />
            <Link to="/employees/add">Add New Employee</Link>
            <ul>
                {employees.map((employee) => (
                    <li key={employee.id}>
                        {employee.name} - {employee.position}
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default EmployeeList;

