//src/services/payrollServices.js 

import apiService from '../apiService.js';
import Payroll from '../models/payroll.js';

/* 
  * Payroll Service
  * Responsible for all API calls related to payroll management.
  * Connects the frontend to backend payroll endpoints
  */
const payrollService = (() => {
    
    /* Get all payroll records */
    const getAll = async () => {
        try {
            const data = await apiService.get('payroll');
            /* Convert API response to payroll model instances */
            return data.map(Payroll.fromApi);
        } catch (error) {
            console.error('Error fetching payrolls:', error);
            throw error;
        }
    };

    /* Gt payroll by ID */
    const getById = async (id) => {
        try {
            const data = await apiService.get(`/payroll/${id}`);
            return Payroll.fromApi(data);
        } catch (error) {
            console.error(`Error fetchi ng payroll with ID ${id}:`, error);
            throw error;
        }
    };

    /* Create new payroll record */
    const create = async (payrollData) => {
        try {
            const payload =payrollData instanceof Payroll? payrollData.toApi() : payrollData;
            const data = await apiService.post('/payroll', payload);
            return Payroll.formApi(data);
        } catch(error) {
            console.error('Error creating payroll:', error);
            throw error;
        }
    };

    /* Update payroll record */
    const update = async (id, payrollData) => {
        try {
            const payload = payrollData instanceof Payroll ? payrollData.toApi() : payrollData;
            const data = await apiService.put('/payroll/${id}', payload);
            return Payroll.fromApi(data);
        } catch (error) {
            console.error(`Error updatin payroll ID${id}:`, error);
            throw error;
        }
    };
    
    /* Update payroll status (processed / Paid / Failed) */
    const updateStatus = async (id, status) => {
        try {
            const data = await apiService.patch(`/payroll/${id}/status`, {status});
            return Payroll.fromApi(data);
        } catch (error) {
            console.error(`Error updating payroll status for ID ${id}:`, error);
            throw error;
        }
    };

    /* Delete payroll record */
    const remove = async (id) => {
        try {
            return await apiService.delete(`/payroll/${id}`);
        } catch (error) {
            console.error(`Error deleting payroll ID ${id}:`, error);
            throw error;
        }
    };
    return {
        getAll,
        getById,
        create,
        update,
        updateStatus,
        remove
    };
})();

export default payrollService;
