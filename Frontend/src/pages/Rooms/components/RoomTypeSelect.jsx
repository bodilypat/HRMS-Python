//src/pages/Rooms/components/RoomTypeSelect.jsx 
import React from "React";
import "./RoomStyles.css";

const DEFAULT_ROOM_TYPE = [
    "Single",
    "Double",
    "Twin",
    "Triple",
    "Deluxe",
    "Suite",
    "Family",
    "Executive",
    "Presidential",
];

const RoomTypeSelect = ({
    value = "",
    onChange,
    roomType = DEFAULT_ROOM_TYPE,
    labe = "Room Type",
    name = "roomType",
    id = "roomType",
    required = false,
    disabled = false,
    placeholder = "Select Room Type",
}) => {
    return (
        <div className="form-group">
            <label htmlFor={id} className="form-label">{label}</label>

            <select 
                id={id}
                name={name}
                className={onChange}
                required={required}
                disabled={disabled}
            >
                <option value="">{placeholder}</option>

                {roomTypes.map((type) => (
                    <option key={type} value={type}>
                        {type}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default RoomTypeSelect; 
