//src/features/bookings/pages/BookingDetails.jsx 
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { getBookingById } from "../services/bookingApi";

const BookingDetails = () => {
    const { id } = useParams();

    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBooking = async () => {
            try {
                const data = await getBookingById(id);
                setBooking(data);
            } catch (error) {
                console.error(error);
            } finally { 
                setLoading(false);
            }
        };

        fetchBooking();
    }, [id]);

    if (loading) return <p>Loading booking...</p>

    if(!booking) {
        return <p>Booking not found.</p>
    }

    return (
        <div className="container">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Booking Details</h1>

                <Link 
                    to={`/booking/edit/${booking.id}`}
                    className="btn btn-warning"
                >
                    Edit Booking
                </Link>
            </div>

            <div className="card p-4">
                <p><strong>Booking ID:</strong>{booking.id}</p>

                <p><strong>Guest Name:</strong>{booking.guestName}</p>

                <p><strong>Room Number:</strong>{booking.roomNumber}</p>

                <p><strong>Check In:</strong>{booking.checkInDate}</p>

                <p><strong>Check Out:</strong>{booking.checkOutDate}</p>

                <p><strong>Status:</strong>{booking.status}</p>

                <p><strong>Total Amount:</strong>${booking.totalAmount}</p>

            </div>
        </div>
    );
};

export default BookingDetails;

