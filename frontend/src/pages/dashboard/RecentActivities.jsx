//src/pages/dashboard/RecentActivities.jsx 

const RecentActivities = () => ({ data }) => {
    return (
        <div>
            <h3>Recent Activities</h3>
            <ul>
                {data && data.map((activity, index) => (
                    <li key={index}>{activity.employee} applied for {activity.type} ({activity.status})</li>
                ))}
            </ul>
        </div>
    );
};

export default RecentActivities;
