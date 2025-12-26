// src/services/reportService.js 

import api from "./api";

/* Report Service
   - Handles all report & analytics-related API calls.
   - Attendance reports
   - Leave reports 
   - Payroll reports 
   - Employee reports 
   - Recruitment reports
*/

// Attendance Reports
export const getAttendanceReport = async (params) => {
  const response = await api.get("/reports/attendance", { params });
  return response.data;
};

// Leave Reports 
export const getLeaveReport = async (params) => {
  const response = await api.get("/reports/leave", { params });
  return response.data;
};

// Payroll Reports
export const getPayrollReport = async (params) => {
  const response = await api.get("/reports/payroll", { params });
  return response.data;
};

// Employee Reports
export const getEmployeeReport = async (params) => {
  const response = await api.get("/reports/employee", { params });
  return response.data;
};

// Recruitment Reports
export const getRecruitmentReport = async (params) => {
  const response = await api.get("/reports/recruitment", { params });
  return response.data;
};

// Export Reports (PDF / CSV)
export const exportReport = async (reportType, format, params) => {
  const response = await api.get(`/reports/${reportType}/export`, {
    params: { ...params, format },
    responseType: "blob",
  });
  return response.data;
};

// Dashboard Analytics
export const getDashboardAnalytics = async () => {
  const response = await api.get("/analytics/dashboard");
  return response.data;
};

// Employee Performance Analytics
export const getEmployeePerformanceAnalytics = async (params) => {
  const response = await api.get("/analytics/employee-performance", { params });
  return response.data;
};

// Recruitment Analytics
export const getRecruitmentAnalytics = async (params) => {
  const response = await api.get("/analytics/recruitment", { params });
  return response.data;
};

// Payroll Analytics
export const getPayrollAnalytics = async (params) => {
  const response = await api.get("/analytics/payroll", { params });
  return response.data;
};

// Leave Analytics
export const getLeaveAnalytics = async (params) => {
  const response = await api.get("/analytics/leave", { params });
  return response.data;
};

// Attendance Analytics
export const getAttendanceAnalytics = async (params) => {
  const response = await api.get("/analytics/attendance", { params });
  return response.data;
};

// Custom Analytics Query
export const getCustomAnalytics = async (query) => {
  const response = await api.post("/analytics/custom", { query });
  return response.data;
};

