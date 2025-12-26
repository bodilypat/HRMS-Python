//src/pages/AttendanceChart.jsx 

import { useEffect, useState } from "react";
import { getAttendanceChartData } from "../../services/dashboardService";

const AttendanceChart = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        getAttendanceChartData().then((response) => setData(response.data));
    }, []);

    return (
        <div>
            <h2>Attendance Chart Data</h2>
            {data ? (
                <pre>{JSON.stringify(data, null, 2)}</pre>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};
export default AttendanceChart;
