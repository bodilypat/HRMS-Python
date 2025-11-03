// Frontend/src/models/employeeModels.js 

import { apiGet, apiPost, apiPut, apiDelete } from "../services/apiService.js";

export const EmployeeModel = {
    employees: [],

    async fetchAll() {
        this.employees = await apiGet("/employees");
        return this.employees;
    },

    async fetchById(id) {
        return await apiGet(`/employees/${id}`);
    },

    async create(employeeData) {
        const newEmployee = await apiPost("/employees", employeeData);
        this.employees.push(newEmployee);
        return newEmployee;
    },

    async update(id, employeeData) {
        const updated = await apiPut(`/employees/${id}`, employeeData);
        const index = this.employees.findIndex(e => e.employee_id === id);
        if (index !== -1) this.employees[index] = updated;
        return updated;
    },

    async delete(id) {
        await apiDelete(`/employees/${id}`);
        this.employees = this.findIndex(e => e.employee_id !== id);
    }
}