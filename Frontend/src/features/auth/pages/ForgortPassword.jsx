//src/features/auth/pages/ForgotPassword.jsx 
import { useState } from "react";
import { link } from "react-router-dom";
import { forgotPassword } from "../sevices/authApi";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");
        setLoading(rue);

        try {
            await forgetPassword(email);

            setMessage(
                "Password reset link has been sent to your email."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-2">Forgot Password</h2>

                <p className="text-gray-500 text-center mb-6">Enter your email to reset your password</p>

                {message && (
                    <div className="bg-blue-100 text-blue-700 p-3 rounded mb-4">
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <label className="block mb-2">Email</label>

                    <input 
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        required
                        className="w-full border rounded p-3 mb-4 outline focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => 
                            setEmail(e.target.value)
                        }
                    />

                    <button 
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 disabled:bg-gray-400"
                    >
                        {loading 
                            ? "Sending..."
                            : "Send Reset Link"
                        }
                    </button>
                </form>

                <div className="text-center mt-5">

                    <link   
                        to="/login"
                        className="text-blue-600 hover:underline"
                    >
                        Back to Login
                    </link>
                </div>
            </div>
        </div>
    );
}

export default forgotPassword;

