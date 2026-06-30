//src/pages/Rooms/utils/roomValidations.js 
export const validateRoom = (room) => {
    const errors = {};

    if (!room.roomNumber?.trim()) {
        errors.roomNumber = "Room number is required.";
    }

    if (!room.type?.trim()) {
        errors.type = "Room type is required.";
    }

    if (!room.status?.trim()) {
        errors.status = "Status is required";
    }

    if (room.price === "" || Number(room.price) <= 0) {
        errors.price = "Price must be greater than zero.";
    }

    return errors;
};

export const isRoomValid = (room) => {
    return Object.keys(validateRoom(room)).length === 0;
};

