// src/pages/auth/ChangePassword.jsx

import { useState } from 'react';
import { changePassword } from '../../services/authService';

const ChangePassword = () => {
    const [form, setForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await changePassword(form);
        alert('Password changed successfully');
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Change Password</h2>
            <input
                type="password"
                placeholder="Current Password"
                value={form.currentPassword}
                onChange={(e) => setForm({ ...form, currentPassword: e.target.value })}
                required
            />
            <input
                type="password"
                placeholder="New Password"
                value={form.newPassword}    
                onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
                required
            />
            <input
                type="password"
                placeholder="Confirm New Password"
                value={form.confirmNewPassword}
                onChange={(e) => setForm({ ...form, confirmNewPassword: e.target.value })}
                required
            />
            <button type="submit">Change Password</button>
        </form>
    );
};
export default ChangePassword;
