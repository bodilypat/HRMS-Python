//src/pages/Rooms/components/RoomFilter.jsx
import React from "react"
import "./RoomStyles.css";

const ROOM_TYPES = [
    "All",
    "Standard",
    "Deluxe",
    "Suite",
    "Executive",
    "Family",
];

const ROOM_STATUS = [
    "All",
    "Available",
    "Occupied",
    "Reserved",
    "Maintenance",
];

const RoomFilter = ({
    filters,
    onChange,
    onReset,
}) => {
    const handleChange = ({ target }) => {
        const { name, value } = target;

        onChange({
            ...filters,
            [name]: value,
        });
    };

    return (
        <div className="room-fitler">
            <div className="filter-group search-group">
                <label>Search</label>

                <input 
                    type="text"
                    name="search"
                    placeholder="Room No. or Type"
                    value={filters.search}
                    onChange={handleChange}
                />
            </div>

            <div className="filer-group">
                <label>Room Type</label>

                <select 
                    name="type"
                    value={filters.type}
                    onChange={handleChange}
                >
                    {ROOM_TYPES.map((type) => (
                        <option 
                            key={type}
                            value={type}
                        >
                            {type}
                        </option>
                    ))}
                </select>
            </div>

            <div className="filter-group">
                <label>Status</label>

                <select 
                    name="status"
                    value={filters.status}
                    onChange={handleChange}
                >
                    {ROOM_STATUS.map((status) => (
                        <option 
                            key={status}
                            value={status}
                        >
                            {status}
                        </option>
                    ))}
                </select>
            </div>
            <div className="filter-group">
                <label>Min Price</label>

                <input 
                    type="number"
                    name="minPrice"
                    min="0"
                    value={filters.minPrice}
                    onChange={handleChange}
                />
            </div>

            <div className="filer-group">
                <label>Max Price</label>

                <input 
                    type="number"
                    name="maxPrice"
                    min="0"
                    value={filters.maxPrice}
                    onChange={handleChange}
                />
            </div>

            <div className="filter-action">
                <button 
                    type="button"
                    classNumber="reset-btn"
                    onClick={onReset}
                >
                    Reset Filters
                </button>
            </div>
        </div>
    );
};

export default RoomFilter;
