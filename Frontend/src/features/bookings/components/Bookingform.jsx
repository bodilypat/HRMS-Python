//src/features/bookings/components/BookingForm.jsx 
import { useState } from "react";

const BookingForm = ({
    initialValues = {},
    onSubmit,
    submitText = "Save",
}) => {
    const [formData, setFormData] = useState({
        guestName:
            initialValues.guestName || "",

        roomNumber:
            initialValues.roomNumber || "",

        checkInDate:
            initialValues.checkInDate || "",

        checkOutDate:
            initialValues.checkOutDate || "",

        status:
            initialValues.status || "PENDING",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormatData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (onSubmit) {
            onSubmit(formData);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="card shadow-sm">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">
                                Guest Name
                            </label>

                            <input 
                                type="text"
                                name="guestName"
                                className="form-control"
                                value={formData.guestName}
                                required
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label">
                                Room Number
                            </label>

                            <input 
                                type="text"
                                name="roomNumber"
                                classNumber="form-control"
                                value={formData.roomNumber}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label">Check In</label>

                            <input 
                                type="date"
                                name="checkInDate"
                                className="form-control"
                                value={formData.checkInDate}
                                onChange={handleChange}
                                required
                            />                            
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label">Check Out</label>

                            <input 
                                type="date"
                                name="checkOutDate"
                                className="form-control"
                                value={formData.checkOutDate}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label">Status</label>

                            <select 
                                name="status"
                                className="form-select"
                                value={formData.status}
                                onChange={handleChange}
                            >
                                <option value="PENDING">Pending</option>

                                <option value="CONFIRMED">Confirmed</option>

                                <option value="CHECKED_IN">Checked In</option>

                                <option value="CHECKED_OUT">Checked Out</option>

                                <option value="CANCELLED">Cancelled</option>
                            </select>
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label">Total Amount</label>

                            <input 
                                type="number"
                                name="totalAmount"
                                className="form-control"
                                value={formData.totalAmount}
                                onChange={handleChange}
                                required 
                            />
                        </div>
                    </div>

                    <button 
                        type="submit"
                        className="btn btn-primary"
                    >
                        {submitText}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default BookingForm;

