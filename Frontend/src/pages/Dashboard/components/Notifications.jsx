//src/pages/Dashboard/components/Notifications.jsx 
import "Notifications.css";

const notifications = [
    {
        id: "",
        title: "",
        message: "",
        time: "",
        type: "",
        icon: "",
    },
];

const Notifications = () => {
    return (
        <div className="notifications">
            <div className="notifications-header">
                <div>
                    <h2>Notifications</h2>
                    <p>Recent hotel activities</p>
                </div>

                <button className="mark-read-btn">
                    Mark All Read 
                </button>
            </div>

            <div className="notification-list">
                {notifications.map((item) => (
                    <div 
                        key={item.id}
                        className={`notification-card ${item.type}`}
                    >
                        <div className="notification-icon">
                            {item.icon}
                        </div>

                        <div className="notification-content">
                            <div className="notification-top">
                                <h4>{item.title}</h4>
                                <span>{item.time}</span>
                            </div>

                            <p>{item.message}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Notifications;
