//src/pages/attendance/MarkAttendance.jsx 

import { useState } from 'react';
import { useAttendance } from '../../services/attendanceService';


const MarkAttendance = () => {
    const [status, setStatus] = useState('ClockIn');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await useAttendance.markAttendance(status);
            alert(`Successfully marked ${status}`);
        } catch (error) {
            alert('Error marking attendance');
        }
    };

    return (
        <div>
            <h2>Mark Attendance</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Status:
                    <select value={status} onChange={(e) => setStatus(e.target.value)}> 
                        <option value="ClockIn">Clock In</option>
                        <option value="ClockOut">Clock Out</option>
                    </select>
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};
export default MarkAttendance;


