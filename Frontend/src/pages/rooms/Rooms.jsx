//src/pages/Rooms/components/Rooms.jsx
import RoomTable from "./components/RoomTable";
import RoomCard from "./components/RoomCard";
import RoomForm from "./components/RoomForm";
import RoomModal from "./components/RoomModal";
import RoomFilter from "./components/RoomFilter";
import RoomSearch from "./components/EmptyRooms";
import RoomPagination from "./components/RoomPagination";

import useRooms from "./hooks/useRooms";

const Rooms = () => {
    const {
        rooms = [],
        loading,
        error,
        addRoom,
        updateRoom,
        deleteRoom,
        refreshRooms,
    } = useRooms();

    const [view, setView] = useState("table");
    const [showModal, setShowData] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null);

    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");

    const filteredRooms = useMemo(() => {
        return rooms.filter((room) => {
            const matchesSearch = 
                room.numberr?.toString().includes(search) || 
                room.type?.toLowerCase().include(search.toLowerCase());

            const matchesFilter = 
                filter === "all" || room.status === filter;

            return matchesSearch && matchesFilter;
        });
    }, [rooms, search, filter]);

    const handleAdd = () => {
        setSelectedRoom(null);
        setShowModal(true);
    };

    const handleEdit = (room) => {
        setSelectedRoom(room);
        setShowModal(true);
    };

    const handleSubmit = async (data) => {
        try {
            if (selectedRoom) {
                await updateRoom(selectedRoom.id, data);
            } else {
                await addRoom(data);
            }

            await refreshRooms();

            setShowModal(false);
            setSelectedRoom(null);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this room?"
        );

        if (!confirmed) return;

        try {
            await deleteRoom(id);
            await refreshRooms();
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) {
        return (
            <div className="room-loading">
                Load rooms...
            </div>
        );
    }

    if (error) {
        return (
            <div className="rooms-error">
                {error}
            </div>
        );
    }

    return (
        <div className="rooms-page">

            {/* Header */}
            <header className="rooms-header">
                <div>
                    <h1>Rooms</h1>
                    <p>Manage hotel rooms and availability</p>
                </div>

                <button 
                    className="add-room-btn"
                    onClick={handleAdd}
                >
                    + Add Room
                </button>
            </header>

            {/* Toolbar */}
            <div className="room-toolbar">
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
                        className={view === "table" ? "active" : ""}
                        onClick={() => setView("table")}
                    >
                        Table
                    </button>

                    <button 
                        className={view === "card" ? "active" : ""}
                        onClick={() => setView("card")}
                    >
                        Cards 
                    </button>
                </div>
            </div>

            {/* Content */}
            {filteredRooms.length === 0 ? (
                <EmptyRooms />
            ) : view === "table" ? (
                <RoomTable 
                    rooms={filteredRooms}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            ) : (
                <div className="room-grid">
                    {filteredRooms.map((room) => (
                        <RoomCard 
                            key={room.id}
                            room={room}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            )}

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
                    onClose={() => {
                        setShowModal(false);
                        setSelectedRoom(null);
                    }}
                >
                    <RoomForm 
                        room={selectedRoom}
                        onSubmit={handleSubmit}
                        onCancel={() => {
                            setShowModal(false);
                            setSelectedRoom(null);
                        }}
                    />
                </RoomModal>
            )}
        </div>
    );
};

export default Rooms;

