//src/features/bookings/components/BookingStatusBadge.jsx
 
const statusColors = {
    PENDING: "warning",
    CONFIRMED: "success",
    CHECKED_IN: "primary",
    CHECKED_OUT: "secondary",
    CANCELLED: "danger"
};

const BookingStatusBadge = ({ status }) => {
    return (
        <span className={`badge bg-${statusColors[status] || "dark"}`} >
            {status}
        </span>
    );
};

export default BookingStatusBadge;

