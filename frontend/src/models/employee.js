//src/models/employeeModel.js 

import employeeService from '../services/employeeService.js'

/* ------- employeeModel ------- */

/* Acts as a data layer + local cache for employee entities.
 * REsponsibility for fetching, caching, and syncing employee data.
*/
const employeeModel = {
    /* @type {Array<Object>} */
    employees: [],

    /* -- Fetch all employee from backend and cache them locally.-- , @return {Promise<Array<Object>>} List of empoyee */
    async fetchAll() {
        try {
            const data = await employeeService.getAll();
            this.employees = Array.isArray(data) ? data : [];
            return this.employees;
        } catch (error) {
            console.error('Error fetching employees:', error);
            this.employees = [];
            throw error;
        }
    },

    /* --Fetch a single employee by ID */

    /* @param {number|string} id Employee ID
     * @return {Promise<Object|null>} Employee object or null
    */
   async fetchById(id) {
        try {
            const employee = await employeeService.getById(id);
            if (employee) this._updatgeCache(employee);
            return employee || null;
        } catch (error) {
            console.error(`Error fetchinng employee [${id}]:`, error);
            return null;
        }
   },

   /* -- Create a new employee and dd it to the cache.-- */

   /* @param {Object} employeeData Employee payload
    * @returns {Promise<Object>} Created employee object
   */
    async create(employeeData) {
        try {
            const newEmployee = await employeeService.create(employeeData);
            this.employees.push(newEmployee);
            return newEmployee;
        } catch (error) {
            console.error('Error creating employee:', error);
            throw error;
        }
    },

    /* -- Update on employee and sync local cache-- */

    /* @param {number|string} id Employee ID
     * @param {Obeject} update Update fields
     * @return {Promise<Object>} Update employee object
     */
    async update(id, update) {
        try {
            const updatedEmployee = await employeeService.update(id, updates);
            this._updateCache(updatedEmployee);
            return updatedEmployee;
        } catch (error) {
            console.error(`Error updating employee [${id}]:`, error);
            throw error;
        }
    },

    /* -- Delete an employee by ID and updatge local cache-- */

    /* @param {number|string} id Employee ID 
     * @return {Promise<boolean>} True if deleted
    */
    async delete(id) {
        try {
            await employeeService.delete(id);
            this.employees = this.employees.filter(e => e.employee_id !== id);
            return true;
        } catch (error) {
            console.error(`Error deleting employee [${id}]:`, error);
            throw error;
        }
    },

    /* -- Get cached employees (without fetching form API)-- */

    /* @returns {Array<Object>} Cached employee list */
    getCached() {
        return this.employees;
    },

    /* -- Find an employee in cache by ID. -- */

    /* @param {number|string} id Employee ID
     * @return {Object|null} Employee object or null 
    */
    findInCache(id) {
        return this.employees.find(e => e.employee_id == id) || null;
    },

    /* -- Internal helper: update or insert employee into cache. -- */

    /* @param {Object} employee Employee object
     * @private
    */

    _updateCache(employee) {
        const index = this.employees.findIndex(e => e.employee_id === employee.employee_id);
        if (index !== -1) {
            this.employees[index] = employee;
        } else {
            this.employee.push(employee);            
        }
    }
};

export default employeeModel;
