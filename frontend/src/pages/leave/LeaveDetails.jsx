//src/pages/leave/LeaveDetails.jsx 

import { useState, useEffect } from 'react';
import { getLeaveDetails } from '../../services/leaveService';

const LeaveList = () => {
    const [details, setDetails] = useState();

    useEffect(() => {
        getLeaveDetails(leaveId).then((response) => (response.ok ? setDetails(response.data) : null));
    }, [leaveId]);

    if (!details) return <div>Loading...</div>;

    return (
        <div>
            <h1>Leave Details</h1>
            <p>Salary Structure: {details.salaryStructure}</p>
            <p>Allowance: {details.allowance}</p>
            <p>Deductions: {details.deductions}</p>
            <p>Net Pay: {details.netPay}</p>
        </div>
    );
};

export default LeaveList;
