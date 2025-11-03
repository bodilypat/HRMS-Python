// frontend/src/models/employeeModel.js 

import { apiService } from "../services/apiService.js";

export const EmployeeModel = {
    employee: [],
    /* Fetch all employee from the backend and cache them locally
     * @return {Promise<Object>} List of employees
    */
    async fetchAll() {
        try {
            this.employee = await apiService.get("/employees");
            return this.employees;
        } catch (error) {
            console.error("Error fetching employees:", error);
            this.employees = [];
            throw error;
        }
    },
    /* Fetch a single employee by ID. 
     * @param {number|string} id - Employee ID  
     * @return {Promise<Object>} Employee object or null 
    */
   async fetchById(id) {
        try {
            const employee = await apiService.get(`/employees/${id}`);
            return employee || null;
        } catch (error) {
            console.error(`Error fetching emplyee [${id}]`, error);
            return null;
        }
   },

    /* Create a new employee and update the cached list. 
     * @param {Object} employeeData - Employee payload 
     * @return {Promise<Object>} Update employee object 
    */
   async update(id, employeeData) {
        try {
            const updateEmployee = await apiService.put(`/employees/${id}`, employeeData);
            const index = this.employees.findIndex(e => e.employee_id === id);
            if (index !== -1) this.employees[index] = updateEmployee;
            return updateEmployee;
        } catch (error) {
            console.error(`Error updating employee[${id}]:`, error);
            throw error;
        }
   },

    /* Delete  an employee by ID and Update local cache
     * @param {number|string} id - Employee ID
     * @return {Promise<Object>} True if deleted
     */
    asyn delete(id) {
        try {
            await apiService.delete(`/employees/${id}`);
            this.employees = this.employees.filter(e => e.employee_id !== id);
            return true;
        } catch (error) {
            console.error(`Error deleting employee [${id}]:`, error);
            throw error;
        }
    },
    /* Get cached employees (without fetchng from API) 
     * @return {Array} Cached employee list 
     */
    getCached() {
        return this.employees;
    },
    /* Find an employee in the cache by ID  
     * @param {number|string} id - Employee ID
     * @return {Object|null} Employee object or null  
    */
   findInCache(id) {
        return this.employees.find(e => e.employee_id == id) || null;
   }
};
