//src/features/rooms/components/RoomCard.jsx 

import React from "react";

const statusColors = {
    AVAILABLE: "#22c55e",
    OCCUPIED: "#ef4444",
    MAINTENANCE: "#f59e0b",
    RESERVED: "#3B82F6"
};

function RoomCard({ room, onEdit, onDelete, onView }) {
    const {
        roomNumber,
        type,
        price,
        status,
        capacity,
        floor,
        image,
    } = room;

    return (
        <div className="room-card">
            <div className="room-card-image">
                <img 
                    src={
                        image ||
                        "https://paradise-psb.com/assets/images/"
                    }
                    alt={`Room ${roomNumber}`}
                />
            </div>

            <div className="room-card-content">
                <div className="room-card-header">
                    <h3>Room {roomNumber}</h3>

                    <span 
                        className="room-card-status"
                        style={{
                            backgroundColor: statusColors[status] || "#6b7280",
                        }}
                    >
                        {status}
                    </span>
                </div>

                <div className="room-card-details">

                    <p><strong>Type:</strong>{type}</p>
                    
                    <p><strong>Price:</strong>${price}/night</p>

                    <p><strong>Capacity:</strong>{capacity || "N/A"} Gusets</p>

                    <p><strong>Floor:</strong>{floor || "N/A"}</p>
                </div>

                <div className="room-card-actons">
                    {onView && (
                        <button 
                            className="btn btn-primary"
                            onClick={() => onView(room)}
                        >
                            view
                        </button>
                    )}
                      
                    {onEdit && (
                        <button 
                            className="btn btn-warning"
                            onClick={() => onEdit(room)}
                        >
                            Edit 
                        </button>
                    )}

                    {onDelete && (
                        <button 
                            className="btn btn-danger"
                            onClick={() => onDelete(room.id)}
                        >
                            Delete
                        </button>
                    )}
                </div>
            </div>

            <style jsx>{`
                .room-card {
                    background: #fff;
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow: 0  2px 10px rgba(0, 0, 0, 0.08);
                    transition: transform 0.2s ease;
                }
                
                .room-card:hover {
                    transform: translateY(-4px);
                }

                .room-card-image img {
                    width: 100%;
                    height: 220px;
                    object-fit: cover;
                }

                room-card-content {
                    padding: 1rem;
                }

                .room-card-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    morgin-bottom: 1rem;
                }

                .room-card-status {
                    color: white;
                    padding: 4px 10px;
                    border-radius: 20px;
                    font-size: 0.75rem;
                    font-weight: 600;
                }

                .room-card-details p {
                    margin: 0.5rem 0;
                    color: #374151;
                }
                
                .room-card-actions {
                    display: flex;
                    gap: 0.5rem;
                    margin-top: 1rem 
                }

                .btn {
                    border: none;
                    padding: 0.6rem 1rem;
                    border-radius: 6px;
                    curser: pointer;
                    font-weight: 500;
                }

                .btn-warning {
                    background: #dc2626};
                    color: white;
                }
            `}</style>
        </div>
    );
}

export default RoomCard;

