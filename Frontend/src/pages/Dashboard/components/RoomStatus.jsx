//src/pages/Dashboard/components/RoomStatus.jsx 
import "./Layout.css";

const roomStatus = [
    {
        title: "",
        count: "",
        color: "",
        icon: "",
    },
];

const totalRooms = roomStatus.reduce(
    (total, room) => total + room.count,
    0 
);

const RoomStatus = () => {
    return (
        <div className="room-status">
            <div className="room-status-header">
                <div>
                    <h2>Room Status</h2>
                    <p>Current room availability</p>
                </div>

                <div className="total-rooms">
                    <span>Total Rooms</span>
                    <h3>{totalRooms}</h3>
                </div>
            </div>

            <div className="status-list">
                {roomStatus.map((room) => {
                    const percentage = ((room.count / totalRooms) * 100).toFixed(0);

                    return (
                        <div className="status-card" key={room.title}>

                            <div className="status-info">
                                <div 
                                    className="status-icon"
                                    style={{ background: room.color }}
                                >
                                    {room.icon}
                                </div>

                                <div>
                                    <h4>{room.title}</h4>
                                    <span>{room.count} Rooms</span>
                                </div>
                            </div>

                            <div className="status-process">
                                <div className="process-bar">
                                    <div
                                        className="process-fill"
                                        style={{
                                            width: `${percentage}%`,
                                            background: room.color,
                                        }}
                                    />
                                    </div>

                                    <strong>{percentage}%</strong>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};
export default RoomStatus;

