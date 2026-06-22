//src/features/bookings/pages/Bookings.jsx
import { Link } from "react-router-dom";
import { useBookings } from "../hooks/useBookings";
import BookingTable from "../components/BookingTable";

const Bookings = () => {
    const { bookings, loading, error } = useBookings();

    if (loading) return <p>Loading bookings...</p>
    if (error) return <p>Error loading booking.</p>

    return (
        <div className="container">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Bookings</h1>

                <Link to="/bookings/create" className="btn btn-primary">Create Booking</Link>
            </div>

            <BookingTable bookings={bookings} />
        </div>
    );
};

export default Bookings;

