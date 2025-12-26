//src/pages/auth/Login.jsx 

import { useState } from 'react';
import { login } from '../../services/authService';

const Login = () => {
    const [form, setForm] = useState({ email: '', password: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login(form);
            localStorage.setItem('token', response.token);
            window.location.href = '/dashboard';
        } catch (error) {
            console.error('Login failed:', error);
            alert('Login failed. Please check your credentials and try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
            </div>
            <button type="submit">Login</button>
        </form>
    );
};
export default Login;

