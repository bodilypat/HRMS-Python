//src/pages/dashboard/LeaveChart.jsx 

import { useEffect, useState } from "react";
import { getLeaveChartData } from "../../services/dashboardService";

const LeaveChart = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        getLeaveChartData().then((response) => setData(response.data));
    }, []);

    return (
        <div>
            {/* Render leave chart using the fetched data */}
            <h2>Leave Chart Data</h2>
            {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
        </div>
    );
};
export default LeaveChart;

