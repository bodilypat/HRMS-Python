//src/features/auth/services/authApi.js 

import api from "../../../services/api";

/* ------------------------- 
** Authentication Services
---------------------------- */

// Login 
export const login = async (credentials) => {
    const response = await api.post(
        "/auth/login",
        credentials
    );

    return response.data;
};

//Register 
export const register = async (useData) => {
    const response = await api.post(
        "/auth/register",
        useData
    );

    return response.data;
};

// Register 
export const register = async (useData) => {
    const response = await api.post(
        "/auth/register",
        userData
    );

    return response.data;
};

// Logout 
export const logout = async () => {
    const response = await api.post(
        "/auth/logout"
    );

    localStorage.removeItem("token");

    return response.data;
};

/* -----------------------------
** Password Services
-------------------------------- */

// Forgot Password 
export const forgotPassword = async (
    email 
) => {

    const response = await api.post(
        "/auth/forgot-password",
        { email }
    );

    return response.data;
};

// Reset Password 
export const resetPassword = async (
    token,
    password
) => {
    const response = await api.post(
        "/auth/reset-password",
        {
            token,
            password,
        }
    );

    return response.data;
};

// Change Password 
export const changePassword = async (
    passwordData
) => {
    const response = await api.put(
        "/auth/change-password",
        passwordData 
    );

    return response.data;
};

/* -----------------------------
** Profile Services 
-------------------------------- */

// Get Logged-in User Profile 
export const getProfile = async () => {
    const response = await api.get(
        "/auth/profile",
    );

    return response.data;
}

// Update User Profile 
export const updateProfile = async (
    profileData 
) => {
    const response = await api.put(
        "/auth/profile",
        profileData
    );

    return response.data;
};

// Upload Profile Avatar 
export const uploadAvatar = async (
    formData  
) => {
    const response = await api.post(
        "/auth/avatar",
        formData,
        {
            headers: {
                "Content-Type":
                "multipart/form-data",
            },
        }
    );

    return response.data;
};

/* ---------------------------
** Token Helpers
------------------------------ */
export const saveToken = (token) => {
    localStorage.setItem(
        "token",
        token
    );
};

export const getToken = () => {
    return localStorage.getItem(
        "token"
    );
};

export const removeToken = () => {
    localStorage.removeItem(
        "token"
    );
};

export const isAuthenticated = () => {
    return !!localStorage.getItem(
        "token"
    );
};

/* ----------------------
** Role Helpers 
------------------------- */
export const getUSerRole = () => {
    const user = JSON.parse(
        localStorage.getItem("user")
    );

    return user?.role || null;
};

export const hasRole = (role) => {
    return getUSerRole() === role;
};
