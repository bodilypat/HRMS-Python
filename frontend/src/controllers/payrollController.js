//src/controllers/payrollController.js 

import domUtils from './domUtils.js';
import payrollView from '../views/payrollView.js';
import payrollService from '../services/payrollService.js';

const payrollController = (() => {
    const init = () => {
        payrollView.bindRefresh(loadPayrolls);
        loadPayrolls();
    };

    const loadPayrolls = async () => {
        domUtils.showLoader(document.getElementById('payrollSection'));
        try {
            const data = await payrollService.getPayrolls();
            payrollView.renderPayrollTable(data);
            domUtils.showToast('Payroll data updated', 'success');
        } catch (error) {
            domUtils.showAlert('Failed to load payroll data', 'danger');
        } finally {
            domUtils.hideLoader(document.getElementById('payrollSection'));
        }
    };
    return { init };
})();

export default payrollController;

