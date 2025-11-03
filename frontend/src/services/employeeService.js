// Frontend/services/employeeService.js 

import { apiService } from "./apiService.js";

const ENDPOINT = "/employees";

export const employeeService = {
    /* Fetall employees, 
     * @return{Promise<Array>} list of employees 
    */

    async getAll() {
        try {
            return await apiService.get(ENDPOINT);
        } catch (error) {
            console.error("Error fetching employees:", error);
            alert("Error loading employees. Please try again later.");
            return [];
        }
    },

    /* Get a single employee by ID ,
     *  @param {number|string} id - Employee ID, 
     *  @return {Promise<Object|null>} Employee object or null 
    */
    async getById(id) {
        try {
            return await apiService.get(`${ENDPOINT}/${id}`);
        } catch (error) {
            console.error(`Error fetching employee [${id}]:`, error);
            alert("Unable to load employee data.");
            return null;
        }
    },

    /* Create a new employee, 
     * @param {Object} employeeData - Employee payload, 
     * @returns {Promise<Object> Create employee object} 
    */
    async create(employeeData) {
        try {
            return await apiService.post(ENDPOINT, employeeData);
        } catch (error) {
            console.error("Error creating employee:", error);
            alert("Error adding employee. Please check the input and try again.")
            throw error;
        }
    },

    /* Update an existing employee, 
     * @param {number|string} id - Employee ID, 
     * @param {Object} - Fields to update, 
     * @return {Promise<Object>} Update employee object 
     */
    async update(id, updates) {
        try {
            return await apiService.put(`$[ENDPOINT]/{id}`, updates);
        } catch (error) {
            console.error(`Error updating employee [${id}]:`, error);
            alert("Error updating employee information.");
            throw error;
        }
    },

    /* Delete an employee 
     * @param {number|string} id - Employee ID, 
     * @param {Object} - Fields to update, 
     * @return {Promise<Object>} True if deleted 
     */

    async delete(id) {
        try {
            await apiService.delete(`${ENDPOINT}/${id}`);
            return true;
        } catch (error) {
            console.error(`Error deleting employee [${id}]:`, error);
            alert("Error deleting employee. Please try again.");
            return false;
        }
    }
};
