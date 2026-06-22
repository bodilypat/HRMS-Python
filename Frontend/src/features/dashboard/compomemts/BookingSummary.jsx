//src/features/dashboard/components/BookingSummary.jsx 
function BookingSummary({
    todayCheckIn,
    todayCheckOut
}) {

    return (
        <div>
            <h2>Today's Activity</h2>

            <p>Check-ins: {todayCheckIn}</p>

            <p>Check-outs: {todayCheckOut}</p>

        </div>
    );
}

export default BookingSummary;

