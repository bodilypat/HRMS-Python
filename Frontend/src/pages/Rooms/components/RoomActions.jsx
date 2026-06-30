//src/pages/Rooms/components/RoomActions.jsx
import React from "react";
import "./RoomStyles.css";

const RoomActions = ({
    room,
    onView,
    onEdit,
    onDelete,
    disableActions = false,
}) =>  {
    return (
        <div className="room-actions">
            <button 
                className="btn btn-view"
                onClick={() => onView(room)}
                disabled={disableActions}
            >
                view
            </button>

            <button 
                className="btn btn-delete"
                onClick={() => onDelete(room)}
                disabled={disableActions}
            >
                Delete
            </button>
        </div>
    );
};

export default RoomActions;

