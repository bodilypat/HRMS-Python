//src/features/bookings/hooks/useBookingDetails.js
import { useEffect, useState } from "react";

import { getBookingById } from "../services/bookingApi";

export const useBookingDetails = (
    bookingId 
) => {
    const [booking, setBooking] = useState(null);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState(null);

    const fetchBooking = async () => {
        if (!bookingId) return;

        try {
            setLoading(true);
            setError(null);

            const data = await getBookingById(
                bookingId
            );

            setBooking(data);
        } catch (err) {
            setError(
                err.response?.data?.message || "Failed to load booking"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBooking();
    }, [bookingId]);

    return {
        booking,
        loading,
        error,
        refetch: fetchBooking,
    };
};

