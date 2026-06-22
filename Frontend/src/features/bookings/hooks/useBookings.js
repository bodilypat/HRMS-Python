//src/features/bookings/hooks/useBookings.js
import { useEffect, useState } from "react";

import {
    getBookings,
    createBooking,
    updateBooking,
    deleteBooking,
} from "../services/bookingApi";

export const useBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchBookings = async (params = {}) => {
        try {
            setLoading(true);
            setError(null);

            const data = await getBookings(params);

            setBookings(data);
        } catch (error) {
            setError(
                error.response?.data?.message || "Failed to load bookings"
            );
        } finally {
            setLoading(false);
        }
    };

    const addBooking = async (bookingData) => {
        try {
            setLoading(true);

            const newBooking = await createBooking(bookingData);

            setBookings((prev) => [
                newBooking,
                ...prev,
            ]);

            return newBooking;
        } catch (error) {
            setError(
                error.response?.data?.message || "Failed to create booking"
            );
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const editBooking = async (
        id,
        bookingData
    ) => {
        try {
            setLoading(true);

            const updated = await updateBooking(
                id,
                bookingData 
            );

            setBookings((prev) => 
                prev.map((booking) => 
                    booking.id === id 
                    ? updated
                    : booking 
                )
            );

            return updated;
        } catch (error) {
            setError(
                error.response?.data?.message || "Failed to update booking"
            );
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const removeBooking = async (id) => {
        try {
            setLoading(true);

            await deleteBooking(id);

            setBookings((prev) => 
                prev.filter(
                    (booking) => booking.id !== id
                )
            );
        } catch (error) {
            setError(
                error.response?.data?.message || "Failed to delete booking"
            );

            throw error;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    return {
        bookings,
        loading,
        error,
        fetchBookings,
        addBooking,
        editBooking,
        removeBooking,
    };
};
