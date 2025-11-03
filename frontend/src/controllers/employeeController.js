// frontend/src/controllers/employeeController.js 

import { employeeView } from "../views/employeeView.js";
import { employeeService } from "../services/employeeService.js";

export const employeeController = {
    init(container) {
        employeeView.renderForm(container);
        employeeService.getAll().then(employeeView.renderTable);

        employeeView.bindAdd(async (data) => {
            await employeeService.create(data);
            const employees = await employeeService.getAll();
            employeeView.renderTable(employees);
        });

        employeeView.bindDelete(async (id) => {
            await employeeService.delete(id);
            const employees= await employeeService.getAll();
            employeeView.renderTable(employees)
        });
        
        employeeView.bindEdit(async (id, updates) => {
            await employeeService.update(id, updates);
            const employees = await employeeService.getAll();
            employeeView.renderTable(employees)
        });
    }
};

