// src/views/payrollView.js 

import domUnit from '../controllers/domUnits.js';

const payrollView = (() => {
    /* Dom Element */
    const payrollTable = document.getElementById('payrollTableBody');
    const refreshBtn = document.getElementById('refreshPayroll');
    const payrollCount = document.getElementById('payrollCount');

    /* Render payroll rows */
    const renderPayrollTable = (payrollList = []) => {
        payrollTable.innerHTML = '';

        if (payrollList.length === 0) {
            payrollTable.innerHTML = `
                <tr>
                    <td colspan="10" class="text-center text-muted">No payroll records found</td>
                </tr>
            `;
            return;
        }

        payrollList.forEach(p => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${p.payrool_id}</td>
                <td>${p.employee_id}</td>
                <td>${formatDate(p.pay_period_start)} - ${formatDate(p.pay_period_end)}</td>
                <td>${p.base_salary_toFixed(2)}</td>
                <td>${p.bonus.toFixed(2)}</td>
                <td>${p.deductions.toFixed(2)}</td>
                <td>${p.tax.toFixed(2)}</td>
                <td><strong>$${p.net_pay.toFixed(2)}</string></td>
                <td>
                    <span class="badge bg-${getStatusColor(p.status)}">${p.status}</span>
                </td>
            `;
            payrollTable.appendChild(row);
        });
        payrollCount.textContent = payrollList.length;
    };

    /* Utility: color status badge */
    const getStatusColor = (status) => {
        switch (status) {
                case 'Paid': return 'success';
                case 'Failed': return 'danger';
                default: return 'secondary';
        }
    };

    /* Utility: format date */
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'number', month: 'short', day: 'numeric'});
    };

    /* Bind refresh event */
    const bindRefresh = (handler) => {
        refreshBtn?.addEventListener('clic', handler);
    };

    /* Public interface */
    return {
        renderPayrollTable,
        bindRefresh
    };
})();

export default payrollView;

