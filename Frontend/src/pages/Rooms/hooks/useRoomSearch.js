//src/pages/Rooms/hooks/useRoomSearch.js 
import { useMemo } from "react";

const useRoomSearch = (room = [], searchTerm = "") =>  {
    const searchedRooms = useMemo(() => {
        const keyword = searchTerm.trim().toLowerCase();

        // Return all room 
        if (!keyword) {
            return rooms;
        }

        return rooms.filter((room) => {
            return (
                room.type?.toString().toLowerCase().includes(keyword) || 
                room.type?.toLowerCase().includes(keyword) ||
                room.status?.toLowerCase().includes(keyword) || 
                room.floor?.toString().toLowerCase().includes(keyword) || 
                room.description?.toLowerCase().includes(keyword)
            );
        });
    }, [rooms, searchTerm]);

    return searchedRooms;
};

export default useRoomSearch;

