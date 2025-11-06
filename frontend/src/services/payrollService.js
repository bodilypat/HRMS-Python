//src/services/payrollService.js 

import apiService from './apiService.js';
import Payroll from './models/payroll.js';

/* Handles all API interactions related to payrolls : Converts row API data <-> Payroll model instances. */
const payrollService = (() => {

    /* READ: Fetch all payroll records */
    const getAll = async () => {
        try {
            const data = await apiService.get('/payrolls');
            return Array.isArray(data) ? data.map(Payroll.fromApi): [];
        } catch (error) {
            console.error('Error fetching payroll list:', error);
            throw FormatError('Failed to load payrolls', error);
        }
    };

    /* READ: Fetch single payroll by ID */
    const getById = async (id) => {
        try {
            const data = await apiService.get(`/payrolls/${id}`);
            return Payroll.fromApi(data);
        } catch (error) {
            console.error(`Error fetching payroll ID ${id}`, error);
            throw formatError(`Failed to fetch payroll #${id}`, error);
        }
    };

    /* CREATE: Create new payroll record */
    const create = async (payrollData) => {
        try {
            const payload = payrollData instanceof Payroll ? payrollData.toApi() : payrollData;
            const data = await apiService.post('/payrolls', payload);
            return Payroll.fromApi(data);
        } catch (error) {
            console.error('Error creating payroll:', error);
            throw formatError('Failed to create payroll record', error);
        }
    };
    /* UPDATE: Update payroll record by ID */
    const update = async (id, payrollData) => {
        try {
            const payload = payrollData instanceof Payroll ? payrollData.toApi() : payrollData;
            const data = await apiService.put(`/payrolls/${id}`, payload);
            return Payroll.fromApi(data);
        } catch (error) {
            console.error(`Error updating payroll #${id}:`, error);
            throw formatError(`Failed to update payroll #${id}`, error);
        }
    };
    
    /* UPDATE: Update only the payroll status (Paid/ Failed / Pending) */
    const updateStatus = async (id, status) => {
        try {
            const data = await apiService.patch(`/payrolls/${id}/status`, { status });
            return Payroll.fromApi(data);
        } catch (error) {
            console.error(`Error updating status for payroll #${id}:`, error);
            throw formatError(`Failed to update payroll status`, error);
        }
    };

    /* DELETE: Delete a payroll record */
    const remove = async (id) => {
        try {
            await apiService.delete(`/payrolls/${id}`);
            return true;
        } catch (error) {
            console.error(`Error deleting payroll #${id}:`, error);
            throw formatError(`Failed to delete payroll #${id}:`, error);
        }
    };

    /* HELPERS : Normalize and enrich errors for controllers */
    const formatError = (context, error) => {
        const message = 
            error?.message ||
            error?.data?.message || 
            `${context || 'Operation failed'} due to network/server error.`;
            return new Error(message);
    };

    /* PUBLIC API */
    return {
        getAll,
        getById,
        create,
        update,
        updateStatus,
        remove,
    };
})();

export default payrollService;