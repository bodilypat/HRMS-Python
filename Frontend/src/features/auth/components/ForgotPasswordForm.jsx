//src/features/auth/components/ForgotPasswordForm.jsx 
import { useState } from "react";
import { forgotPassword } from "../services/authApi";

function ForgotPasswordForm() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");

        try {
            setLoading(true);

            const response = await forgotPassword(email);

            setMessage(
                response?.message ||
                "Password reset link has been sent to your email."
            );

            setEmail("");
        }catch (error) {
            setError(
                error?.response?.data.message ||
                "Failed to send reset link."
            );
        } finally {
            setLoading(false);
        }
    }


    return (
        <div className="w-full max-w-md mx-auth">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-bold text-center mb-2">Forgot Password</h2>

                <p className="text-gray-500 text-center mb-6">
                    Enter your email address and we'll send you a password reset link.
                </p>

                {messge && (
                    <div className="mb-4 rounded-md bg-green-100 p-3 text-green-700">{message}</div>
                )}

                {error && (
                    <div className="mb-4 rounded-md bg-red-100 text-red-700">
                        {error}
                    </div>
                )}

                <div className="mb-4">
                    <label  
                        htmlFor="email"
                        className="mb-2 block font-medium text-gray-700"
                    >
                        Email Address
                    </label>

                    <input 
                        id="email"
                        type="email"
                        value={email}
                        required
                        onChange={(e) => 
                            setEmail(e.target.value)
                        }
                        className="w-full rounded-md border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
                    />
                </div>

                <button 
                    type="submit"
                    disabled={loading} 
                    className="w-full rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-500"
                >
                    {loading 
                        ? "Sending..."
                        : "Send Reset Link"}
                </button>
            </form>
        </div>
    );
}
export default ForgotPasswordForm;