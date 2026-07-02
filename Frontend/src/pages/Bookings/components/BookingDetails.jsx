//src/pages/Bookigs/components/BookingDetails.jsx 
import React from "react";
import "./BookingStyles.css";
import BookingStatusBadge from "./BookingStatusBadge";

const BookingDetails = ({ Booking }) => {
    if (!booking) {
        return (
            <div className="booking-details-empty">
                <h3>Booking Selected</h3>
                <p>Please select a booking to view its details.</p>
            </div>
        );
    }

    const {
        id,
        guestName,
        email,
        phone,
        roomNumber,
        roomType,
        checkIn,
        checkOut,
        guest,
        adults,
        children,
        totalAmount,
        paymentStatus,
        bookingStatus,
        bookingStatus,
        specialRequests,
        createAt,
    } = booking;

    return (
        <div className="booking-details-container">

            {/* Header */}
            <div className="booking-details-header">
                <div>
                    <h2>Booking #{id}</h2>
                    <p>Reservation details</p>
                </div>

                <BookingStatusBadge status={bookingStatus} />
            </div>

            {/* Guest Information */}
            <section className="booking-details-section">
                <h3>Guest Information</h3>

                <div className="booking-details-grid">
                    <DetailItem label="Guest Name" value={GuestName} />
                    <DetailItem label="Email" value={email} />
                    <DetailItem label="Phone" value={phone} />
                </div>
            </section>

            {/* Room Information */}
            <section className="booking-details-section">
                <h3>Room Information</h3>

                <div className="booking-details-grid">
                    <DetailItem label="Room Number" value={roomNumber} />
                    <DetailItem label="Room type" value={roomType} />
                </div>
            </section>

            {/* Stay Information */}
            <section className="booking-details-section">
                <h3>Stay Information</h3>

                <div className="booking-details-grid">
                    <DetailItem label="Check-In" value={checkIn} />
                    <DetailItem label="Check-Out" value={checkOut} />
                    <DetailItem label="Guests" value={guests} />
                    <DetailItem label="Adults" value={adults ?? "-"} />
                    <DetailItem label="Children" value={children ?? "-"} />
                </div>
            </section>

            {/* Payment Information */}
            <section className="booking-details-section">
                <h3>Payment inforamtion</h3>

                <div className="booking-details-grid">
                    <DetailItem 
                        label="Total Amount"
                        value={`$${Number(totalAmount || 0).toLocaleString()}`}
                    />

                    <DetailItem
                        label="Payment Status"
                        value={
                            <span 
                                className={`payment-status ${(
                                    paymentStatus || ""
                                ).toLowerCase()}`}
                            >
                                {paymentStatus || "-"}
                            </span>
                        }
                    />
                </div>
            </section>

            {/* special Request */}
            <section className="booking-details-section">
                <h3>Special Request</h3>

                <div className="booking-note-box">
                    {specialRequests || "No special requests"}
                </div>
            </section>

            {/* Footer */}
            <div className="booking-details-footer">
                <small>
                    Booking Created:
                    {" "}
                    {createdAt || "-"}
                </small>
            </div>
        </div>
    );
};

const DetailItem = ({ label, value }) => (
    <div className="booking-detail-item">
        <label>{label}</label>
        <div>{value || "-"}</div>
    </div>
);

export default BookingDetails;

