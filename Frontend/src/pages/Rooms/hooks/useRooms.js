//src/pages/Rooms/hooks/useRooms.js 
import { useEffect, useState } from "react";
import * as roomService from "../services/roomService";

const loadRooms = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);

    const loadRooms = async () => {
        try {
            setLoading(true);
            setError(null);

            const data = await roomService.getRooms();
            setrooms(data);
        } catch (err) {
            setError(err.message || "Failed to load rooms");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadRooms();
    }, []);

    const addRoom = async (room) => {
        try {
            setSaving(true);

            const newRoom = await roomService.createRoom(room);

            setRooms((prev) => [...prev, newRoom]);

            return newRoom;
        } finally {
            setServing(false);
        }
    };

    const updateRoom = async (id, updateRoom) => {
        try {
            setSaving(true);

            const room = await roomService.updateRoom(id, updateRoom);

            setRooms((prev) =>
                prev.map((item) => (item.id === id ? room : item))
            );

            return room;
        } finally {
            setSaving(false);
        }
    };

    const deleteRoom = async (id) => {
        try {
            setSaving(true);

            await roomService.deleteRoom(id);

            setRooms((prev) => prev.filter((room) => room.id !== id));
        } finally {
            setSaving(false);
        }
    };

    return {
        rooms,
        loading,
        saving,
        error,
        reload: loadRooms,
        addRoom,
        updateRoom,
        deleteRoom,
        setRooms,
    };
};

export default useRooms;

