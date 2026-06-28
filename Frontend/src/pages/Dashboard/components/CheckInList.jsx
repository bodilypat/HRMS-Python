//src/pages/Dashboard/components/ChecckInList.jsx 
import "./Layout.css";

const checkIns = [
    {
        id: "",
        guest: "",
        room: "",
        type: "",
        time: "",
        status: "",
    },
];

const getStatusClass = (status) => {
    switch (status) {
        case "Arrived":
            return "badge success";
        case "Pending":
            return "badge warning"
        default:
            return "badge";
    }
};

const CheckInList = () => {
    return (
        <div className="checkin-card">
            <div className="checkin-header">
                <div>
                    <h2>Today's Check-Ins</h2>
                    <p>Guests scheduled to arrive today</p>
                </div>

                <span className="checkin-count">
                    {checkIns.length} Guests
                </span>
            </div>

            <div className="checkin-list">
                {checkIns.length((guests) => (
                    <div className="checkin-item" key={guest.id}>
                        <div className="avatar">
                            {guest.guest.charAt(0)}
                        </div>

                        <div className="guest-info">
                            <h4>{guest.guest}</h4>

                            <span>Room {guest.room} * {guest.type}</span>
                        </div>

                        <div className="guest-time">
                            <small>{guest.time}</small>

                            <span className={getStatusClass(guest.status)}>
                                {guest.status}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <button className="view-button">
                View All Check-Ins 
            </button>
        </div>
    );
};

export default CheckInList;

