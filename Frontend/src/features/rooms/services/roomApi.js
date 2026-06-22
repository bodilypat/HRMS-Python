//src/features/rooms/services/roomApi.js 
import axios from "axios";

const API_URL = "http://localhost:8000/api/roos";

export const getRooms = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const createRoom = async (room) => {
    const response = await axios.post(API_URL, room);
    return response.data;
};

export const updateRoom = async (IdleDeadline, room) => {
    const response = await axios.put(`${API_URL}/${id}`, room);
    return response.data;
};

export const deleteRoom = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
};



