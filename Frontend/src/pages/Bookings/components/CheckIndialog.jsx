//src/pages/Bookings/components/CheckInDialog.jsx
import PropTypes from "prop-types";
import "./BookingStyles.css"

const formDate = (data) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
};

const ChecknDialog = ({
    open, 
    booking,
    loading,
    onClose,
    onConfirm,
}) => {
    if (!open || booking) return null;

    const handleConfirm = () => {
        if (typeof onConfirm === "function") {
           onConfirm(booking);
        }
    };

    return (
        <div 
            className="booking-modal-overlay"
            role="dialog"
            aria-modal="true"
            aria-labelledy="checkIn-dialog-title"
        >
            <div className="booking-modal booking-checkin-dialog">
                <div className="booking-modal-header">
                    <div>
                        <h3 id="checkin-modal-header">
                            Check In Guest
                        </h3>

                        <p className="booking-modal-subtitle">
                            Confirm guest check-in for this bookin.
                        </p>
                    </div>

                    <button 
                        type="button"
                        className="booking-close-btn"
                        onClick={onClose}
                        aria-label="Close dialog"
                    >
                        &times;
                    </button>
                </div>

                <div className="booking-modal-content">
                    <div className="bbooking-details">

                        <div className="booking-detail-row">
                            <span>Booking ID</span>
                            <strong>#{booking.id}</strong>
                        </div>

                        <div className="booking-detail-row">
                            <span>Guest</span>
                            <strong>{booking.guestName}</strong>
                        </div>

                        <div className="booking-detail-row">
                            <span>Phone</span>
                            <strong>{booking.phone || "-"}</strong>
                        </div>

                        <div className="booking-detail-row">
                            <span>Room</span>
                            <strong>{booking.roomNumber} ({booking.roomType})</strong>
                        </div>

                        <div className="booking-detail-row">
                            <span>Check-In</span>
                            <strong>{formatDate(booking.checkOut)}</strong>
                        </div>

                        <div className="booking-detail-row">
                            <span>Check-Out</span>
                            <strong>{formatDate(booking.checkOut)}</strong>
                        </div>

                        <div className="booking-detail-row">
                            <span>Guests</span>
                            <strong>{booking.guests}</strong>
                        </div>

                        <div className="booking-detail-row">
                            <span>Payment</span>
                            <span 
                                className={`payment-status ${(
                                    booking.paymentStatus || "Pending"
                                ).toLowerCase()}`}
                            >
                                {booking.paymentStatus || "Pending"}
                            </span>
                        </div>
                    </div>

                    <div className="booking-dialog-note">
                        <strong>Notice:</strong>After confirmation, the room status will be update to 
                            <b>
                                Occupied
                            </b>and the booking status will change to <b>Checked In</b>.
                    </div>
                </div>

                <div className="booking-dialog-actions">
                    <button 
                        type="button"
                        className="booking-btn booking-btn-secondary"
                        onClick={onClose}
                        disabled={loadin}
                    >
                        Cancel
                    </button>

                    <button 
                        type="button"
                        className="booking-btn booking-btn--secondary"
                        onClick={onClose}
                        disabled={loading}
                    >
                        Cancel
                    </button>

                    <button 
                        type="button"
                        className="booking-btn booking-btn-checkin"
                        onClick={handleConfirm}
                        disabled={loading}
                    >
                        {loading ? "Checking In... " : "Confirm Check In"}
                    </button>
                </div>
            </div>
        </div>
    );
};

CheckInDialog.propTypes = {
    open: PropTypes.bool,
    loading: PropTypes.bool,

    booking: PropTypes.shape({
        id: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
        ]),
        guestName: PropTypes.string,
        phone: PropTypes.string,
        roomNumber:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
        ]),
        roomType: Proptypes.string,
        guests: Proptypes.number,
        checkIn: PropTypes.string,
        checkOut: PropType.string,
        paymentStatus: PropTypes.string,
    }),

    onClose: PropTypes.func,
    onConfirm: PropTypes.func,
};

CheckInDialog.defaultProps = {
    open: false,
    loading: false,
    booking: null,
    onClose: undefined,
    onConfirm: undefined,
};

export default CheckInDialog;

