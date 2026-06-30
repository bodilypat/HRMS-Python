//src/pages/Rooms/components/RoomForm.jsx 
import React, { useEffect, useState } from "react";
import "./RoomStype.css"

const initialForm = {
    number: "",
    type: "Standard",
    price: "",
    floor: 1,
    status: "Available",
    amenities: [],
    description: "",
};

const AMENITIES = [
    "Wi-Fi",
    "Air Conditioning",
    "TV",
    "Mini Bar",
    "Balcony",
    "Sea View",
    "Breakfast",
    "Parking",
];

const ROOM_TYPE = [
    "Standardd",
    "Deluxe",
    "Suite",
    "Executive",
    "Family",
];

const ROOM_STATUS = [
    "Available",
    "Occupied",
    "Reserved",
    "Maintenance"
];
 const RoomForm = ({
    room = [],
    onSumbit = () => {},
    onCancel = () => {},
 }) => {
    const [formData, setFormData] = useState(initialForm);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (room) {
            setFormData({
                ...initialForm,
                ...room,
            });
        } else {
            setFormData(initialForm);
        }
    }, [room]);

    const handleChange = ({ target }) => {
        const { name, value } = target;

        setFormData((prev) => ({
            ...prev,
            [name]:
                name === "price" || 
                name === "capacity" || 
                name === "floor"
                    ? Number(value)
                    : value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }))
    };

    const handleAmenityChange = (amenity) => {
        setFormData((prev) => ({
            ...prev,
            amenities: prev.amenities.include(amenity)
                ? prev.amenities.filter((item) => item !== amenity)
                : [...prev.amenities, amenity],
        }));
    };

    const validate = () => {
        const validationErrors = {};

        if (!formData.number.trim()) {
            validationErrors.number = "Room number is required.";
        }

        if (!formData.price || formData.price <= 0) {
            validationErrors.price = "Enter a valid price";
        }

        if (!formData.capacity || formData.capacity < 1){
            validationErrors.floor = "Floor is required";
        }

        setErrors(validationErrors);

        return Object.keys(validationErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validate()) return;

        onSubmit(formData);
    };

    return (
        <form className="room-form" onSubmit={handleSubmit}>
            <div className="form-grid">

                <div className="form-group">
                    <label>Room Number</label>

                    <input
                        type="text"
                        name="number"
                        value={formData.number}
                        onChange={handleChange}
                    />
                    {errors.number && (
                        <small>{errors.number}</small>
                    )}
                </div>

                <div className="form-group">
                    <label>Room Type</label>

                    <select 
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                    >
                    {ROOM_TYPE.map((type) => (
                        <option key={type}>
                            {type}
                        </option>
                    ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>Price / Night</label>

                    <input 
                        type="number"
                        name="price"
                        min="0"
                        value={formData.price}
                        onChange={handleChange}
                    />
                    {errors.price && (
                        <small>{errors.price}</small>
                    )}
                </div>

                <div className="form-group">
                    <label>Capacity</label>

                    <input 
                        type="number"
                        name="capacity"
                        min="1"
                        value={formData.capacity}
                        onChange={handleChange}
                    />

                    {errors.capacity && (
                        <small>{errors.capacity}</small>
                    )}
                </div>

                <div className="form-group">
                    <label>Floor</label>

                    <input 
                        type="number"
                        name="floor"
                        value={formData.floor}
                        onChange={handleChange}
                    />
                    {errors.floor && (
                        <small>{error.floor}</small>
                    )}
                </div>

                <div className="form-group">
                    <label>Status</label>

                    <select 
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                    >
                    {ROOM_STATUS.map((status) => (
                        <option key={statu}>
                            {status}
                        </option>
                    ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>Description</label>

                    <textarea 
                        rows="4"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Amenities</label>

                    <div className="amenities-grid">
                        {AMENITIES.map((amenity) => (
                            <label 
                                key={amenity}
                                className="checkbox-item"
                            >
                                <input 
                                    type="checkbox"
                                    checked={formData.amenities.include(
                                        amenity
                                    )}
                                    onChange={() => 
                                        handleAmenityChange(amenity)
                                    }
                                />
                                {amenity}
                            </label>
                        ))}
                    </div>
                </div>

                <div className="form-actions">
                    <button 
                        type="button"
                        className="cancel-btn"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>

                    <button 
                        type="submit"
                        className="save-btn"
                    >
                        {room ? "Update Room" : "Add Room"}
                    </button>
                </div>
            </div>
        </form>
    );
 };

 export default RoomForm;

 