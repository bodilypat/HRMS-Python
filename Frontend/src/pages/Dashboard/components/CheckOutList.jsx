//src/pages/Dashboard/components/CheckOutList.jsx 
import "./Layout.css";

const checkOuts = [
    {
        id: "",
        guest: "",
        room: "",
        type: "",
        time: "",
        bill: "",
        status: "",
    },
];

const CheckOutList = () => {
    return (
        <div className="checkout-card">
            <div className="checkout-header">
                <div>
                    <h2>Today's Check-Outs</h2>
                    <p>Guests scheduled to leave today</p>
                </div>

                <span className="checkout-count">
                    {checkOuts.length} Guests
                </span>
            </div>

            <div className="checkout-list">
                {checkOuts.map((guest) => (
                    <div className="check-item" key={guest.id}>
                        <div className="avatar">
                            {guest.guest.charAt(0)}
                        </div>

                        <div className="guest-info">
                            <h4>{guest.guest}</h4>

                            <span>Room {guest.room} * {guest.type}</span>
                        </div>

                        <div className="guest-bill">
                            <small>{guest.time}</small>
                            <strong>{guest.bill}</strong>
                        </div>

                        <div>
                            <span className={getStatusClass(guest.status)}>
                                {guest.status}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <button className="view-button">
                View All Check-outs
            </button>
        </div>
    );
};

export default CheckOutList;

