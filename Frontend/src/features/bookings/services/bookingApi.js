//src/features/bookings/services/bookingApi.js 

import api from "../../../services/api";

/* GET all booking */
export const getBookings = async (params = {}) => {
    const response = await api.get("/bookings", {
        params,
    });

    return response.data;
};

/* GET booking by ID */
export const getBookingById = async (id) => {
    const response = await api.get(`/bookings/${id}`);

    return response.data;
};

/* Create booking */
export const createBooking = async (bookingData) => {
    const response = await api.post(
        "/bookings",
        bookingData
    );

    return response.data;
};

/* Update booking */
export const updateBooking = async (
    id,
    bookingData
) => {
    const response = await api.put(
        `/bookings/${id}`,
        bookingData
    );

    return response.data;
};

/* Partial update bookin */
export const patchBooking = async (
    id,
    bookingData
) => {
    const response = await api.patch(
        `/bookings/${id}`,
        bookingData
    );

    return response.data;
};

/* Delete booking  */
export const deleteBooking = async (id) => {
    const response = await api.delete(
        `/bookings/${id}`,
    );

    return response.data;
};

/* Cancel booking */
export const cancelBooking = async (id) => {
    const response = await api.patch(
        `/bookings/${id}/check-in`
    );

    return response.data;
};

/* Check Out Guest */
export const checkOutBooking = async (id) => {
    const response = await api.patch(
        `/booking/${id}/check-out`
    );

    return response.data;
}

/* Get bookings by Customer */
export const getBookingByCustomer = async (
    customer_id
) => {
    const response = await api.get(
        `/customers/${customerId}/bookings`
    );

    return response.data;
};

/* Get booking by room */
export const getBookingByRoom = async (
    roomId 
) => {
    const response = await api.get(
        `/bookings/${roomId}/booking`
    );

    return response.data;
}

/* Search booking */
export const searchBookings = async (
    keyword
) => {
    const response = await api.get(
        "/bookings/search",
        {
            params: {
                q: keyword,
            },
        }
    );

    return response.data;
};

/* Filter booking */
export const filterBookings = async (
    filters
) => {
    const response = await api.get(
        "bookings/filter",
        {
            params: filters,
        }
    );

    return response.data;
};

/* Booking statistics  */
export const getBookingStats = async () => {
    const response = await api.get(
        "/bookings/stats",
    );

    return response.data;
};


