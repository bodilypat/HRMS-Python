//src/contrpllers/payrollController.js 

import payrollService from '../services/payrollService.js';
import payrollView from '../views/payrollView.js';

const payrollController = (() => {
    const loadPayrolls = async () => {
        try {
            const payrolls = await payrollService.getAll();
            payrollView.rederPayrollTable(payrolls);
        } catch (error) {
            payrollView.showError('Enable to load payroll data.');
        }
    };

    const markAsPaid = async (payrollId) => {
        try {
            const updated = await payrollService.updateStatus(payrollId, 'Paid');
            payrollView.showAlert(`Payroll #${payrollId} marked as Paid.`, 'success');
            loadPayrolls();
        } catch {
            payrollView.showAlert('Failed to update payroll status.', 'danger');
        }
    };
    return { loadPayrolls, markAsPaid };
})();

export default payrollController;

