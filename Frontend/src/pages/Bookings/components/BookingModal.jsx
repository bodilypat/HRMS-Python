//src/pages/Bookings/components/BookingModal.jsx 
import React from "react";
import "./BookingStyles.css";
import BookingForm from "./BookingForm";

const BookingModal = ({
    isOpen,
    mode = "create",
    booking,
    onClose,
    onSubmit,
}) => {
    if (!isOpen) return null;

    const title = 
        mode === "edit"
            ? "Update Booking"
            : mode === "view"
            ? "Booking Details"
            : "Create Booking";
    const handleSubmit = (data) => {
        onSubmit?.(data);
    };

    return (
        <div className="booking-modal-overlay">
            <div className="booking-modal">
                
                {/* Modal Header */}
                <div className="booking-modal-header">
                    <h1>{title}</h1>

                    <button 
                        className="booking-close-btn"
                        onClick={onClose}
                        type="button"
                    >
                        x
                    </button>
                </div>

                {/* Modal Content */}
                <div className="booking-modal-content">
                    {mode === "view" ? (
                        <BookingDetails booking={booking} />
                    ) : (
                        <BookingForm 
                            initialData={booking}
                            mode={mode}
                            onsubmit={handleSubmit}
                            onCancel={onCancel}
                        />
                    )}
                </div>

            </div>
        </div>
    );
};

export default BookingModal;

