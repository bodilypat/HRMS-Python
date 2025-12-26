//src/pages/attendance/AttendanceReport.jsx 

import { useEffect, useState } from 'react';
import { getAttendanceReport } from '../../services/attendanceService';

const AttendanceReport = () => {
    const [report, setReport] = useState([]);
    const [month, setMonth] = useState(new Date().getMonth() + 1);

    useEffect(() => {
        fetchReport(month);
    }, [month]);
    
    const fetchReport = async (month) => {
        try {
            const data = await getAttendanceReport(month);
            setReport(data);
        } catch (error) {
            console.error('Error fetching attendance report:', error);
        }
    };

    return (
        <div>
            <h1>Attendance Report for Month: {month}</h1>
            <select value={month} onChange={(e) => setMonth(parseInt(e.target.value))}>
                {[...Array(12).keys()].map((m) => (
                    <option key={m + 1} value={m + 1}>
                        {m + 1}
                    </option>
                ))}
            </select>   
            <table>
                <thead>
                    <tr>    
                        <th>Employee ID</th>
                        <th>Name</th>
                        <th>Days Present</th>
                        <th>Days Absent</th>    
                    </tr>
                </thead>
                <tbody>
                    {report.map((record) => (   
                        <tr key={record.employeeId}>
                            <td>{record.employeeId}</td>
                            <td>{record.name}</td>
                            <td>{record.daysPresent}</td>
                            <td>{record.daysAbsent}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
export default AttendanceReport;
