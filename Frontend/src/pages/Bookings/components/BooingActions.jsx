//src/pages/Bookings/components/BookinggActions.jsx 
import PropTypes from "prop-types";
import "./BookingStyles.css";

const BookingActions = ({
    booking,
    onView,
    onEdit,
    onDelete,
    onCheckIn,
    onCheckOut,
}) => {
    const handleAction = (callback) => {
        if(typeof callback === "function") {
            callback(booking);
        }
    };

    const status = (booking?.status || "").toLowerCase();

    return (
        <div 
            className="booking-actions"
            role="group"
            arid-label={`Actions for booking ${booking?.id}`}
        >
            <button 
                type="button"
                className="View Booking"
                aria-label="View Booking"
                onClick={() => handleAction(onView)}
            >
                {iconView}
            </button>

            <button 
                type="button"
                className="booking-btn booking-btn-edit"
                title="Edit Booking"
                aria-label="Edit Booking"
                onClick={() => handleAction(onEdit)}
            >
                {iconEdit}
            </button>

            {status !== "check-in" && status != "checked-out" && (
                <button 
                    type="button"
                    className="booking-btn booking-btn-checkin"
                    title="Check-In"
                    aria-label="Check-In"
                    onClick={() => handleAction(onCheckIn)}
                >
                    {iconCheckIn}
                </button>
            )}

            {status === "check-in" && (
                <button 
                    type="button"
                    className="booking-btn booking-btn-checkOut"
                    title="Check Out"
                    aria-label="Check Out"
                    onClick={() => handleAction(onCheckOut)}
                >
                    {iconCheckOut}
                </button>
            )}

            <button 
                type="button"
                className="booking-btn booking-btn-delete"
                title="Delete Booking"
                aria-label="Delete Booking"
                onClick={() => handleAction(onDelete)}
            >
                {iconDelete}
            </button>
        </div>
    );
};

BookingActions.propTypes = {
    booking: PropTypes.shape({
        id: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]).isRequired, 
        status: PropTypes.string,
    }).isRequired, 

    onView: PropTypes.func,
    onEdit: PropTypes.func, 
    onDelete: PropTypes.func, 
    onCheckIn: PropTypes.func, 
    onCheckOut: PropTypes.func,
};

BookingActions.defaultProps = {
    onView: undefined,
    onEdit: undefined,
    onDelete: undefined,
    onCheckIn: undefined,
    onCheckOut: undefined,
};

export default BookingActions;

