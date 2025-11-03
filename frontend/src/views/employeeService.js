// frontend/src/views/employeeService.js

export const employeeView = {
    /* Render the add emoloyee form and employee table, @param {HTMLElement} container - the container to render into */
    renderForm(container) {
        container.innerHTML = `
            <form id="addEmployeeForm" class="employee-form">
                <h3>Add Employee</h3>
                <div class="form-group">
                    <input id="firstName" name="first_name" placeholder="First Name" required />
                    <input id="lastName" name="last_name" placeholder="Last Name" required />
                    <input id="email" name="email" type="email" placeholder="Email" requried />
                    <input id="phone" name="phone" placeholder="Phone" required />
                    <input id="hireDate" name="hire_date" type="date" required />
                    <input id="departmentId" name="department_id" type="number" placeholder="Department ID" required />
                    <input id="position" name="position" placeholder=Position" /.
                    <input id="salary" name="salary" type="number" step="0.01" placeholder="Salary" />
                    <input id="managerId" name="manager_id" type="number" placeholder="Manage ID" />
                </div>
            </form>
            
            <hr />
            <table id="employeeTable" class="employee-table"> 
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Department</th>
                        <th>Position</th>
                        <th>Salary</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        `;        
    },

    /* Render employees into the table body, @param {Array<Object>} employees - List of employee objects  */

    renderTable(employees = []) {
        const tbody = document.querySelector('#employeeTable tbody');
        if (!tbody)  return;

        tbody.innerHTML = employees.length
            ? employees.map(e => `
                <tr data-id="${e.employee_id}">
                    <td>${e.employee_id}</td>
                    <td>${e.first_name} ${e.last_name}</td>
                    <td>${e.email}</td>
                    <td>${e.department_name || e.department_id}</td>
                    <td>${e.position || '-'}</td>
                    <td>${e.salary ? `$${Number(e.salary).toFixed(2)}` : '-'}</td>
                    <td>${e.status || 'Active'}</td>
                    <td>
                        <button data-id="{${e.employee_id}" class="btn editBtn">Edit</button>
                        <button data-id="${e.employee_id} class="btn deleteBtn">Delete</button>
                    </td>
                </tr>
            `).join('')
            :`<tr><td colspan="8" class="text-center">No employees found.</td></tr>`;
    },

    /* Bind form submission for adding a new employee, @param{function} handler - Called with form data on submit */

    bindAdd(handler) {
        const form = document.getElementById('addEmployeeForm');
        if (!form) return;

        form.addEventListener('submit', async(e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            await handler(data);
            form.reset();
        });
    },

    /* Bind delete button events , @param { function } handler - Called with employee ID on delete */

    bindDelete(handler) {
        const tbody = document.querySelector('#employeeTable tbody');
        if (!tbody) return;

        tbody.addEventListener('click', async(e) => {
            if (e.target.classList.contains('deleteBtn')) {
                const id = e.target.dataset.id;
                if(confirm('Are you sure you want to delete this employee?')) {
                    await handler(id);
                }
            }
        });
    },

    /* Bind edit button events, @param {function} handler - Called with id, updateData */
    bindEdit(handler) {
        const tbody = document.querySelector('#employeeTable tbody');

        if (!tbody) return;
        
        tbody.addEventListener('click', async(e) => {
            if (e.target.classList.contains('editBtn')) {
                const id =  e.target.dataset.id;
                const newSalary = prompt('Enter new salary: ');
                if (newSalary !== null) {
                    await handler(id, { salary: newSalary });
                }
            }
        });
    }
};