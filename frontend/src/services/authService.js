//src/services/authService.js 

import api from "./api";

/* Authentication Service
  * Handles all authentication & authorization related API calls.
  - Login / Logout 
  - Register users 
  - Password management
  - User session 
*/

/* Login */ 
export const login = (credentials) => {
    return api.post("/auth/login", credentials);
};

/* Logout */ 
export const logout = () => {
    return api.post("/auth/logout");        
};

/* Get Logged-in User */
export const getLoggedInUser = () => {
    return api.get("/auth/user");
};

/* Forgot Password */
export const forgotPassword = (email) => {
    return api.post("/auth/forgot-password", { email });
};

/* Reset Password */
export const resetPassword = (token, newPassword) => {
    return api.post("/auth/reset-password", { token, newPassword });
};

/* Change Password (Logged-in User) */
export const changePassword = (oldPassword, newPassword) => {
    return api.post("/auth/change-password", { oldPassword, newPassword });
};
