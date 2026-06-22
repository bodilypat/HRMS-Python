//src/features/bookings/components/BookingCard.jsx 

import { Link } from "react-router-dom";
import BookingStatusBadge from "./BookingStatusBadge";

const BookingCard = ({ booking }) => {
    return (
        <div className="card shadow-sm border-0">
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="card-title mb-0">{booking.guestName}</h5>

                    <BookingStatusBadge status={booking.status} />
                </div>

                <p className="mb-1">
                    <strong>Room:</strong>{booking.roomNumber}
                </p>

                <p className="mb-1">
                    <strong>Check In:</strong>{booking.checkInDate}
                </p>

                <p className="mb-1">
                    <strong>Check Out:</strong>{booking.checkOutDate}
                </p>

                <p className="mb-3">
                    <strong>Total:</strong>{booking.totalAmount}
                </p>

                <Link 
                    to={`/bookings/${booking.id}`}
                    className="btn btn-primary btn-sm"
                >
                    View Details 
                </Link>
            </div>
        </div>
    );
};

export default BookingCard;

