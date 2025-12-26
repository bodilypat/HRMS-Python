//src/pages/leave/ApplyLeave.jsx 

import { useState } from 'react';
import { applyLeave } from '../../services/leaveService';

const ApplyLeave = () => {
    const [from, setFrom] = useState({startDate: '', endDate: '', type: '', reason: ''});

   const handleSubmit = async (e) => {
        e.preventDefault();
        await applyLeave(from);
        alert('Leave applied successfully!');
        window.location.href = '/leave/list';
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Apply for Leave</h2>
            <input type="date" value={from.startDate} onChange={(e) => setFrom({...from, startDate: e.target.value})} required />
            <input type="date" value={from.endDate} onChange={(e) => setFrom({...from, endDate: e.target.value})} required />
            <select value={from.type} onChange={(e) => setFrom({...from, type: e.target.value})} required>
                <option value="">Select Leave Type</option>
                <option value="Annual">Annual</option>
                <option value="Sick">Sick</option>
                <option value="Maternity">Maternity</option>
            </select>
            <textarea value={from.reason} onChange={(e) => setFrom({...from, reason: e.target.value})} placeholder="Reason for leave" required></textarea>
            <button type="submit">Apply Leave</button>
        </form>
    );
};
export default ApplyLeave;


