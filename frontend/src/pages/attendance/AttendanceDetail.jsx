//src/pages/attendance/AttendanceDetail.jsx

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAttendanceByEmployee } from "../../services/attendanceService";

const AttendanceDetail = () => {
    const { employeeId } = useParams();
    const [attendance, setAttendance] = useState([]);

    useEffect(() => {
        const fetchAttendance = async (employeeId) => {
            try {
                const response = await getAttendanceByEmployee(employeeId);
                setAttendance(response.data);
            } catch (error) {
                console.error("Error fetching attendance:", error);
            }
        };

        fetchAttendance(employeeId);
    }, [employeeId]);

    return (
        <div>
            <h2>Attendance Details for Employee ID: {employeeId}</h2>
            <ul>
                {attendance.map((record) => (
                    <li key={record.date}>
                        Date: {record.date}, Status: {record.status}
                    </li>
                ))}
            </ul>
        </div>
    );
};

