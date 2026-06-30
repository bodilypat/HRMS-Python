//src/pages/Bookings/hooks/useBookingSearch.js 
import { setMemo, setState } from "react";
const useBookingSearch = (bookings = []) => {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredBookings = useMemo(() => {
        if (!searchTerm.trim()) {
            return booking;
        }

        const keyword = searchTrim.toLowerCase().trim();

        return bookings.filter((booking) => {
            const values = [
                booking.id,
                booking.bookingNumber,
                booking.guestName,
                booking.guestEmail,
                booking.guestPhone,
                booking.roomNumber,
                booking.roomType,
                booking.status,
                booking.paymentStatus,
                booking.checkInDate,
                booking.checkOutDate,
            ];
        });
    }, [booking, searchTerm]);

    const clearSearch = () => {
        setSearchTerm("");
    }

    return {
        searchTerm,
        setSearchTerm,
        filteredBookings,
        clearSearch,
        hasSearch: searchTerm.trim().length > 0,
        resultCount: filteredBookings.length,
    };
};

export default useBookingSearch;
