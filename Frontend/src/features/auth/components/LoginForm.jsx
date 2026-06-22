//src/features/components/LoginForm.jsx 

import { useState } from "react";
import { login } from "../services/authApi";

function LoginForm() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]:e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await login(formData);

            localStorage.setItem(
                "token",
                response.data.token
            );

            alert("Login Successful");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                name="email"
                type="email"
                placeholder="Email"
                onChange={handleChange}
            />

            <input 
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
            />

            <button type="submit">Login</button>
        </form>
    );
}

export default Login;
