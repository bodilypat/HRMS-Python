//src/features/dashboard/Dashboard.jsx
import StatsCard from "../components/StatsCard";
import RevenueCard from "../components/RevenueCard";
import RecentBookings from "../components/RecentBookings";
import useDashboard from "../hooks/useDashboard";

function Dashboard() {
    
    const { stats } = useDashboard();

    return (
        
        <div className="p-6">
            <h1 className="text-3xl font-bold">Hotel Dashboard</h1>

            <div className="grid grid-cols-4 gap-4 mt-6">

                <StatsCard 
                    title="Total Rooms"
                    value={stats?.totalRooms}
                />

                <StateCard 
                    title="Availble Rooms"
                    value={stats?.availableRooms}
                />

                <StatsCard 
                    title="Bookings"
                    value={stats?.totalBooking}
                />
                <StatsCard 
                    title="Revenue"
                    value={stats?.revenue}
                />

            </div>
            <RevenueCard />

            <RecentBookings />

        </div>
    );
}

export default Dashboard;

