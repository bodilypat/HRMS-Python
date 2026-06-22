//src/features/auth/components/RegisterForm.jsx 
import { useState } from "react";
import { register } from "../services/authApi";

function RegisterForm() {
    const [fromData, setFormData] = useState({
        name:"",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...FormData,
            [e.target.name]: e.target.value,
        });
    };

    const handlesubmit = async (e) => {
        e.preventDefault();

        try {
            await RegisterForm(formData); 
            alert("Registration Successful");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                name="name"
                placeholder="Full Name"
                onChange={handlechange}
            />

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

            <button type="submit">Register</button>
        </form>
    );
}

export default RegisterForm;

