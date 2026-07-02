//src/pages/Bookings/components/BookingCard.jsx 
import React from "react";
import "/BookingStyles.css";
import BookingStatusBadge from "./BookingStatusBadge";
import BookingActions from "./BookingActions";

const BookingCard = ({
    booking,
    onView,
    onEdit,
    onDelete,
    onCheckIn,
    onCheckOut,
}) => {
    if (!booking) return null;

    const {
        id, 
        guestName,
        email,
        phone,
        roomNumber,
        roomType,
        checkIn,
        checkOut,
        guests,
        totalAmount,
        paymentStatus,
        bookingStatus,
    } = booking;

    return (
        <div className="booking-card">

            {/* Card Header */}
            <div className="booking-card-header">
                <div>
                    <h3 className="booking-card-title">{guestName}</h3>
                    <p className="booking-card-id">Booking #</p>
                </div>
            </div>

            <BookingStatusBadge status={bookingStatus} />

            {/* Card Body */}
            <div className="booking-card-body">
                <div className="booking-card-row">
                    <span>Email</span>
                    <strong>{email || "-"}</strong>
                </div>

                <div className="booking-card-room">
                    <span>Phone</span>
                    <strong>{phone}</strong>
                </div>

                <div className="booking-card-row">
                    <span>Room</span>
                    <strong>{roomNumber} ({roomType})</strong>
                </div>

                <div className="booking-card-row">
                    <span>Check-In</span>
                    <strong>{checkIn}</strong>
                </div>

                <div className="booking-card-row">
                    <span>Check-Out</span>
                    <strong>{checkOut}</strong>
                </div>

                <div className="booking-card-row">
                    <span>Guest</span>
                    <strong>{guests}</strong>
                </div>

                <div className="booking-card-row">
                    <span>Payment</span>
                    <span   
                        className={`payment-status ${(
                            paymentStatus || ""
                        ).toLowercase()}`}
                    >
                        {paymentStatus}
                    </span>
                </div>

                <div className="booking-card-row">
                    <span>Total</span>
                    <strong>
                        ${Number(totalAmount || 0).toLocaleString()}
                    </strong>
                </div>
            </div>

            {/* Card Footer */}
            <div className="booking-card-footer">
                <BookingActions 
                    booking={booking}
                    onView={onView}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onCheckIn={onCheckIn}
                    onCheckOut={onCheckOut}
                />
            </div>
        </div>
    );
};

export default BookingCard;


