//src/pages/Bookings/components/BookingTable.jsx 

import PropTypes from "prop-types";
import BookingStatusBadge from "./BookingStatusBadge";
import BookingActions from "./BookingActions";

import "./BookingStyles.css";

const BookingTable = ({
    bookings = [],
    onView,
    onEdit,
    onDelete,
    onCheckIn,
    onCheckOut,
}) => {
    if (!bookings.length)  {
        return (
            <div className="booking-empty-state">
                <p>No bookings found.</p>
            </div>
        );
    }

    return (
        <div className="booking-table-container">
            <table className="booking-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Guest</th>
                        <th>Phone</th>
                        <th>Room</th>
                        <th>Roomm Type</th>
                        <th>Check-In</th>
                        <th>Check-out</th>
                        <th>Guest</th>
                        <th>Total</th>
                        <th>Payment</th>
                        <th>Status</th>
                        <th className="text-center">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {bookings.map((booking) => (
                        <tr key={booking.id}>
                            <td>
                                <div className="guest-info">
                                    <strong>{booking.guestName}</strong>
                                    {booking.email && (
                                        <small>{booking.email}</small>
                                    )}
                                </div>
                            </td>

                            <td>{booking.phone}</td>
                            <td>{booking.roomNumber}</td>
                            <td>{booking.roomType}</td>
                            <td>{booking.checkIn}</td>
                            <td>{booking.checkOut}</td>
                            <td>{booking.guests}</td>
                            <td>
                                $
                                {Number(
                                    booking.totalAmount || 0
                                ).toLocaleString()}
                            </td>

                            <td>
                                <span 
                                    className={`payment-status ${(
                                        booking.paymentStatus || ""
                                    ).toLowerCase()}`}
                                >
                                    {booking.paymentStatus}
                                </span>
                            </td>

                            <td>
                                <BookingActions 
                                    booking={booking}
                                    onView={onView}
                                    onEdit={onEdit}
                                    onDelete={onDelete}
                                    onCheckIn={onCheckId}
                                    onCheckOut={onCheckOut}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BookingTable;


