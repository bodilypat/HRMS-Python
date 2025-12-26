//src/pages/leave/LeaveApproval.jsx

import { useState, useEffect } from "react";
import { getLeaveList, approveLeave, rejectLeave } from "../../services/leaveService";

const LeaveApproval = () => {
    const [pendingLeaves, setPendingLeaves] = useState([]);

    useEffect(() => {
        fetchPendingLeaves();
    }, []);

    const fetchPendingLeaves = async () => {
        const leaves = await getLeaveList({ status: "pending" });
        setPendingLeaves(leaves);
    };

    const handleApprove = async (leaveId) => {
        await approveLeave(leaveId);
        fetchPendingLeaves();
    }

    const handleReject = async (leaveId) => {
        await rejectLeave(leaveId);
        fetchPendingLeaves();
    };

    return (
        <div>
            <h1>Leave Approvals</h1>
            <ul>
                {pendingLeaves.map(leave => (
                    <li key={leave.id}>
                        {leave.employeeName} - {leave.startDate} to {leave.endDate}
                        <button onClick={() => handleApprove(leave.id)}>Approve</button>
                        <button onClick={() => handleReject(leave.id)}>Reject</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LeaveApproval;

