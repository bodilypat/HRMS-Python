//src/controllers/employeeController.js 

import employeeView from '../views/employeeView.js';
import employeeService from '../services/employeeService.js';
import domUtils from './domUtils'; 

const employeeController = (() => {

    /* Initialize employee module */
    const init = async () => {
        try {
                domUtils.showLoader('Loading employees...');
                await loadEmployees();
                bindViewEvents();
            } catch (error) {
                console.error('Error initializing employee controller:', error)
                domUtils.showError('Failed to load employee data.');
            } finally {
                domUtils.hideLoader();
            }
    };

    /*  Fetch employees from API and render */
    const loadEmployees = async () => {
        try {
            const employees = await employeeService.getAll();
            employeeView.renderEmployeeTable(employees);
        } catch (error) {
            console.error('Error loading employees:', error);
            domUtils.showError('Unable to load employees. Please try again.');
        }
    };

    /* Add a new employee */
    const addEmployee = async (data) => {
        try {
            domUtils.showLoader('Saving employee...');
            await employeeService.create(data);
            await loadEmployees();
            domUtils.showSuccess('Employee added successfull!');
        } catch (error) {
            console.error('Error adding employee:', error);
            domUtils.showError('Failed to add employee.');
        } finally {
            domUtils.hideLoader();
        }
    };

    /* Delete employee */
    const deleteEmployee = async (id) => {
        try {
            domUtils.showLoader('Deleting employee...');
            await employeeService.delete(id);
            await loadEmployees();
            domUtils.showSuccess('Employee deleted.')
        } catch (error) {
            console.error('Error deleting employee:', error);
            domUtils.showError('Failed to delete employee.');
        } finally {
            domUtils.hideLoader();
        }
    };

    /* Update employee */
    const updateEmployee = async (id, data) => {
        try {
            domUtils.showLoader('Updating employee...');
            await employeeService.update(id, data);
            await loadEmployees();
            domUtils.showSuccess('Employee updated.');
        } catch (error) {
            console.error('Error updating employee:', error);
            domUtils.showError('Failed to update employee.');
        } finally {
            domUtils.hideLoader();
        }
    };

    /* Binn UI event handlers */
    const bindViewEvents = () => {
        employeeView.bindFormSubmit(addEmployee);
        employeeView.bindDelete(deleteEmployee);
        employeeView.bindEdit(updateEmployee);
    };

    /* Public interface */
    return {
        init,
        loadEmployees,
        addEmployee,
        deleteEmployee,
        updateEmployee,
    };

})();

export default employeeController;