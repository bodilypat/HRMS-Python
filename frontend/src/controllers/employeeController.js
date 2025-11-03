// Frontend/src/controllers/employeeController.js 

import { EmployeeModel } from "../models/employeeModel.js";
import { employeeView } from "../views/employeeView.js";

export const employeeController = {
    async init(container) {
        employeeView.renderForm(container);
        const employees = await EmployeeModel.fetchAll();
        employeeView.renderTable(employees);

        employeeView.bindAdd(async (data) => {
            await EmployeeModel.create(data);
            employeeView.renderTable(EmployeeModel.getCached());
        });

        employeeView.bindEdit(async (id, updates) => {
            await EmployeeModel.update(id, updates);
            employeeView.renderTable(EmployeeModel.getCached());
        });

        employeeView.bindDelete(async (id) => {
            await EmployeeModel.delete(id);
            employeeView.renderTable(EmployeeModel.getCached());
        });
    }
};

