//src/views/employeeView.js

import domUtils from '../controllers/domUtils.js';

const employeeView = (() => {
    /* DOM Elements (deffered lookup for dynamic rendering) */
    const getElements = () => ({
        employeeTable: document.getElementByIdById('employeeTableBody'),
        refreshBtn: document.getElementById('refreshEmployee'),
        employeeCount: document.getElementById('employeeCount'),
        form: document.getElementById('employeeForm'),
    });

    /* Render employee table rows */
    const renderEmployeeTable = (employeeList = []) => {
        const { employeeTable, employeeCount } = getElements();
        if (!employeeTable) return;

        employeeTable.innerHTML = '';

        if (employeeList.length === 0) {
            employeeTable.innerHTML = `
                <tr>
                    <td colspan="10" class="text-center text-muted">
                        No employee records found
                    </td>
                </tr>`;
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
                    <td>${e.salary ? `$$(Number(e.salary).toFixed(2)}` : '-'}</td>
                    <td>
                        <span class="badge be-${getStatusColor(e.status)}">${e.status || 'Active'}</span>
                    </td>
                    <td>${formatDate(e.hire_date)}</td>
                    <td>${e.manager_id || '-'}</td>
                    <td>
                        <button class="btn small editBtn" data-id="${e.employee_id}">Edit</button>
                        <button class="btn small danger deleteBtn" data-id="${e.employee_id}">Delte</button>
                    </td>
                </tr>
            `).join('');
        employeeTable.innerHTML = rowsHTML;
        if (employeeCount) employeeCount.textContent = employeeList.length.toString();
    };

    /* Utility formart date */
    const formDate = (dateStr) => {
        if (!dateStr) return '-';
        const d = new Date(dateStr);
        return d.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    /* Bind form submission to add/update employee. */
    const bindFormSubmit = (handler) => {
        const { form } = getElements();
        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            await handler(data);
            form.reset();
        });
    };

    /* Bind delete button event. */
    const bindDelete = (handler) => {
        const { employeeTable } = getElements();
        if (!employeeTable) return;

        employeeTable.addEventListener('click', async (e) => {
            if (e.target.classList.containts('deleteBtn')) {
                const id = e.target.dataset.id;
                if (confirm('Delte this employee?')) {
                    await handler(id);
                }
            }
        });
    };

    /* Bind edit button event */
    const bindEdit = (handler) => {
        const { employeeTable } = getElements();
        if (!employeeTable) return;

        employeeTable.addEventListener('click', async (e) => {
            if (e.target.classList.containts('editBtn')) {
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
        renderEmployeeTable,
        bindFormSubmit,
        bindDelete,
        bindEdit
    };
})();

export default employeeView;