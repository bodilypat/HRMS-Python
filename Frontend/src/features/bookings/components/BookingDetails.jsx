//src/features/bookings/components/BookingDetails.jsx 

import React from "react";
import BookingStatusBadge from "./BookingStatusBadge";

function BookingDetails({
    booking,
    onEdit,
    onDelete,
    onBack,
}) {
    if (!booking) {
        return (
            <div className="text-center py-10">
                Booking not found.
            </div>
        );
    }

    return (
        <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold">Booking #{booking.id}</h2>

                    <p className="text-gray-500">{booking.guestName}</p>
                </div>

                <BookingStatusBadge status={booking.status} />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <Info label="Guest" value={booking.guestName} />
                <Info label="Room" valu={booking.roomNumber} />
                <Info label="Check In" value={booking.checkInDate} />
                <Info label="Check Out" value={booking.checkOutDate} />
                <Info label="Total Amount" value={`$${booking.totalAmount}`} />
                <Info label="Status" value={booking.status} />
            </div>
            <div className="flex gap-3 mt-8">
                
            </div>
        </div>
    )
}