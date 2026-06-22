//src/features/rooms/components/RoomDetails.jsx 
import React from "react";

const statusColors = {
    AVAILABLE: "bg-green-100 text-green-800",
    OCCUPIED: "bg-red-100 text-red-800",
    MAINTENANCE: "bg-yellow-100 text-yellow-800",
    RESERVED: "bg-blue-100 text-blue-800",
};

function RoomDetails({ room, onEdit, onDelete, onBack }) {
    if (!room) {
        return (
            <div className="p-6 text-center">
                <h3>Room not found</h3>

            </div>
        );
    }

    const {
        roomNumber,
        type,
        price,
        status,
        floor,
        description,
        amenities = [],
        image,
    } = room;

    return (
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
            {/* Room Image */}
            <div className="h-80 bg-gray-100">
                <img 
                    src={
                        image|| 
                        "http://paradise-psb.com/assets/images/"
                    }
                    alt={`Room ${roomNumber}`}
                    className="w-full h-full object-cover"
                />
            </div>
            {/* Content */}
            <div className="p-6">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-3xl font-bold">Room {roomNumber}</h1>
                            <p className="text-gray-600">{type}</p>
                    </div>

                    <span 
                        className={`px-4 py-2 rounded-full text-sm font-semibold ${
                            statusColors[status] || 
                            "bg-gray-100 text-gray-800"
                        }`}
                    >
                        {status}
                    </span>
                </div>

                {/* Room Information */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <InfoCard label="Price" value={`$${price} / night`} />
                    <InfoCard label="Capacity" value={`${capacity || 0} Guests`} />
                    <InfoCard label="floor" value={floor || "N/A"} />
                </div>
                    
                {/* Desription */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-2">Description</h2>

                    <p className="text-gray-700">{description || "No description available."}</p>
                </div>

                {/* Amenities */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-3">Amenities</h2>

                    {amenities.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                        {amenities.map((amenity, index) => (
                        <span 
                            key={index}
                            className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                        >
                            {amenity}
                        </span>
                        ))}
                    </div>
                    ) : (
                        <p className="text-gray-500">No amenities listed.</p>
                    )}
                </div>

                {/* Acttions */}
                <div className="flex flex-wrap gap-3">
                    {onBack && (
                        <button 
                            onClick={onBack}
                            className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                        >
                            Back
                        </button>
                    )}

                    {onEdit && (
                        <button 
                            onClick={() => onEdit(room)}
                            className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                        >
                            Edit Room
                        </button>
                    )}

                    {onDelete && (
                        <button 
                            onClick={() => onDelete(room.id)}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                        >
                            Delete Room
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

function InfoCard({ label, value }) {
    return (
        <div className="border rounded-lg p-4 bg-gray-50">
            <p className="text-sm text-gray-500">{label}</p>
            <p className="text-lg font-semibold">{value}</p>
        </div>
    );
}

export default RoomDetails;

