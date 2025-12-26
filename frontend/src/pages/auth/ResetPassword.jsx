//src/pages/auth/ResetPassword.jsx 

import { useState } from "react";
import { useParams } from "react-router-dom";
import  { resetPassword } from "../../services/authService"; 

const ResetPassword = () => {
    const { token } = useParams();
    const [newPassword, setNewPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        await resetPassword(token, newPassword);
        alert("Password has been reset successfully!");
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Reset Password</h2>
            <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
            />
            <button type="submit">Reset Password</button>
        </form>
    );
};
