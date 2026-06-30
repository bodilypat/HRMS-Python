//src/pages/Rooms/components/EmptyRooms.jsx 
import React from "react";
import "./RoomStyles.css";

const EmptyRooms = ({
    title ="No Rooms found",
    message = "There are currently no rooms available add a new room or adjust search/filter criteria.",
    buttonText = "Add Room",
    onAddRoom,
}) => {
    return (
        <div className="empty-rooms">
            <div className="empty-room-icon"></div>

            <h2 className="empty-rooms-title">{title}</h2>

            <p className="empty-rooms-message">{message}</p>

            {onAddRoom && (
                <button 
                    className="empty-rooms-button"
                    onclick={onAddRoom}
                >
                    {buttonText}
                </button>
            )}
        </div>
    );
};

export default EmptyRooms;

