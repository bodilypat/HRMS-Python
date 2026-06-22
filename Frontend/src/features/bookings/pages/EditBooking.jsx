//src/features/bookings/pages/EditBooking.jsx 
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BookingForm from "../components/BookingForm";
import { getBookingById, updateBooking } from "../service/bookingApi";

const EditBooking = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadBooking = async () => {
            try {
                const data = await getBookingById(id);
                setBooking(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        loadingBooking();
    }, [id]) ;

    const handleSubmit = async (formData) => {
        try {
            await updateBooking(id, formData);
            navigate(`/bookings/${id}`);
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) return <p>Loading booking...</p>

    return (
        <div className="container">
            <h1>Edit Booking</h1>

            <BookingForm 
                initialValues={booking}
                onSubmit={handleSubmit}
                submitText="Update Booking"
            />
        </div>
    );
};

export default EditBooking;

