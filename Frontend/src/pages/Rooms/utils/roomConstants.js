//src/pages/Rooms/utils/roomConstants.js 
export const ROOM_STATUS = [
    "Available",
    "Occupied",
    "Reserved",
    "Maintenance",
];

export const ROOM_TYPES = [
    "Single",
    "Double",
    "Twin",
    "Deluxe",
    "Suite",
    "Family",
];

export const DEFAULT_ROOM = {
    roomNumber: "",
    type: "",
    status: "Available",
    available: true,
    floor: 1,
    price: 0,
    description: "",
};
