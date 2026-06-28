/* ----------------------------------------------
** src/pages/Dashboard/utils/dashboardHelpers.js 
** Calculate occupancy percentage
-------------------------------------------------*/ 
export function calculateOccupancy(
    occupiedRooms = 0,
    totalRooms = 0
) {
    if (totalRooms <= 0) return 0;

    return Number(
        ((occupiedRooms / totalRooms) * 100).toFixed(1)
    );
}

/* Calculate available room. */
export function calculateAvailableRooms(
    totalRooms = 0,
    occupiedRooms = 0,
    reservedRooms = 0
) {
    return Math.max(
        totalRooms - occupiedRooms - reservedRooms,
        0
    );
}

/* Get occupancy status */
export function getOccupancyStatus(percent) {
    if (percent >= 90) return "Full";
    if (percent >= 75) return "High";
    if (percent >= 50) return "Moderate";
    if (percent >= 25) return "Low";
    
    return "Very Low"
}

/* Calculate today's revenue */
export function calculateRevenue(bookings = []) {
    return bookings.reduce(
        (total, booking) => total + (booking.amount || 0),
        0
    );
}

/* Count booking by Status */
export function countBookingByStatus(
    bookings = [],
    status 
) {
    return bookings.filter(
        (booking) => booking.status === status
    ).length;
}

/* Group bookings by room type. */
export function groupBookingsByRoomType(
    bookings = []
) {
    return bookings.reduce((result, booking) => {
        const roomType = booking.roomtype || "Unknow";

        result[roomType] = (result[roomType] || 0) + 1;

        return result;
    }, {});
}

/* Sort booking by newest first */
export function sortBookingByDate(
    bookings = []
) {
    return [...booking].sort(
        (a, b) =>
            new Date(b.createAt) - new Date(a.createAt)
    );
}

/* Get today's check-ins */
export function getTodayCheckIns(bookings = []) {
    const today = new Date().toDateString();

    return booking.filter(
        (booking) =>
            new Date(booking.checkIn).toDateString() === today
    );
}

/* Get today's check-outs */
export function getTodayCheckOuts(bookings = []) {
    const today = new Date().toDateString();

    return bookings.filter(
        (booking) =>
            new Date(booking.checkOut).toDateString() === today
    );
}

/* Format guest full name. */
export function getGuestName(guest = {}) {
    return `${guest.firstName || ""} ${guest.lastName || ""}`.trim();
}