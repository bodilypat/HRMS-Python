//src/pages/Dashboard/hooks/useDashboard.js 
import { useState, useEffect } from "react";
import { getDashboardData } from "../services/dashboardService";

const initialState = {
    summary: {
        totalRooms: 0,
        availablleRooms: 0,
        occupiedRooms: 0,
        reservedRooms: 0,
        todayCheckIns: 0,
        todayCheckOuts: 0,
        totalGuests: 0,
        totalRevenue: 0,
    },

    recentBookings: [],
    occupancy: [],
    revenue: [],
    roomStatus: [],
    checkIns: [],
    checkOuts: [],
    notifications: [],
};

export default function useDashboard() {
    const [dashboard, setDashboard] = useState(initialState);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchDashboard = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await getDashboardData();

            setDashboardData ({
                summary: response.summary || initialState.summary,
                recentBookings: response.recentBooking || [],
                occupancy: response.occupancy || [],
                revenue: response.revenue || [],
                roomStatus: response.roomStatus || [],
                checkIns: response.checkIns || [],
                checkOuts: response.checkOuts || [],
                notifications: response.notifications || [],
            });
        } catch (err) {
            console.error("Dashboard Error:", err);

            setError(
                err?.message || "Unable to load dashboard data."
            );
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchDashboard();
    }, [fetchDashboard]);

    return {
        dashboardData,
        loading,
        error,
        refreshDashboard: fetchDashboard,
    };
}


