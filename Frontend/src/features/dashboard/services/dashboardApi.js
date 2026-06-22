//src/features/dashboard/services/dashboardApi.js 
import api from "../../../services/api";

export const getDashboardStats = () => 
    api.get("/dashboard/stats");

export const getRecentBooking = () => 
    api.get("/dashboard/bookings");

export const getRevenue = () => 
    api.get("/dashboard/revenue");

