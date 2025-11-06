//src/views/payrollView.js 

import domUtils from '../controllers/domUtils.js';

const payrollView = (() => {
    /* DOM Elements */
    const payrollTable = document.getElementById('payrollTableBody');
    const refreshBtn = document.getElementById('refreshPayroll');
    const payrollCount = document.getElementById('payrollCount');
    const loader = document.getElementById('payrollLoader'); /* optional spinner */

    /* RENDER FUNCTIONS */
    const renderPayrollTable = (payrollList = []) => {
        if (!payrollTable) return;

        payrollTable.innerHTML = '';

        if (payrollList.length === 0) {
            payrollTable.innerHTML = `
                <tr>
                    <td colspan="10" class="text-center text-muted">
                        No payroll record found
                    </td>
                </tr>
                `;
            payrollCount.textContent = 0;
            return;
        }

        payrollList.forEach(p => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${p.payroll_id ?? '-'}</td>
                <td>${p.employe_id ?? '-'}</td>
                <td>${formatDate(p.pay_period_start)} - ${formatDate(p.pay_period_end)}</td>
                <td>${safeToFixed(p.base_salary)}</td>
                <td>${safeToFixed(p.bonus)}</td>
                <td>${safeToFixed(p.deductions)}</td>
                <td>${safeToFixed(p.tax)}</td>
                <td><strong>$${safeToFixed(p.net_pay)}</strong></td>
                <td><span class="badge bg-${getStatusColor(p.status)}">${p.status}</span></td>
                `;
            payrollTable.appendChild(row);
        });
        payrollCount.textContent = payrollList.length;
    };

    /* UTILITIES : Format date for display */
    const formatDate = (dateString) => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-Us', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    /* Avoid NaN for missing numeric fields */
    const safeToFixed = (num, digits = 2) => {
        return (typeof num === 'number' && !isNaN(num))
            ? num.toFixed(digits)
            : '0.00';
    };

    /* Badge color based on status */
    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'paid': return 'success';
            case 'failed': return 'danger';
            case 'panding': return 'warning';
            default: return 'secondary';
        }
    };

    /* Bind refresh button click event */
    const bindRefresh = (handler) => {
        if (!refreshBtn) return;
        refreshBtn.addEventListener('click',(e) => {
            e.preventDefault();
            handler?.();
        });
    };

    /* Bind dynamic payroll actions (future scalability) */
    const bindRowActions = (handler) => {
        payrollTable?.addEventListener('click', (e) => {
            const btn = e.target.closest('[data-action');
            if (!btn) return;

            const action = btn.dataset.action;
            const payrollId = btn.dataset.id;
            handler?.(action, payrollId);
        });
    };

    /* LANDING STATES */
    const showLoading = () => domUtils.showLoader(loader);
    const hideLoading = () => domUtils.showLoader(loader);

    /* PUBLIC API */
    return {
        renderPayrollTable,
        bindRefresh,
        bindRowActions,
        showLoading,
        hideLoading
    };
})();

export default payrollView;

