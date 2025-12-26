//src/pages/leave/LeaveList.py

import { useState, useEffect } from 'react';
import { getLeaveList } from '../../services/leaveService';

const LeaveList = () => {
    const [leaves, setLeaves] = useState([]);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        fetchLeaves();
    }, [filter]);

    const fetchLeaves = async () => {
        const data = await getLeaveList(filter);
        setLeaves(data);
    };

    return (
        <div>
            <h1>Leave History</h1>
            <select onChange={(e) => setFilter(e.target.value)} value={filter}>
                <option value="all">All</option>
                <option value="approved">Approved</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
            </select>
            <ul>
                {leaves.map((leave) => (
                    <li key={leave.id}>
                        {leave.employeeName} - {leave.status} - {leave.startDate} to {leave.endDate}
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default LeaveList;

  