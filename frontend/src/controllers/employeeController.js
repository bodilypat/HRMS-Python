//src/controllers/employeeView.js

import employeeView from '../views/employeeView.js';
import employeeService from '../services/employeeService.js';

const employeeController = {
    init() {
        const container = document.getElementById('mainContent');
        employeeView.render(container);
        this.loadEmployees();

        employeeView.bindFormSubmit(this.addEmployee);
        employeeView.bindDelete(this.deleteEmployee);
        employeeView.bindEdit(this.updateEmployee);
    },
    
    async loadEmployees() {
        const employees = await employeeService.getAll();
        employeeView.renderTable(employees);
    },

    async addEmployees(data) {
        await employeeService.create(data);
        employeeController.loadEmployee();
    },

    async deleteEmployee(id) {
        await employeeService.delete(id);
        employeeController.loadEmployee();
    },

    async updateEmployee(id, data) {
        await employeeService.update(id, data);
        employeeController.loadEmployees();
    }
};

export default employeeController;