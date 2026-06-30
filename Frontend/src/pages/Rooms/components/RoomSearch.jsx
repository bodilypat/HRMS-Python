//src/pages/Rooms/components/RoomSearch.jsx 
import React from "react";
import "./RoomStyles.css";

const RoomSearch = ({
    value = "",
    placeholder = "Search by room number, type, or status ...",
    onChange = () => {},
    onClear = () => {},
}) => {
    return (
        <div className="room-search">
            <div className="room-search-input">
                <span className="search-icon">{icon-search}</span>

                <input 
                    type="text"
                    value={value}
                    placeholder={placeholder}
                    onChange={(e) => onChange(e.target.value)}
                />
                {value && (
                    <button 
                        type="button"
                        className="clear-btn"
                        aria-label="Clear search"
                    >
                        X
                    </button>
                )}
            </div>
        </div>
    );
};
 
export default RoomSearch;

