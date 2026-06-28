import "./Dashboard.css";

import SummaryCards from "./components/SummaryCard";
import OccupancyChart from "./components/OccupancyChart";
import RevenueChart from "./components/RevenueChart";
import RecentBooking from "./components/RecentBooking";
import RoomStatus from "./components/RoomStatus";
import CheckInList from "./components/CheckInList";
import CheckOutList from "./components/QuickActions";
import QuickActions from "./components/QuickActions";
import Notifications from "./components/Notifications";

const Dashboard = () => {
    return (
        <div className="dashboard-page">

            {/* Page Header */}
            <header className="dashboard-header">
                <div>
                    <h1>Hotel Mangement Dashboard</h1>
                    <p>Welcome back! Here's today's hotel overview.</p>
                </div>

                <div className="dashboard-date">
                    {new.Date().toLocalDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                </div>
            </header>

            {/* Summary Cards */}
            <section className="dashboard-section">
                <SummaryCards />
            </section>

            {/* Charts */}
            <section className="dashboard-grid two-column">
                <OccupancyChart />
                <RevenueChart />
            </section>

            {/* Room Status + Quick Actions */}
            <section className="dashboard grid two-column">
                <RoomStatus />
                <QuickActions />
            </section>

            {/* Check In / Check Out */}
            <section className="dashboard-grid two-column">
                <CheckInList />
                <CheckOutList />
            </section>

            {/* Recent Booking */}
            <section className="dashboard-section">
                <RecentBookings />
            </section>

            {/* Notifications */}
            <section className="dashboard-section">
                <Notifications />
            </section>
        </div>
    );
};

export default Dashboard;

