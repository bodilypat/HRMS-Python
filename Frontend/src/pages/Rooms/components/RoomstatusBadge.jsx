//src/pages/Rooms/components/RoomStatusBadge.jsx 
import React from "react";
import "./RoomStyles.css";

const STATUS_CONFIG = {
    available: {
        label: "Available",
        className: "available",
        icon: "",
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

const RoomStatusBadge = ({
    status = "",
    showIcon = true,
    size = "md", // sm / md/ lg
}) => {
    const key = status.toLowerCase();

    const config = STATUS_CONFIG[key] || {
        label: status || "Unknow",
        className: "delete",
        icon: "",
    };

    return (
        <span 
            className={`room-status-badge ${config.className} ${size}`}
            title={config.label}
        >
            {showIcon && (
                <span className="status-icon">
                    {config.icon}
                </span>
            )}

            <span>{config.label}</span>
        </span>
    );
};

export default RoomStatusBadge;

