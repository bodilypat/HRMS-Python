//src/services/dashboardService.js 

import api from "./api";

/* Dashboard Service
  * Handles all dashboard related API calls.
    - Summary cards 
    - Chart data
    - Recent activities
    - Role-based dashboard info
  */

// Dashboard Summary Cards 
export const getDashboardStats = () => {
    return api.get("/dashboard/stats");
};

// Recent Activities
export const getRecentActivities = (param) => {
    return api.get("/dashboard/recent-activities", { params: param });
};

// Attendance Chart Data 
export const getAttendanceChartData = () => {
    return api.get("/dashboard/attendance-chart");
};

// Leave Chart Data
export const getLeaveChartData = () => {
    return api.get("/dashboard/leave-chart");
};

// Role-Based Dashboard  
export const getRoleBasedDashboard = () => {
    return api.get("/dashboard/role-based");
};

