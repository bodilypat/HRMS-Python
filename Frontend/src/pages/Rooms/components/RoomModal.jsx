//src/pages/Rooms/components/RoomModal.jsx 
import React, { useEffect} from "react";
import "./RoomStyles.css";

const RoomModal = ({
    isOpen = false,
    made = "add", // add / edit / view 
    room = null,
    onClose = () => {},
    onSave = () => {},
}) => {
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "auto";
        };
    }, [isOpen, onClose]);

    if(!isOpen) return null;

    const titles = {
        add: "Add New, Room",
        edit: "Edit Room",
        view: "Room Detials",
    };

    const handleOverlayClick = (e) => {
        if(e.target.classList.contains("room-modal-overlay")) {
            onClose();
        }
    };

    return (
        <div
            className="roo-modal-overlay"
            onClick={handleOverlayClick}
        >
            <div 
                className="room-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="room-modal-title"
            >
                <div className="room-modal-header">
                    <h2 id="room-modal-title">
                        {title[made]}
                    </h2>

                    <button     
                        className="close-btn"
                        onClick={onClose}
                        aria-label="Close"
                    >
                        x
                    </button>
                </div>

                <div className="room-modal-body">
                    {mode === "view" ? (
                        <RoomDetails room={room} />
                    ) : (
                        <RoomForm
                            room={room}
                            onSubmit={onSubmit}
                            onCancel={onClose}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

const RoomDetails = ({room}) => {
    if(!room) return null;


    return (
        <div className="room-details">
            
            <div className="detail-row">
                <span>Room Number</span>
                <strong>{room.number}</strong>
            </div>

            <div className="detail-row">
                <span>Room Number</span>
                <strong>{room.number}</strong>
            </div>

            <div className="detail-row">
                <span>Price</span>
                <strong>${Number(room.price).toLocaleString()}
                    /night
                </strong>
            </div>

            <div className="detail-row">
                <span>Capacity</span>
                <strong>{room.capacity} Guests</strong>
            </div>

            <div className="detail-row">
                <span>Floor</span>
                <strong>{room.floor}</strong>
            </div>

            {room.description && (
                <div className="detail-column">
                    <span>Description</span>
                    <p>{room.description}</p>
                </div>
            )}

            {room.amenities?.length > 0 && (
                <div className="detail-column">
                    <span>Amenities</span>

                    <div className="amenities">
                        {room.amenities.map((item) => (
                            <span 
                                key={item}
                                className="amenity"
                            >
                                {item}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default RoomModal;

