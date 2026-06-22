//src/features/bookings/components/BookingFilters.jsx 
import { useState } from "react";

const BookingFilters = ({ onFilter}) => {
    const [filters, setFilters] = useState({
        guestName: "",
        status: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        const updateFilters = {
            ...filters,
            [name]: value,
        };

        setFilters(updateFilters);

        if (onFilter) {
            onFilter(updatedFilters);
        }
    };

    return (
        <div className="card mb-4">
            <div className="card-body">
                <div className="row">
                    <div className="col-md-6">
                        <input 
                            type="text"
                            name="guestName"
                            placeholder="Search Guest"
                            className="form-control"
                            value={filters.guestName}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="col-md-6">
                        <select 
                            name="status"
                            className="form-select"
                            value={filters.status}
                            onChange={handleChange}
                        >
                            <option value="">All Status</option>
                            <option value="PENDING">Pending</option>
                            <option value="CONFIRMED">Confirmed</option>
                            <option value="CHECKED_IN">Checked In</option>
                            <option value="CHECKED_OUT">Check Out</option>
                            <option value="CANCELLED">Cancelled</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingFilters;

