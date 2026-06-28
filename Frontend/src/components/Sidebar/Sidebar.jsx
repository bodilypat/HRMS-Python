//src/components/Sidebar/Sidebar.jsx 
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const menuItems = [
    {
        title: "Dashboard",
        path: "/dashboard",
        icon: "",       
    },
    {

        title: "Rooms",
        path: "/rooms",
        icon: "",
        children: [
            { title: "All Rooms", path: "/rooms"},
            { title: "Add Room", path: "/rooms/add"},
            { title: "Room Types", path: "/rooms/types"},
            { title: "Availability", path: "/rooms/availability"},
        ],
    },
    {
        title: "Reservations",
        path: "/reservations",
        icon: "",
        children: [
            { title: "Booking", path: "/reservations"},
            { title: "New Booking", path: "/reservations/new"},
            { title: "Calender", path: "/reservations/calendar"},
        ],
    },
    {
        title: "Guests",
        path: "/guests",
        icon: "",
        children: [
            { title: "Guest List", path: "/guests"},
            { title: "Add Guest", path: "/guests/new"},
            { title: "Guest History", path: "/guests/history"},
        ],
    },
    {
        title: "Guests",
        path: "/guests",
        icon: "",
        children: [
            { title: "Guest List", path: "/guests"},
            { title: "Add Guest", path: "/guests/new"},
            { title: "Guest History", path: "/guests/history"},
        ],
    },
    {
        title: "Check-In",
        path: "/checkin",
        icon: "",
    },
    {
        title: "Check-Out",
        path: "/checkout",
        icon: "",
    },
    { 
        title: "Billing",
        path: "/billing",
        icon: "",
        children: [
            { title: "Invoice", path: "/billing"},
            { title: "Payments", path: "/billings/payments"},
        ],
    },
    {
        title: "HouseKeeping",
        path: "/housekeeping",
        icon: "",
    },
    {
        title: "Employees",
        path: "/employees",
        icon: "",
    },
    {
        title: "Reports",
        path: "/reports",
        icon: "",
    },
    {
        title: "settings",
        path: "/settings",
        icon: "",
    },
];

const Sidebar = () => {
    return (
        <aside className="sidebar">
            <div className="logo">
                <h2>HMS</h2>
            </div>

            <nav>
                <ul className="menu">
                    {menuItems.map((item) => (
                        <li key={item.title}>
                            <NavLink
                                to={item.path}
                                className={({ isActive }) =>
                                    isActive ? "menu-link active" : "menu-link"
                                }
                            >
                                <span>{item.icon}</span>
                                <span>{item.title}</span>
                            </NavLink>

                            {item.children && (
                                <ul className="submit">
                                    {item.children.map((child) => (
                                        <li key={child.title}>
                                            <NavLink 
                                                to={child.path}
                                                className={({ isActive}) =>
                                                    isActive ? "submenu-link active" : "submenu-link"
                                                }
                                            >
                                                {child.title}
                                            </NavLink>                                                
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
