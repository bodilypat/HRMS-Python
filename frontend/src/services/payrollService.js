//src/services/payrollService.js 

import api from '../api';

/* Payroll Service
    Handle all payroll-related API calls:
    - Generate payslips
    - Payroll listing 
    - Payslip details
    - Salary structure & settings
    - Report & download
*/

// Get payroll list (HR / Admin)
export const getPayrollList = async (params) => {
    const response = await api.get('/payroll/list', { params });
    return response.data;
};

// Generate payslip for an employee (HR / Admin)
export const generatePayslip = async (employeeId, month, year) => {
    const response = await api.post('/payroll/generate', { employeeId, month, year });
    return response.data;
};

// Get payroll / payslip by ID 
export const getPayslipById = async (payslipId) => {
    const response = await api.get(`/payroll/payslip/${payslipId}`);
    return response.data;
};

// Get logged-in employee's payslips
export const getEmployeePayslips = async (employeeId, params) => {
    const response = await api.get(`/payroll/employee/${employeeId}/payslips`, { params });
    return response.data;
};

// Download payslip PDF
export const downloadPayslipPDF = async (payslipId) => {
    const response = await api.get(`/payroll/payslip/${payslipId}/download`, {
        responseType: 'blob',
    });
    return response.data;
};

// Get payroll settings (salary structure)
export const getPayrollSettings = async () => {
    const response = await api.get('/payroll/settings');
    return response.data;
};

// Update payroll settings (HR / Admin)
export const updatePayrollSettings = async (settings) => {
    const response = await api.put('/payroll/settings', settings);
    return response.data;
};

// Update payroll record (HR / Admin)
export const updatePayrollRecord = async (payslipId, updates) => {
    const response = await api.put(`/payroll/payslip/${payslipId}`, updates);
    return response.data;
};

// Update payroll record (HR / Admin)
export const updatePayrollRecord = async (payslipId, updates) => {
    const response = await api.put(`/payroll/payslip/${payslipId}`, updates);
    return response.data;
};

// Generate payroll report (HR / Admin)
export const generatePayrollReport = async (params) => {
    const response = await api.get('/payroll/report', { params, responseType: 'blob' });
    return response.data;
};

