//src/pages/Rooms/hooks/useRoomFilter.js
import { useMemo } from "react";

const useRoomFilter = (rooms = [], filters = {}) => {
    const {
        status = "all",
        roomType = "all",
        availability ="all",
        mainPrince = "",
        maxPrice = "",
    } = filters;

    const filteredRooms = useMemo(() => {
        return rooms.filter((room) => {

            // filter by room status 
            const statusMatch =
                status === "all" || 
                room.status?.toLowerCase() === status.toLowerCase();

            // Filter by room type 
            const typeMatch = 
                roomType === "all" ||
                room.type?.toLowerCase() === roomType.toLowerCase();

            // Filter by availability 
            const availabiilityMatch = 
                availability === "all" || 
                room.available === availability;

            // Filter by minimum price 
            const minPriceMatch = 
                minPrice === "" ||
                Number(room.price) >= Number(minPrice);

            // Filter by maximum price 
            const maxPriceMatch = 
                maxPrice === "" ||
                Number(room.price) <= Number(maxPrice);

                return (
                    statusMatch &&
                    typeMatch &&
                    availabiilityMatch &&
                    minPriceMatch &&
                    maxPriceMatch
                );
        }, [
            rooms,
            status,
            roomType,
            availability,
            minPrice,
            maxPrice,
        ]);
    })
}