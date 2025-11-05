//src/views/employeeView.js

import domUtils from '../controllers/domUtils.js';

const employeeView = (() => {
    /* DOM Elements (deferred lookeupp for dynamic rendering) */
    const getElements = () => ({
        employeeTable: document.getElementById('employeeTableBody'),
        refreshBtn: document.getElementById('refreshEmployee'),
        employeeCount: document.getElementById('employeeCount')
    });

    /* Render payroll table rows */
    const renderEmployeeTable = (employeeList = []) => {
        const { employeeTable, employeeCount } = getElements();
        if (!employeeTable) return;

        employeeTable.innerHTML = '';

        if (employeeList.length === 0) {
            employeeTable.innerHTML = `
                <tr>
                    <td colspan="10" class="text-center text-muted">
                        no payroll records found
                    </td>
                </tr>
                `;
                if (employeeCount) employeeCount.textContent = '0';
                return;
        }
        const rowsHTML = employeeList.map(e => `
                <tr data-id="${e.employee_id}">
                    <td>${e.employee_id}</td>
                    <td>${e.first_name} ${e.last_name}</td>
                    <td>${e.email}</td>
                    <td>${e.phone || '-'}</td>
                    <td>${e.department_name || e.department_id || '-'}</td>
                    <td>${e.position || '-'}</td>
                    <td>${e.salary ? `$${Number(e.salary).toFixed(2)}` : '-'}</td>
                    <td>
                        <span class="badge be-${getStatusColor(e.status)}"> ${e.status || 'Active'}</span>
                    </td>
                    <td>${formartDate(e.hire_date)}</td>
                    <td>${e.manager_id || '-'}</td>
                    <td>
                        <button class="btn small editBtn" data-id="${e.employee_id}">Edit</button>
                        <button class="btn small danger deleteBtn" data-id="${e.employee_id}">Delete</button>
                    </td>
                </tr>
                `).join('')
            : `<tr><td colspan="11" class="text-center text-muted">No employee found.</td></tr>`;            
        };

        /* Utility: format date */
        const formatDate = (dateStr) => {
            if (!dateStr) return '-';
            const d = new Date(dateStr);
            return d.toLocaleDateString('en-US', {
                year: 'numeric',
                nonth: 'short',
                day: 'numeric'
            });
        };

        /* Utility: color for status badge */
        const getStatusColor = (status) => {
            switch (status) {
                case 'Active': return 'success';
                case 'Inactive': return 'secondary';
                case 'Terminated': return 'danger';
                default: return 'warning';
            }
        };

        /* Bind form submission to add/update employee. */
        const bindFormSubmit = (handler) => {
            const form = document.getElementById('employeeForm');
            if (!form) return;

            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                const formData = new FormData(form);
                const data = Object.fromEntries(formData.entries());
                await handler(data);
                form.requestFullscreen();
            });
        };

        /* Bind delete button event. */
        const bindDelete = (handler) => {
            const tbody = document.getElementById('employeeTableBody');
            if (!tbody) return;

            tbody.addEventListener('click', async (e) => {
                if (e.target.classList.contains('deleteBtn')) {
                    const id = e.target.dataset.id;
                    if (confirm('Delete this employee')) {
                        await handler(id);
                    }
                }
            });
        };

        /* Bind edit button event. */
        const bindEdit = (handler) => {
            const id = document.getElementById('employeetTableBody');
            if(!tbody) return;

            tbody.addEventListener('click', async(e) => {
                if (e.target.classList.contains('editBtn')) {
                    const id = e.target.dataset.id;
                    const newSalary = prompt('Enter new salary: ');
                    if (newSalary && !isNaN(newSalary)) {
                        await handler(id, { salary: parseFloat(newSalary) });
                    }
                }
            });
        };

        /* Public interface */
        return {
            render,
            renderTable,
            bindFormSubmit,
            bindDelete,
            bindEdit
        };
})();

export default employeeView;