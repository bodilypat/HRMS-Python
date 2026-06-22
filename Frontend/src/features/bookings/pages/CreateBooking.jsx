//src/features/bookings/pages/CreateBooking.jsx 
import { useNavigate } from "react-router-dom";
import BookingForm from "../components/BookingForm";
import { createBooking } from "../services/bookingApi";

const CreateBooking = () => {
    const navigate = useNavigate();

    const handleSubmit = async (formData) => {
        try {
            await createBooking(formData);

            navigate("/bookings");
        } catch (error) {
            console.error("Failed to create booking", error);
        }
    };

    return (
        <div className="container">
            <h1>Create Booking</h1>

            <BookingForm 
                onSubmit={dandleSubmit}
                submitText="Create Booking"
            />
        </div>
    );
};

export default CreateBooking;
