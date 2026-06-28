//src/pages/Dashboard/components/RecentBookings.jsx

import "./Layout.css"

const bookings = [
	{
		id: "",
		guest: "",
		room: "",
		type: "",
		checkIn: "",
		checkOut: "",
		status: "",
	}
];

const getStatusClass = (status) => {
	switch (status) {
		case "Checked In":
			return "status checked-in";
		case "Checked Out":
			return "status checked-out";
		case "Reserved":
			return "status reserved";
		default:
			return "status";
	}
};

const RecentBookings = () => {
	return (
		<div className="recent-bookings">
			<div className="recent-booking-header">
				<h2>Recent Bookings</h2>
				<button className="view-all btn">
					View All
				</button>
			</div>

			<div className="table-wrapper">
				<table>
					<thead>
						<tr>
							<th>Booking ID</th>
							<th>Guest</th>
							<th>Room</th> 
							<th>Type</th>
							<th>Check-In</th> 
							<th>Check-out</th>
							<th>Status</th>
						</tr>
					</thead>
					<tbody>
						{bookings.map((booking) => (
						<tr key={booking.id}>
							<td>{booking.id}</td>
							<td>{booking.guest}</td>
							<td>{booking.room}</td>
							<td>{booking.type}</td>
							<td>{booking.checkin}</td>
							<td>{booking.checkout}</td>
							<td>
								<span className={getStatusClass(booking.status)}>
									{booking.status}
								</span>
							</td>
						</tr> 
						))}
					</tbody>
				</table>

				{bookings.length === 0 && (
					<div className="empty-state">
						No recent bookings found.
					</div>
				)}
			</div>
		</div>
	);
};

export default RecentBookings;

