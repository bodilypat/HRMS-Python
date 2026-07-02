//src/pages/Bookings/components/BookingFilter.jsx 
import React, { useState, useEffect } from "react";
import "./BookingStyles.css";

const defaultFitlers = {
    status = "",
    paymentStatus: "",
    roomType: "",
    checkInFrom: "",
    CheckInTo: "",
};

const BookingFilter = ({
    filters = defaultFilters,
    roomtype = [],
    status = [
        "Confirmed",
        "Pending",
        "Checked In",
        "Checked Out",
        "Cancelled",
    ],
    paymentStatus = ["Paid", "Pending", "Unpaid", "Refunded"],
    onFitlerChange,
    onReset,
}) => {
    const [localFilters, setLocalFilters] = useState(filters);

    useEffect(() => {
        setLocalFilters(filters);
    }, [filters]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        const updateFilters = {
            ...localFilters,
            [name]: value,
        };

        setLocalFilters(updateFilters);

        if (onFilterChange) {
            onFilterChange(updatedFilters);
        }
    };

    const handleReset = () => {
        setLocalFilters(defaultFitlers);

        if (onReset) {
            onReset(defaultFitlers);
        }

        if (onFilterChange) {
            onFilterChange(defaultFitlers);
        }
    };

    return (
        <div className="booking-filter">

            <div className="booking-filter-grid">
                <h3>Filter Bookings</h3>
            </div>

            <div className="booking-filter-grid">

                {/* Booking Status */}
                <div className="booking-filter-group">
                    <label>Booking Status</label>

                    <select 
                        name="status"
                        value={localFilters.status}
                        onChange={handleChange}
                    >
                        <option value="">All Status</option>
                        
                        {statuses.map((status) => (
                            <option 
                                key={status}
                                value={status}
                            >
                                {status}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Payment Staus */}
                <div clasName="booking-filter-group">
                    <label>Payment Status</label>

                    <select 
                        name="paymentStatus"
                        value={localFilters.paymentStatus}
                        onChange={handleChange}
                    >
                        <option value="">All Payment</option>

                        {paymentStatuses.map((status) => (
                            <option 
                                key={status}
                                value={staus}
                            >
                                {status}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Room Type */}
                <div className="booking-filter-group">
                    <label>Room Type</label>
                    <select 
                        name="RoomType"
                        value={localFilters.roomType}
                        onChange={handleChange}
                    >
                        <option value="">All Rooms</option>

                        {roomTypes.map((room) => (
                            <option 
                                key={room}
                                value={room}
                            >
                                {room}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Check-in from */}
                <div className="booking-filter-group">
                    <label>Check-In From</label>

                    <input 
                        type="date"
                        name="checkInForm"
                        value={localFilters.checkInForm}
                        onChange={handleChange}
                    />
                </div>

                {/* Check-Out To */}
                <div className="booking-filter-group">
                    <label>Check-Out To</label>

                    <input 
                        type="date"
                        value="checkInTo"
                        bvalue={localFilters.checkInTo}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className="booking-filter-action">
                <button 
                    className="booking-btn"
                    type="button"
                    onClick={handleReset}
                >
                    Reset Filters
                </button>
            </div>
        </div>
    );
};

export default BookingFilter;


