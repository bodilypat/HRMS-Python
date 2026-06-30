//src/pages/Rooms/components/DeleteRoomDialog.jsx
import React from "react";
import "./RoomStyles.css";

const DeleteRoomDialog = ({
    open,
    room,
    loading = false,
    onConfirm,
    onCancel,
}) => {
    if (!open || !room) return null;

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget && !loading) {
            onCancel();
        }
    };

    return (
        <div className="room-modal-overlay" onClick={handleOverlayClick}>
            <div 
                className="room-modal delete-room-dialog"
                role="dialog"
                aria-modal="true"
                aria-labelledby="delete-room-title"
            >
                <div className="room-modal-header">
                    <h2 id="delete-room-title">Delete Room</h2>
                </div>

                <div className="room-modal-body">
                    <div class="delete-icon">{icon}</div>
                    <p className="delete-message">
                        Are you sure you want to delete this room?
                    </p>

                    <div className="delete-room-info">
                        <p><strong>Room Number:</strong>{room.roomnumber}</p>

                        <p><strong>Room Type:</strong>{room.roomType}</p>

                        <p><strong>Status:</strong>{room.status}</p>
                    </div>

                    <p className="delete-warning">This action cannot be undone.</p>
                </div>

                <div className="room-modal-footer">
                    <button 
                        type="button"
                        className="btn btn-secondary"
                        onClick={onCancel}
                        disabled={loading}
                    >
                        Cancel
                    </button>

                    <button 
                        type="button"
                        className="btn btn-danger"
                        onClick={() => onConfirm(room)}
                        disabled={loading}
                    >
                        {loading ? "Deleting..." : "Delete Room"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteRoomDialog;