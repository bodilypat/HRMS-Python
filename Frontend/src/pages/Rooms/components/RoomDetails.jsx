//src/pages/Rooms/components/RoomDetails.jsx 
import React from "react";
import "./RoomStyles.css"

const RoomDetails = ({ room }) => {
    if (!room) {
        return (
            <div className="room-details empty">
                <p>no room selected.</p>
            </div>
        );
    }

    const {
        roomNumber,
        roomType,
        floor,
        capacity,
        bedType,
        price,
        amenities = [],
        description,
    } = room;

    return (
        <div className="room-details">
            <h2 className="room-details-title">Room roomNumber</h2>

            <div className="room-details-grid">
                <div className="detail-item">
                    <span className="label">Room Number</span>
                    <span>{roomNumber}</span>
                </div>

                <div className="detail-item">
                    <span className="label">Room Type</span>
                    <span>{roomType}</span>
                </div>

                <div className="detail-item">
                    <span className="label">Floor</span>
                    <span>{floor}</span>
                </div>

                <div className="detail-item">
                    <span className="label">Capacity</span>
                    <span>{capacity} Guests</span>
                </div>

                <div className="detail-item">
                    <span className="label">Bed Type</span>
                    <span>{bedType}</span>
                </div>

                <div className="detail-item">
                    <span className="label">Price / Night</span>
                    <span>${price}</span>
                </div>

                <div className="detail-item">
                    <span className="label">Status</span>
                    <span 
                        className={`status status-${status?.toLowerCase()}`}
                    >
                        {status}
                    </span>
                </div>
            </div>

            <div className="room-section">
                <h3>Amenities</h3>

                {amenities.length > 0 ? (
                    <ul className="amenities-list">
                        {amenities.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No Amenities available</p>
                )}
            </div>

            <div className="room-section">
                <h3>Description</h3>
                <p>{discription || "No description available."}</p>
            </div>
        </div>
    );
};

export default RoomDetails;


