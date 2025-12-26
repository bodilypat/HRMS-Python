//src/pages/dashboard/Dashboard.jsx 

import { useEffect, useState } from 'react';
import { getDashboardStatus, getRecentActivities } from '../../services/dashboardService';

import DashboardCards from './DashboardCards';
import AttendanceChart from './AttendanceChart';
import LeaveChart from './LeaveChart';
import RecentActivities from './RecentActivities';

const Dashboard = () => {
    const [state, setState] = useState(null);
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        getDashboardStats().then((response) => setState(response.data));
        getRecentActivities().then((response) => setActivities(response.data));
    }, []);

    return (
        <div>
            <h1>Dashboard</h1>
            {state && <DashboardCards data={state} />}
            {state && <AttendanceChart data={state.attendanceData} />}
            {state && <LeaveChart data={state.leaveData} />}
            {activities && <RecentActivities data={activities} />}
        </div>
    );
};
export default Dashboard;
