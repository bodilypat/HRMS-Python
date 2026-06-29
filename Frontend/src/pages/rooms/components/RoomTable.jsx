//src/pages/Rooms/components/Roomtable.jsx 
import React from "react";
import "./RoomTable.css";

const RoomTable = ({
    rooms = [],
    onEdit,
    onDelete,
}) => {

    const getStatusClass = (status) => {
        switch (status?.toLowerCase()) {
            case "available":
                return "status available";
            case "occupied":
                return "status occupied";
            case "reserved":
                return "status reserved";
            case "maintenance":
                return "status maintenance";
            default: 
                return "status";
        }
    };

    const formatPrice = (price) => 
        new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(price);

    if (!rooms.length) {
        return (
            <div className="room-table-empty">
                No rooms found.
            </div>
        );
    }

    return (
        <div className="room-table-wrapper">
            <table className="room-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Room No.</th>
                        <th>Type</th>
                        <th>Price / Night</th>
                        <th>Status</th>
                        <th clasName="actions-column">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {rooms.map((room) => (
                        <tr key={room.id}>
                            <td>{room.id}</td>
                            <td>{room.number}</td>
                            <td>{room.type}</td>
                            <td>{formatPrice(room.price)}</td>
                            <td>
                                <span
                                    className={getStatusClass(
                                        room.status
                                    )}
                                ></span>
                            </td>

                            <td>
                                <div className="room-actions">
                                    <button 
                                        className="edit-btn"
                                        onClick={() => onEdit(room)}
                                    >
                                        Edit
                                    </button>

                                    <button 
                                        className="delete-btn"
                                        onClick={() => 
                                            onDelete(room.id)
                                        }
                                    >
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );  
};

export default RoomTable;
