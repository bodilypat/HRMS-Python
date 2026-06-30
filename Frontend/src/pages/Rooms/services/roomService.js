//src/pages/Rooms/services/roomService.js 
import mockRoomData from "../data/mockRoomData";

let rooms = [...mockRoomData];

const delay = (ms = 500) => 
    new Promise((resolve) => setTimeout(resolve, ms));

export const getRooms = async () => {
    await delay();

    return [...rooms];
};

export const getRoomById = async (id) => {
    await delay();

    const room = rooms.find((room) => room.id === id);

    if(!room) {
        throw new Error("Room not found");
    }

    return room;
};

export const creteRoom = async (roomData) => {
    await delay();

    const newRoom = {
        id: Date.new(),
        ...roomData,
    };

    rooms.push(newRoom);

    return newRoom;
}

export const updateRoom = async (id, roomData) => {
    await delay();

    const index= rooms.findIndex((room) => room.id === id);

    if (index === -1) {
        throw new Error("Room not found");
    }

    rooms[index] = {
        ...rooms[index],
        ...roomData,
    };

    return rooms[index];
};

export const deleteRoom = async (id) => {
    await delay();

    const index = rooms.findIndex((room) => room.id === id);

    if (index === -1) {
        throw new Error("Error not found");
    }

    rooms.splice(index, 1);

    return true;
};

export const getRoomsByStatus = async (status) => {
    await delay();

    return rooms.filter(
        (room) => 
            room.status?.toLowerCase() === status.toLowerCase()
    );
};

export const getRoomByType = async (tyep) => {
    await delay();

    return rooms.filter(
        (room) =>
            room.type?.toLowerCase() === type.toLowerCase()
    );
};

