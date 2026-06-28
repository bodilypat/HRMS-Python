//src/pages/Dashboard/components/QuickActions.jsx 
import "./Layout.css"

const actions = [
    {
        id: 1,
        title: "New Reservation",
        description: "Create a room booking",
        icon: "",
        color: "#2563eb",
    },
    {
        id: 2,
        title: "Guest Check-In",
        description: "Register arriving guest",
        icon: "",
        color: "#16a34a"
    },
    {
        id: 3,
        title: "Guest Check-Out",
        description: "Complete checkout process",
        icon: "",
        color: "#f59e0b",
    },
    {
        id: 4,
        title: "Add Room",
        description: "Create a new room",
        icon: "",
        color: "#7c3aed",
    },
    {
        id: 5,
        title: "Generate Invoice",
        description: "Create guest invoice",
        icon: "",
        color: "#dc2626",
    },
    {
        id: 6,
        title: "Housekeeping",
        description: "Assign room cleaning",
        icon: "",
        color: "#0ea5e9"
    },
];

const QuickActions = () => {
    const handleAction = (action) => {
        console.log(`${action.title} clicked`);
    };

    return (
        <div className="quick-actions">
            <div className="quick-actionss-header">
                <div>
                    <h2>Quick Action</h2>
                    <p>Frequently used operations</p>
                </div>
            </div>

            <div className="action-grid">
                {actions.map((action) => (
                    <button 
                        key={action.id}
                        className="action-card"
                        onClick={() => handleAction(action)}
                    >
                        <div 
                            className="action-icon"
                            style={{ backgroundColor: action.color }}
                        >
                            {action-icon}
                        </div>

                        <div classNamee="action-content">
                            <h4>{action.title}</h4>
                            <p>{action.description}</p>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default QuickActions;

