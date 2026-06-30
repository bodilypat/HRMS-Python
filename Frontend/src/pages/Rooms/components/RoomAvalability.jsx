//src/pages/Rooms/components/RoomAvailability.jsx 
import React from "react";
import "./RoomStyles.css";

const RoomAvailability = ({
    status = "Availability",
    checkIn = null,
    checkOut = null,
    nextAvailable = null,
    occupancy = 0,
}) => {
    const statusMap = {
        available: {
            label: "Available",
            className: "available",
            incon: "",
        },
        occupied: {
            label: "Occupied",
            className: "occupied",
            icon: "",
        },
        reserved: {
            label: "Reserved",
            className: "reserved",
            icon: "",
        },
        maintenance: {
            label: "Maintenance",
            className: "maintenance",
            icon: "",
        },
        cleaning: {
            label: "Cleaning",
            className: "cleaning",
            icon: "",
        },
    };

    const current = 
        statusMap[status.toLowerCase()] || {
            label: status,
            classname: "default",
            icon: "",
        };

        const formatDate = (date) => {
            if(!date) return "-";

            return new Date(date).toLocaleDateString("en-US", {
                day: "2-digit",
                month: "short",
                year: "numeric",
            });
        };

        return (
            <div className="room-availability">
                <div className={`availability-status ${current.className}`}>
                    <span className="status-icon">
                        {current.ion}
                    </span>

                    <div>
                        <h4>{current.label}</h4>

                        {nextAvailable && ( 
                            <small>Avaiable on {formatDate(nextAvailable)}</small>
                        )}
                    </div>
                </div>

                <div className="availability-details">

                    <div className="detail">
                        <span>Check In</span>
                        <strong>{formatDate(checkIn)}</strong>
                    </div>

                    <div className="detail">
                        <span>Check Out</span>
                        <strong>{formatDate(checkOut)}</strong>
                    </div>

                    <div className="detail">
                        <span>Occupancy</span>
                        <strong>{occupancy}&</strong>
                    </div>
                </div>

                <div className="process-bar">
                    <div 
                        className="process-fill"
                        style={{
                            width: `${occupancy}%`,
                        }}
                    />
                </div>
            </div>
        );
};

export default RoomAvailability;

