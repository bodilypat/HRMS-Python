//src/services/employeeService.js 

import apiService from './apiService.js';

const ENDPOINT = '/employees';

/* Handles Employee API request and data access 
 * @nodule employeeService 
*/
const employeeService = {
    /* Fetch all emloyees , @returns {Promise<Array>} List of employees */

    async getAll() {
        try {
            const data = await apiService.get(ENDPOINT);
            return Array.isArray(data) ? data : [];
        } catch (error) {
            console.error('Error fetching employees:', error);
            throw new Error('Failed to fetch employees');
        }
    },

    /*  Fetch single employee by ID 
     * @param {number|string} id Employee ID 
     * @return {Promise<Object|null>} Employee object or null
    */
    async getById(id) {
        if (!id) throw new Error('Employee ID is required');
        try {
            return await apiService.get(`${ENDPOINT}/${id}`);
        } catch (error) {
            console.error(`Error fetching employee [${id}]:`, error);
            throw new Error('Failed to fetch employee dtails');
        }
    },

    /* Create a new employee 
     * @param {Object} employeeData Employee payload 
     * @returns {Promise<Object> Created employee object 
    */
   async create(employeeData) {
        if (!employeeData) throw new Error('Employee data is required');
        try {
            return await apiService.post(ENDPOINT, employeeData);
        } catch (error) {
            console.error('Error creating employee:', error);
            throw new Error('Failed to create employee');
        }
    },

    /* Update an existing employee 
     * @param {number|string} id employee ID
     * @param {Object} updates fields to update
     * @return {Promise<Object> Updated employee object }
    */
    async update(id, updates) {
        if (!id) throw new Error('Employee ID is required');
        try {
            return await apiService.put(`${ENDPOINT}/${id}`, updates);
        } catch (error) {
            console.error(`Error updating employee [${id}]:`, error);
            throw new Error('Failed to update employee');
        }
    },

    /* Delete an employee
     * @param {number|string} id Employee ID
     * @returns {Promise<boolean>} True if delete successfully
     */
    async delete(id) {
        if (!id) throw new Error('Employee ID is required');
        try {
            await apiService.delete(`${ENDPOINT}/ ${id}`);
            return true; 
        } catch (error) {
            console.error(`Error deleting employee [${id}]:`, error);
            throw new Error('Failed to delete employee');
        }
    }
};

export default employeeService;

