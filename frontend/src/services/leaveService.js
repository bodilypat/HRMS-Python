// src/services/leaveService.ts

import api from "./api"

/* Leave Service
   Handles all leave-related API calls:
    - Apply leave: Submits a leave application
    - View leave history
    - Approve / Reject leave applications
    - Leave balance
    - Filter & Reports
*/

// Apply for leave (Employee)
export const applyLeave = async (leaveData) => {
  const response = await api.post('/leave/apply', leaveData);
  return response.data;
};

// Get Logged-in employee's leave history
export const getLeaveHistory = async (employeeId) => {
  const response = await api.get(`/leave/history/${employeeId}`);
  return response.data;
};

// Get all leave (HR / Admin)
export const getAllLeaves = async () => {
  const response = await api.get('/leave/all');
  return response.data;
};

// Get leave by ID
export const getLeaveById = async (leaveId) => {
  const response = await api.get(`/leave/${leaveId}`);
  return response.data;
};

// Approve leave (Manager / HR)
export const approveLeave = async (leaveId, approverId) => {
  const response = await api.put(`/leave/approve/${leaveId}`, { approverId });
  return response.data;
};

// Reject leave (Manager / HR)
export const rejectLeave = async (leaveId, approverId, reason) => {
  const response = await api.put(`/leave/reject/${leaveId}`, { approverId, reason });
  return response.data;
};

// Get leave balance (Employee)
export const getLeaveBalance = async (employeeId) => {
  const response = await api.get(`/leave/balance/${employeeId}`);
  return response.data;
};

// Cancel leave (Employee - if allowed)
export const cancelLeave = async (leaveId, employeeId) => {
  const response = await api.put(`/leave/cancel/${leaveId}`, { employeeId });
  return response.data;
};

// Filter leaves (HR / Admin)
export const filterLeaves = async (filterParams) => {
  const response = await api.post('/leave/filter', filterParams);
  return response.data;
};

// Generate leave report (HR / Admin)
export const generateLeaveReport = async (reportParams) => {
  const response = await api.post('/leave/report', reportParams);
  return response.data;
};

