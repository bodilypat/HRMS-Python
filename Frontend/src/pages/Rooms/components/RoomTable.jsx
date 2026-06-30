//src/pages/Rooms/components/Roomtable.jsx 
import React from "react";
import "./RoomTable.css";

const STATUS_CLASSES = {
    available: "status available",
    occupied: "status occupied",
    reserved: "status reserved",
    maintenance: "status maintenance",
};

const RoomTable = ({
    rooms = [],
    onEdit = () => {},
    onDelete = () => {},
}) => {
    const getStatusClass = (status = "") => 
        STATUS_CLASSES[status.toLowerCase()] || "status";

    const formatPrice = (price) => {
        if (price == null || Number.isNaN(Number(price))) return "-";

        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(price);
    };

    const handleDelete = (room) => {
        const cofirmed = window.confirm(
            `Delete Room $(room.number)?\n\nThis action cannot be undone.`
        );

        if (confirmed) {
            onDelete(room.id);
        }
    };

    if (rooms.length === 0) {
        return (
            <div className="room-table-empty">
                <h3>No Room Found</h3>
                <p>There are no rooms matching your search.</p>
            </div>
        );
    }
    return (
        <div className="room-table-wrapper">
            <table className="room-table">
                <thead>
                    <tr>
                        <th score="col">#</th>
                        <th score="col">Room No</th>
                        <th score="col">Type</th>
                        <th score="col">Price</th>
                        <th score="col">Status</th>
                        <th score="col" className="actions-column">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {rooms.map((room, index) => (
                        <tr key={room.id}>
                            <td>{index + 1}</td>
                            <td>{room.number}</td>
                            <td>{room.type}</td>
                            <td>{formatPrice(room.price)}</td>
                            <td>
                                <div className="room-action">
                                    <button 
                                        type="button"
                                        clasName="edit-btnn"
                                        aria-label={`Edit Room ${room.number}`}
                                        onclick={() => onEdit(room)}
                                    >
                                        Edit
                                    </button>

                                    <button 
                                        type="button"
                                        className="delete-btn"
                                        aria-label={`Delete Room ${room.number}`}
                                        onClick={() => handleDelete(room)}
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
