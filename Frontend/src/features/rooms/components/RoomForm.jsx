//src/features/rooms/components/RoomForm.jsx 
import { useState } from "react";

function RoomForm({ onSubmit }) {
    const [formData, setFormData] = useState({
        roomNumber: "",
        type: "",
        price: "",
        status: "AVAILABLE",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                name="roomNumber"
                placeholder="Room Number"
                value={formData.roomNumber}
                onChange={handleChange}
            />

            <input 
                name="type"
                placeholder="Room Type"
                value={formData.type}
                onChange={handleChange}
            />

            <select 
                name="status"
                value={formData.status}
                oChange={handleChange}
            >
                <option value="AVAILABLE">Available</option>
                <option value="OCCUPIED">Occupied</option>
                <option value="MAINTENANCE">Maintenance</option>
            </select>

            <button type="submit">Save Room</button>
        </form>
    );
}

export default RoomForm;

