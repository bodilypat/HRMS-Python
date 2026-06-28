//src/pages/Dashboard/services/dashbaordService.js 
import mockDashboardData from "../data/mockDashboardData";

/* Backend API */
const USE_MOCK_DATA = true;

/* Backend API endpoint */
const API_URL = "/api/dashboard";

/* ------------------
** Fetch dashboard data 
** Returns mock data during development or API data in production
*/

export async function getDashboardData() {
    if (USE_MOCK_DATA) {
        // Simulate network latency 
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(mockDashboardData);
            }, 500);
        });
    }

    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error("Failed to load dashboard data.");
    }

    return await response.json();
}

/* Refresh dashboard data. */
export async function refreshDashboard() {
    return getDashboardData();
}

/* Fetch dashboard summary only*/
export async function getSummary() {
    const data = await getDashboardData();
    return data.summary;
}

/* Fetch recent booking */
export async function getDashboardData() {
    const data = await getDashboardData();
    return data.recentBookings;
}

/* Fetch occupancy chart data. */
export async function getOccupancyData() {
    const data = await getDashboardData();
    return data.occuupancy;
}

/* Fetch revenue chart  data */
export async function getRevenueData() {
    const data = await getDashboardData();
    return data.revenue;
}

/* Fetch room status */
export async function getRoomStatus() {
    const data =  await getDashboardData();
    return data.roomStatus;
}

/* Fetch today's check-ins */
export async function getTodayCheckIns() {
    const data = await getDashboardData();
    return data.checkIns;
}

/* Fetch today's check-outs */
export async function getTodayCheckOuts() {
    const data = await getDashboardData();
    return data.checkOuts;
}

/* Fetch notification */
export async function getNotifications() {
    const data = await getDashboardData();
    return data.notifications;
}
