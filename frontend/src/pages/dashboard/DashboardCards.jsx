//src/pages/dashboard/DashboardCards.jsx 

const DashboardCards = ({ stats }) => {
    const cards = [
        { label: "Employees", value: stats.employees },
        { label: "Present Today", value: stats.presentToday },
        { label: "Absent Today", value: stats.leavesToday },
        { label: "Pending Leaves", value: stats.pendingLeaves },
    ];

    return (
        <div className="dashboard-cards" style={{ display: 'flex', gap: '20px' }}>
            {cards.map((card, index) => (
                <div key={index} className="card">
                    <h3>{card.label}</h3>
                    <p>{card.value}</p>
                </div>
            ))}
        </div>
    );
};
export default DashboardCards;
