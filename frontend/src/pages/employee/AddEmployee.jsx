//src/pages/employee/AddEmployee.jsx 

import { useState } from "react";
import { addEmployee } from "../../services/employeeService";

const AddEmployee = () => {
    const [form, setForm] = useState({
        name: "",
        position: "",
        department: "",
        email: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        alert("Submitting employee data...");
        window.location.href = "/employees";
    };

    return (
        <form onSubmit={handleSubmit} className="employee-form">
            <h2>Add New Employee</h2>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({...form, name: e.target.value})}
                />
            </div>
            <div>
                <label>Position:</label>
                <input
                    type="text"
                    value={form.position}
                    onChange={(e) => setForm({...form, position: e.target.value})}
                />
            </div>
            <div>
                <label>Department:</label>
                <input
                    type="text"
                    value={form.department}
                    onChange={(e) => setForm({...form, department: e.target.value})}
                />
            </div>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({...form, email: e.target.value})}
                />
            </div>
            <button type="submit">Add Employee</button>
        </form>
    );
};
export default AddEmployee;

