//src/features/dashboard/components/RecentBookings.jsx 
function RecentBooking() {

    const bookings = [
        {
            id: "",
            guest: "",
            room: "",
            status: "",
        }
    ];

    return (
        <div>
            <h2>Recent Bookings</h2>

            {bookings.map(item => (
                <div key={item.id}>
                    {item.guest} - 
                    {item.stats}
                </div>
            ))}
        </div>
    );
}

export default RecentBooking;

