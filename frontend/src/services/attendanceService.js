//src/services/attendanceService.js 

import api from "./api";

/* 
   Attendance Service
   Handles all attendance-related API calls:
    - Check In / Clock Out
    - Attendance listing
    - Employee attendance details
    - Reports & summaries
*/

// Check In (Employee)
export const checkIn = async (employeeId) => {
  const response = await api.post('/attendance/checkin', { employeeId });
  return response.data;
};

// Clock Out (Employee)
export const clockOut = async (employeeId) => {
  const response = await api.post('/attendance/clockout', { employeeId });
  return response.data;
};

// Get logged-in employee attendance records
export const getEmployeeAttendance = async (employeeId, params) => {
  const response = await api.get(`/attendance/employee/${employeeId}`, { params });
  return response.data;
};

// Get all attendance records (HR / Admin)
export const getAllAttendance = async (params) => {
  const response = await api.get('/attendance/all', { params });
  return response.data;
};

// Get attendance by employee ID
export const getAttendanceByEmployeeId = async (employeeId, params) => {
  const response = await api.get(`/attendance/employee/${employeeId}/records`, { params });
  return response.data;
};

// Get attendance by date 
export const getAttendanceByDate = async (date) => {
  const response = await api.get('/attendance/date', { params: { date } });
  return response.data;
};

// Get attendance summary (Dashboard / reports)
export const getAttendanceSummary = async (params) => {
  const response = await api.get('/attendance/summary', { params });
  return response.data;
};

// Mark attendance manually (HR / admin)
export const markAttendanceManually = async (attendanceData) => {
  const response = await api.post('/attendance/mark-manual', attendanceData);
  return response.data;
};

// Update attendance record (HR / Admin)
export const updateAttendanceRecord = async (attendanceId, attendanceData) => {
  const response = await api.put(`/attendance/${attendanceId}`, attendanceData);
  return response.data;
};

