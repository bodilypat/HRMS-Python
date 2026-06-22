//src/features/dashboard/components/statsCard.jsx 
function StatsCard({
    title,
    value
}) {
    return (
        <div className="bg-white shadow p-5 rounded">
            <h3 className="text-gray-500">{title}</h3>

            <h2 className="text-3xl font-bold">{value}</h2>
        </div>
    );
}

export default StatsCard;

