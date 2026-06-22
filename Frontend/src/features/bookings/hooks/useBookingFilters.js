//src/features/bookings/hooks/useBookingFilters.js

import { useMemo, useState } from "react";

export const useBookingFilters = (
    bookings = []
) => {
    const [filters, setFilters] = 
        useState({
            search: "",
            status: "",
            checkInDate: "",
        });
    
    const updateFilter = (
        field,
        value
    ) => {
        setFilters((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const clearFilters = () => {
        setFilters({
            search: "",
            status: "",
            checkInDate: "",
        });
    };

    const filteredBookings = 
        useMemo(() => {
            return bookings.filter(
                (booking) => {
                    const matchesSearch = 
                        !filters.search || booking.guestName 
                            ?.toLowerCase()
                            .includes(
                                filters.search.toLowerCase()
                            );
                    
                    const matchsStatus = 
                        !filters.status || booking.status === filters.status ;

                    const matchesDate = 
                        !filters.checkInDate || booking.checkInDate === filters.checkInDate;

                    return (
                        matchesSearch &&
                        matchesStatus &&
                        matchesDate 
                    );
                }
            );
        }, [bookings, filters]);

    return {
        filters,
        filteredBookings,
        updateFilter,
        clearFilter,
    };
};
