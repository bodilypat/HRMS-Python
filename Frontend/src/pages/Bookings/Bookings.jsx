//src/pages/Bookings/Bookings.jsx
import { useMemo, useState } from "react";
import "./Bookings.css";

import useBooking from "./hooks/useBookings";
import useBookingSearch from "./hooks/useBookingSearch";
import useBookingFilter from "./hooks/useBookingFilter";

import BookingSearch from "./components/BookingSearch";
import BookingFilter from "./components/BookingFilter";
import BookingTable from "./components/BookingTable";
import BookingModal from "./components/BookingModal";
import DeleteBookingDialog from "./components/DeleteBookingDialog";
import BookingPagination from "./components/BookingPagination";

const Bookings = () => {
    const {
        bookings,
        loading,
        saving,
        error,
        addBooking,
        updateBooking,
        deleteBooking,
        reloadBookings,
    } = useBookings();

    const [searchTerm, setSearchTerm] = useState("");

    const [filters, setFilter] = useState({
        status: "all",
        paymentStatus: "all",
        roomType: "all",
    });

    const [selectedBooking, setSelectedBooking] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [isDeleteDialog, setIsDeleteDialogOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const pageSize = 10;

    //Search
    const searchedBookings = useBookingSearch(
        bookings,
        searchTerm,
    );

    //Filter 
    const filteredBookings = useBookingFilter(
        searchedBookings,
        filters
    );

    //Pagination
    const totalPages = Math.ceil(
        filteredBookings.length / pageSize
    );

    const paginatonBookings = useMemo(() => {
        const start = (currentPage -1) * pageSize;

        return filteredBookings.slice(
            start,
            start + pageSize
        );
    }, [filteredBookings, currentPage]);

    // Add 
    const handleAddBooking = () => {
        setSearchedBooking(null);
        setIsModalOpen(true);
    };

    //Save 
    const handleSaveBooking = async (bookingData) => {
        if (selectedBooking) {
            await updateBooking(
                selectedBooking.id,
                bookingData
            );
        } else {
            await addBookingOpen(false);
        }
        setIsModalOpen(false);
    };

    //Delete 
    const handleDeleteBooking = (booking) => {
        setSelectedBooking(booking);
        setIsDeleteDialogOpen(true);
    };

    const confirmDelete = async () => {
        if (!selectedBooking) return;

        await deleteBooking(selectedBooking.id);

        setIsDeleteDialogOpen(false);
        setSelectedBooking(null);
    };

    return (
        <div className="bookings-page">
            <div className="bookings-header">
                <h1>Bookings</h1>

                <button 
                    className="btn btn-primary"
                    onClick={handleAddBooking}
                >
                    New Booking
                </button>
            </div>

            <div className="bookings-toolbar">
                <BookingSearch 
                    value={searchTerm}
                    onChange={setSearchTerm}
                />

                <BookingFilter 
                    filters={filters}
                    onChange={setFilters}
                />
            </div>

            {loading && (
                <p>Loading booking...</p>
            )}

            {error && (
                <p>Loading booking...</p>
            )}

            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}

            {!loading && (
                <> 
                <BookingTable
                    bookings={paginatedBookings}
                    loading={saving}
                    onEdit={handleEditBooking}
                    onDelete={handleDeleteBooking}
                />
                </>
            )}

            <BookingModal 
                open={isModalOpen}
                booking={selectedBooking}
                loading={saving}
                onCancel={() => 
                        setIsDeleteDialogOpen(false)
                    }
                    onconfirm={confirmDelete}
            />
        </div>
    );
};

export default Bookings;

