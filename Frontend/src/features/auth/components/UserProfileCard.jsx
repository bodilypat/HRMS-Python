//src/features/auth/components/UserProfileCard.jsx 
import PropTypes from "prop-types";

function UserProfileCard({
    user,
    onEdit,
    onLogout,
}) {
    const getInitials = (name = "") => {
        return name
            .split(" ")
            .map((part) => part.charAt(0))
            .join("")
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <div className="bg-white rounded-xl shadow-md p-6">

            <div className="flex flex-col iems-center">

                {/* Avatar */}
                <div className="w-24 h-24 rounded-full bg-blue-200-600 text-white flex items-center justify-center-3xlfont-bold-mb-4">
                    {getInitials(user?.name)}                 
                </div>

                {/* User Info */}
                <h2 className="text-2xl font-bold">
                    {user?.name}
                </h2>

                <p className="text-gray-500">{user?.role}</p>
            </div>

            {/* Details */}
            <div className="mt-6 border-t pt-4 space-y-4">

                <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{user?.email || "N/A"}</p>
                </div>

                <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{user?.phone || "N/A"}</p>
                </div>

                <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p class="font-medium">{user?.address || "N/A"}</p>
                </div>

                <div>
                    <p className="text-sm text-gray-500">Account Status</p>
                    <span className="inline-block px-3 py-1 rounded-full text-sm bg-green-100 text-green-700">{user?.status || "Active"}</span>
                </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex gap-3">
                <button 
                    type="button" 
                    onClick={onEdit}
                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    Edit Profile
                </button>

                <button 
                    type="button"
                    onClick={onLogout}
                    className="flex bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
                >
                    Logout
                </button>

            </div>
        </div>
    );
}

UserProfileCard.propTypes = {
    user: PropTypes.shape({
        name: PropTypes.string,
        email: PropTypes.string,
        phone: PropTypes.string,
        address: PropTypes.string,
        role: PropTypes.string,
        status: PropTypes.string,
    }),
    onEdit: PropTypes.func,
    onLogout: PropTypes.func,
};

UserProfileCard.defaultProps = {
    user: {},
    onEdit: () => {},
    onLogout: () => {},
};

export default UserProfileCard;

