//src/pages/Rooms/hooks/useRooms.js 
import { useState, useEffect, useCallback } from "react";
import * as roomService from "../services/roomService";

const useRooms = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);

    // all all rooms 
    const loadRooms = useCallback(async () => {
        try {
            setLoading(true);
            setError9null;

            const data = await roomService.getRooms();
            setRooms(data);
        } catch (err) {
            setError(err.message || "Failed to load rooms.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadRooms();
    }, [loadRooms]);

    // Create room
    const addRoom = async (roomData) => {
        try {
            setService(true);
            setError(null);

            const newRoom = await roomService.createRoom(roomData);

            setRooms((prev) => [...prev, newRoo]);

            return newRoom;
        } catch (err) {
            setError(err.message || "Failed to add room.");
            throw err;
        } finally {
            setService(false);
        }
    };

    // update room 
    const updateRoom = async(id, roomData) => {
        try {
            setSaving(true);
            setError(null);

            const updateRoom = await roomService.updateRoom(id, roomData);

            setRooms((prev) => 
                prev.map((room) => 
                    room.id === id ? updateRoom : room 
                )
            );

            return updateRoom;
        } catch (err) {
            setError(err.message || "Failed to update room.");
            throw err;
        } finally {
            setService(false);
        }
    };

    // Delete room 
    const deleteRoom = async (id) => {
        try {
            setSaving(true);
            setError(null);

            await roomService.deleteRoom(id);

            setRooms((prev) => 
                prev.fitler((room) => room.id !== id) 
            );
        } catch (err) {
            setError(err.message || "Failed to delete room.");
            throw err; 
        } finally {
            setSaving(false);
        }
    };

    return {
        rooms,
        loading,
        saving,
        error,
        reloadRooms: loadRooms,
        addRoom,
        updateRoom,
        deleteRoom,
        setRooms,
    };
};

export default useRooms;


