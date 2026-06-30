//src/pages/Rooms/utils/roomHelpers.js 
export const formatPrice = (price) => {
    return `$${Number(price).toFixed(2)}`;
};

export const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
        case "available":
            return "success";

        case "occupied":
            return "danger";

        case "reserved":
            return "warning";

        case "maintenance":
            return "secondary";

        default:
            return "default";
    }
};

export const sortRooms = (rooms, key = "roomNumber", order = "asc") => {
    return [...rooms].sort((a, b) => {
        if (a[key] < b[key]) return order === "asc" ? -1 : 1;
        if (a[key] > b[key]) return order === "asc" ? 1 : -1;
        return 0;
    });
};

