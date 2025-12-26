//src/pages/employee/EmployeeProfile.jsx 

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getEmployeeById } from "../../services/employeeService";
import EmployeeDocuments from "./EmployeeDocuments";

const EmployeeProfile = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState(null);

    useEffect(() => {
        getEmployeeById(id).then(data => setEmployee(data));
    }, [id]);

    if (!employee) {
        return <div>Loading...</div>;
    }

    return (
        <div className="employee-profile">
            <h1>{employee.name}'s Profile</h1>
            <p><strong>Position:</strong> {employee.position}</p>
            <p><strong>Department:</strong> {employee.department}</p>
            <p><strong>Email:</strong> {employee.email}</p> 
            <Link to={`/employee/${id}/edit`}>Edit Profile</Link>
            <EmployeeDocuments employeeId={id} />
        </div>
    );
};
export default EmployeeProfile;
