//src/pages/Dashboard/components/SummaryCard.jsx
import "./Layout.css"

const SummaryCard = ({
    title,
    value,
    icon,
    color = "#2563eb",
    change,
    changeType = "neutral",
}) => {
    return (
        <div className="summary-card">
            <div 
                className="summary-card-icon"
                style={{ backgroundColor: color }}
            >
                <span>{icon}</span>
            </div>

            <div className="summary-card-content">
                <h4 className="summary-card-title">{title}</h4>

                <h2 className="summary-card-value">{value}</h2>

                {change && (
                    <span className={`summary-card-change ${changeType}`}>
                        {change}
                    </span>
                )}
            </div>
        </div>
    );
};

export default SummaryCard;

