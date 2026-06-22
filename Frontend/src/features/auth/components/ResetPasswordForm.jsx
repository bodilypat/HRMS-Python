//src/features/auth/components/ResetPasswordForm.jsx 
import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { resetPassword } from "../services/authApi";

function resetPasswordForm() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const token = searchParams.get("token");

    const [formData, setFormData] = useState({
        passwrod: "",
        confirmPassword: "",
    });

    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData((prov) => ({
            ...ProgressEvent,
            [e.target.name]: e.target.value,
        }));

        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setMessage("");

        if (!token) {
            setError("Invalid or missing reset token");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");   
        }
        
        if (formData.password.length <6 ) {
            setError(
                "Password must be at least 6 characters long."
            );
            return;
        }

        try {
                setLoading(true);

                const response = await resetPassword(
                    token,
                    formData.password
                );

                setMessage(
                    response?.message || "Password reset successfully."
                );

                setFormData({
                    password: "",
                    confirmPassword: "",
                });

                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            } catch (err) {
                    setError(
                    err?.response?.data?.message || "Failed to reset password."
                    );
            } finally {
                setLoading(false);
            }
        };

        return (
            <div className="w-full max-w-md mx-auto">
                <form 
                    onSubmit={handleSubmit}
                    className="bg-white shadow-md rounded-lg p-6"
                >
                    <h2 className="text-sxl font-bold text-center-mb-2">Reset Password</h2>

                    <p className="text-gray-500 text-center mb-6">Enter your new password below.</p>

                    {message && (
                        <div className="mb-4 rounded-md bg-green-100 p-3 text-green-700">{message}</div>
                    )}

                    {error &&(
                        <div className="mb-4 rounded-md bg-red-100 p-3 text-red-700">{error}</div>
                    )}

                    <div className="mb-4">
                        <label 
                            htmlFor="password"
                            className="block mb-2 font-medium text-gray-700"
                        >
                            New Password
                        </label>

                        <input 
                            id="password"
                            name="password"
                            type="password"
                            required 
                            minLength={6}
                            value={fontData.password}
                            onChange={handleChange}
                            placeholder="Enter new password"
                            className="w-full rounded-md border-gray-300 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        />
                    </div>

                    <div className="mb-6">
                        <label 
                            htmlFor="confirmPassword"
                            className="block mb-2 font-medium text-gray-700"
                        >
                            Confirm Password
                        </label>

                        <input 
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            required
                            minLength={6}
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm new password"
                            className="w-full rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-500 focus:rng-2 focus:ring-blue-200"
                        />                    
                    </div>

                    <button 
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-md bg-blue-600 px-4 py-2 font-medium text-white transiton hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
                    >
                        {loading 
                            ? "Resetting..."
                            : "Reset Password"}
                    </button>
                </form>
            </div>
        );
}

export default ResetPasswordForm;

