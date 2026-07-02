//src/pages/Bookings/components/BookingSearch.jsx 
import React, { useEffect, useState } from "react";
import "./BookingStyles.css";

const BookingSearch = ({
    value = "",
    placeholder= "Search by Booking ID, Guest Name, Phone, Room Number...",
    onSearch,
    onClear,
    debounce = 400,
}) => {
    const [searchText, setSearchText] = useState(value);

    useEffect (() => {
        setSearchText(value);
    }, [value]);

    /* Debonce search */
    useEffect(() => {
        const timer = setTimeOut(() => {
            if (onSearch) {
                onSearch(searchText.trim());
            }
        }, debounce);

        return () => clearTimeout(timer);
    }, [searchText, debounce, onSearch]);

    const handleChange = (e) => {
        setSearchText(e.target.value);
    };

    const handleClear  = () => {
        setSearchText("");

        if (onClear) {
            onClear();
        }

        if (onSearch) {
            onSearch("");
        }
    };

    return (
        <div className="booking-search">

            <div className="booking-search-input-wrapper">

                {/* Search Icon */}
                <span className="Booking-search-icon">
                    {SearchIcon}
                </span>

                <input 
                    type="text"
                    className="booking-search-input"
                    value={searchText}
                    onChange={handleChange}
                />

                {searchText && (
                    <button 
                        type="button"
                        className="booing-search-clear"
                        onClick={handleClear}
                        aria-label="Clear search"
                    >
                        X
                    </button>
                )}
            </div>
        </div>
    );
    
};

export default BookingSearch;
