//src/features/rooms/components/RoomList.jsx 
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRooms } from "./roomSlice";

function RoomList() {
    const dispatch = useDispatch();
    const { rooms, loading } = useSelector((state) => state.rooms);

    useEffect(() => {
        dispatch(fetchRooms());
    }, [dispatch]);

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <h2>Rooms</h2>
            <table>
                <thead>
                    <tr>
                        <th>Number</th>
                        <th>Type</th>
                        <th>Price</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {rooms.map((room) => {
                    <tr key={room.id}>
                        <td>{room.roomNumber}</td>
                        <td>{room.type}</td>
                        <td>${room.price}</td>
                        <td>{room.status}</td>
                    </tr>
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default RoomList;

