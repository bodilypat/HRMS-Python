//src/pages/Rooms/components/Rooms.jsx
import React, { useState } from "react";
import "./Rooms.css";

import RoomTable from "./components/RoomTable";
import RoomCard from "./components/RoomCard";
import RoomForm from "./components/RoomForm";
import RoomModal from "./components/RoomModal";
import RoomFilter from "./components/RoomFilter";
import RoomSearch from "./components/RoomSearch"
import EmptyRooms from "./components/EmptyRoom";
import RoomPagination from "./components/RoomPagination";

import useRooms from "./hooks/useRooms";

const Rooms = () => {
    const {
        rooms,
        loading, 
        error,
        addRoom,
        updateRoom,
        deleteRoom,
        refreshRooms
    } = useRooms();

    const [view, setView] = useState("table");
    const [showModal, setShowModal] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null);

    const [search, setSearch] = useState("");
    const [filter, setfilter] = useState("all");

    const filteredRooms = rooms.filter(room => {
        const matchesSearch = 
            room.number 
                ?.toString()
                .include(search) ||
            room.type 
                ?.toLowerCase()
                .includes(search.toLowerCase());

        const matchesFilter = 
            fitler == "all" || 
            room.status === filter;

            return matchesSearch && matchesFilter;
    });

    const handleAdd = () => {
        setSelectedRoom(room);
        setShowModal(true);
    };

    const handleSubmit = async (data) => {
        if(selectedRoom) {
            await updateRoom(
                selectedRoom.id, 
                data 
            ); 
        } else {
            await addRoom(data);
        }
        setShowModal(false);
    };

    const handleDelete = async (id) => {
        const confirmDelete = 
        window.confirm(
            "Delete  this room?"
        );

        if(confirmDelete) {
            await deleteRoom(id);
        }
    };
    
    if(loading) {
        return (
            <div className="rooms-loading">
                Loading rooms...
            </div>
        );
    }

    if(error) {
        return (
            <div className="rooms-error">
                {error}
            </div>
        );
    }

    return (
        <div className="rooms-page">

            {/* Header */}
            <div className="rooms-header">
                <div>
                    <h1>Rooms</h1>

                    <p>Manage hotel rooms and availability</p>
                </div>

                <button 
                    className="add-room-table"
                    onClick={handleAdd}
                >
                    + Add Room 
                </button>
            </div>

            {/* Toolbar */}
            <div className="rooms-toolbar">
                <RoomSearch 
                    value={search}
                    onChange={setSearch}
                />

                <RoomFilter 
                    value={filter}
                    onChange={setFilter}
                />

                <div className="view-switch">
                    <button 
                        className={
                            view === "table"
                            ? "active"
                            : ""
                        }
                        onClick={() => 
                        setView("table")
                        }
                    >
                        Table
                    </button>

                    <button
                        className={
                            view === "card"
                            ? "active"
                            : ""
                        }
                        onClick={() => 
                            setView("card")
                        }
                    >
                        Cards
                    </button>
                </div>
            </div>

            {/* Content */}
            {filteredRoom.length === 0 ? (
                <EmptyRooms />
            ) : view === "table" ? (
                <RoomTable 
                    rooms={filteredRoom}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            ) : (
                
                <div className="room-grid">
                    {filteredRooms.map(room => (
                        <RoomCard 
                            key={room.id}
                            room={room}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))
                }
            </div>
            )
        }

        {/* Pagination */}
        <RoomPagination
            total={filteredRooms.length}
        />

        {/* Modal */}
        {showModal && (
            <RoomModal 
                title={
                    selectedRoom 
                    ? "Edit Room"
                    : "Add Room"
                }
                onClose={() =>
                    setShowModal(false)
                }
            >
                <RoomForm 
                    room={selectedRoom}
                    onSubmit={handleSubmit}
                    onCancel={() =>
                        setShowModal(false)
                    }
                />

            </RoomModal>
        )
        }
    </div>
    );

};
export default rooms;
