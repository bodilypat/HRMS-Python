//src/features/dashboard/components/RoomSummary.jsx 
function roomSummary({
    available,
    occupied
}) {

    return (
        <div>
            <h2>Room Status</h2>

            <p>Available: {available}</p>

            <p>Occupied: {occupied}</p>

        </div>
    );
}

export default RoomSummary;
