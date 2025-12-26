//src/pages/attendance/AttendanceList.jsx 

import { useState, useEffect } from 'react';
import { getAttendanceList } from '../../services/attendanceService';
import { Link } from 'react-router-dom';

const AttendanceList = () => {
    const [attendance, setAttendance] = useState([]);
    const [date, setDate] = useState('');

    useEffect(() => {
        fetchAttendance();
    }, []);

    const fetchAttendance = async () => {
        const data = await getAttendanceList();
        setAttendance(data);
    };

    return (
        <div>
            <h1>Attendance List</h1>
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="Filter by date"
            />
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Employee Name</th>  
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {attendance
                        .filter(record => !date || record.date === date)
                        .map((record) => (      
                            <tr key={record.id}>
                                <td>{record.date}</td>
                                <td>{record.employeeName}</td>
                                <td>{record.status}</td>
                                <td>
                                    <Link to={`/attendance/edit/${record.id}`}>Edit</Link>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};
export default AttendanceList;
