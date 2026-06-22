//src/features/bookings/components/BookingTable.jsx
import { Link } from "react-router-dom";
import BookingStatusBadge from "./BookingStatusBadge";

const BookingTable = ({ bookings = [] }) => {
    return (
        <div className="table-responsive">
            <table className="table table-striped table-hover">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Guest</th>
                        <th>Room</th>
                        <th>Check Ind</th>
                        <th>Check Out</th>
                        <th>Status</th>
                        <th>Total</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {bookings.length === 0 ? (
                        <tr>
                            <td colSpan="8" className="text-center">No booking found</td>
                        </tr>
                    ) : (
                        bookings.map((booking) => (
                        <tr key={booking.id}>
                            <td>{booking.guestName}</td>
                            <td>{booking.roomNumber}</td>
                            <td>{booking.InDate}</td>
                            <td>{booking.OutDate}</td>

                            <td>
                                <BookingStatusBadge 
                                    status={booking.status}
                                />
                            </td>

                            <td>
                                <bookingStatusBadge 
                                    status={booking.status}
                                />
                            </td>

                            <td>${booking.totalAmount}</td>

                            <td>
                                <Link 
                                    to={`/bookings/${booking.id}`}
                                    className="btn btn-sm btn-info me-2"
                                >
                                    View
                                </Link>

                                <Link 
                                    to={`/bookings/edit/${booking.id}`}
                                    className="btn btn-sm btn-warning"
                                >
                                    Edit
                                </Link>
                            </td>
                        </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default BookingTable;