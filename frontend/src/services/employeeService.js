// src/services/employeeService.js 

import api from './api';

/* Employee Service
   Handles all employee-related API calls:
   - CRUD Operations
   - Profile Management
   - Document Management
   - Search & Filters
 */
// Get all employees with optional query params(search, pagination, department)
export const getEmployees = async (params = {}) => {
  const response = await api.get('/employees', { params });
  return response.data;
};

// Get employee by ID
export const getEmployeeById = async (id) => {
  const response = await api.get(`/employees/${id}`);
  return response.data;
};
// Create a new employee
export const createEmployee = async (employeeData) => {
  const response = await api.post('/employees', employeeData);
  return response.data;
};
// Update an existing employee
export const updateEmployee = async (id, employeeData) => {
  const response = await api.put(`/employees/${id}`, employeeData);
  return response.data;
};
// Delete an employee
export const deleteEmployee = async (id) => {
  const response = await api.delete(`/employees/${id}`);
  return response.data;
};
// Upload employee profile picture
export const uploadProfilePicture = async (id, file) => {
  const formData = new FormData();  
    formData.append('profilePicture', file);
    const response = await api.post(`/employees/${id}/profile-picture`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
// Upload employee document
export const uploadEmployeeDocument = async (id, file) => {
    const formData = new FormData();    
    formData.append('document', file);
    const response = await api.post(`/employees/${id}/documents`, formData, {
    headers: {
        'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
// Search employees by name, email or department
export const searchEmployees = async (query) => {
  const response = await api.get('/employees/search', { params: { q: query } });
  return response.data;
};
// Fetch employee profiles (can combine with getEmployeeById)
export const getEmployeeProfiles = async (params = {}) => {
  const response = await api.get('/employees/profiles', { params });
  return response.data;
}
// Fetch employee documents
export const getEmployeeDocuments = async (id) => {
  const response = await api.get(`/employees/${id}/documents`);
  return response.data;
};
// Delete employee document
export const deleteEmployeeDocument = async (employeeId, documentId) => {
  const response = await api.delete(`/employees/${employeeId}/documents/${documentId}`);
  return response.data;
};

