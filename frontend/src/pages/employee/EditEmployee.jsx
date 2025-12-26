//src/pages/employee/EditEmployee.jsx

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getEmployeeById, updateEmployee } from '../../services/employeeService';

const EditEmployee = () => {
    const { id } = useParams();
    const [form, setForm] = useState({
        name: '',
        position: '',
        department: '',
        email: ''
    });

    useEffect(() => {
        getEmployeeById(id).then((response) => setForm(response.data));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        updateEmployee(id, form).then(() => {
            alert('Employee updated successfully!');
            window.location.href = `/employee/${id}`;
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Edit Employee</h2>
            <label>
                Name:
                <input  
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({...form, name: e.target.value})}
                />
            </label>
            <label>
                Position:
                <input
                    type="text"
                    value={form.position}
                    onChange={(e) => setForm({...form, position: e.target.value})}
                />
            </label>
            <label>
                Department:
                <input
                    type="text"
                    value={form.department}
                    onChange={(e) => setForm({...form, department: e.target.value})}
                />
            </label>
            <label>
                Email:
                <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({...form, email: e.target.value})}
                />
            </label>
            <button type="submit">Update Employee</button>
        </form>
    );
};
export default EditEmployee;

