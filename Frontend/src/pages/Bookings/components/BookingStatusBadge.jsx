//src/pages/Bookings/components/BookingStatusBadge.jsx 
import React from "react";
import "./BookingStyles.css";

const STATUS_MAP = {
    Confirmed: {
        className: "confirmed",
        label: "Confirmed",
    },
    Pending: {
        className: "pending",
        label: "Pending",
    },
    "Checked In": {
        className: "checked in",
        label: "Checked In",
    },
    "Check Out": {
        className: "checked out",
        label: "Check Out",
    },
    Cancelled: {
        className: "cancelled",
        label: "Cancelled",
    },
    Reserved: {
        className: "reserved",
        label: "Reserved",
    },
};

const BookingStausBadge = ({ status }) => {
    const badge =   
        STATUS_MAP[status] || {
            className: "default",
            label: status || "Unknow",
    };

    return (
        <span className={`booking-status ${badge.className}`}>
            {badge.label}
        </span>
    );
};

export default BookingStatusBadge;

