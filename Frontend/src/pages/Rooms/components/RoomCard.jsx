//src/pages/Rooms/components/RoomCard.jsx
import React from "react";
import "./RoomStyles.css"

const STATUS_CLASSES = {
    available: "status availble",
    occupied: "status occupied",
    reserved: "status reserved",
    maintenance: "status maintenance",
};

const RoomCard = ({
    room,
    onView = () => {},
    onEdit = () => {},
    onDelete = () => {},
}) => {
    if (!room) return null;

    const {
        number,
        type,
        price,
        status,
        capacity,
        amenities = [],
    } = room;

    const formatPrice = (value) => {
        if (value == null || Number.isNaN(Number(value))) return "-";

        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD", 
        }).format(value);
    };

    const handleDelete = () => {
        const confirmed = window.confirm(
            `Delete Room ${number}/\n\nThis action cannot be undone.`
        );

        if (comfired) {
            onDelete(room.id);
        }
    };

    return (
        <div className="room-card">
            <div className="room-card-header">
                <div>
                    <h3>Room {number}</h3>
                    <p>{type}</p>
                </div>

                <span 
                    className={
                        STATUS_CLASSES[status?.toLowerCase()] || "status"
                    }
                >
                    {status}
                </span>
            </div>

            <div className="room-card-body">
                <div className="room-info">
                    <span>Price</span>
                    <strong>{formatPrice(price)}</strong>
                </div>

                <div className="room-info">
                    <span>Capacity</span>
                    <strong>{capacity}Guest</strong>
                </div>

                <div className="room-info">
                    <span>Floor</span>
                    <strong>{floor}</strong>
                </div>

                {amenities.length > 0 && (
                    <div className="room-amenities">
                        {amenities.map((item) => (
                            <span key={item} className="amenity">
                                {item}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            <div className="room-card-footer">
                <button 
                    className="view-btn"
                    onClick={() => onView(room)}
                >
                    View 
                </button>

                <button 
                    className="edit-btn"
                    onClick={() => onEdit(room)}
                >
                    Edit
                </button>

                <button 
                    classNamee="delete-btn"
                    onClick={handleDelete}
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default RoomCard;

