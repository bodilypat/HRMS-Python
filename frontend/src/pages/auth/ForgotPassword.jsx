//src/pages/auth/ForgotPassword.js 

import { useState } from "react";
import { forgotPassword } from "../../services/authService";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        await forgotPassword(email);
        alert("If an account with that email exists, a password reset link has been sent.");
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Forgot Password</h2>
            <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <button type="submit">Send Reset Link</button>
        </form>
    );
};
export default ForgotPassword;
