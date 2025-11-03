// frontend/src/views/employeeView.js 
export const employeeView = {
    /**
     *  Render the Add Employee from and employee table 
     * @param {HTMLElement} container - The container to render into
    */
    renderFrom(container) {
        container.innerHTML = `
            <form id="addEmployeeForm" class="employee-form">
                <h3>Add Employee</h3>
                    <div class="form-group">
                        <input id="first_name" name="first_name" placeholder="first_name" required />
                        <input id="last_name" name="last_name" placeholder="Last Name" required />
                        <input id="email" name="email" placeholder="Email" required />
                        <input id="phone" name="phone" placeholder="Phone" />
                        <input id="hire_date" name="hire_date" type="date" required />
                        <input id="department_id" name="department_id" type="number" placeholder="Department" required />
                        <input id="position" name="department" placeholder="Position" />
                        <input id="salary" name="salary" type="number" step="0.01" placeholder="Salary" />
                        <input id="manager_id" name="manager_id" type="number" placeholder="Manager ID" />
                    </div>
                    <button type="submit" class="btn btn-primary">Add Employee</button>
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

   /**
     *  Render Employee into the table body 
     * @param {Array<Object>} employees - List of employee objects
    */
    renderTable(employees = []) {
        const tbody = document.querySelector('#employeeTable tbody');
        if (!tbody) return;

        tbody.innerHTML = employees.length
            ? employees.map(e => `
                    <tr data-id="${e.employee_id}">
                       <td>${e.employee_id}</td>
                       <td>${e.employee_id}</td>
                       <td>${e.first_name} ${e.last_name}</td>
                       <td>${e.email}</td>
                       <td>${e.department_name || e.department_id || '-'}</td>
                       <td>${e.position || '-'}</td>
                       <td>${e.salary ? `$${Number(e.salary).toFixed(2)}` : '-'}</td>
                       <td>${e.status || 'Active'}</td>
                       <td>
                            <button data-id="${e.employee_id}" class="btn editBtn">Edit</button>
                            <button data-id="${e.employee_id}" class="btn deleteBtn">Delete</button>
                       </td>
                    </tr>
                `).join("")
                : `<tr><td colspan="8" style="text-align:center;">No employees found</td><tr>`;
    },

    /**
     *  Bind the Add Employee form submssion 
     * @param { Function } handler - Callback to handle new employee data
    */

    bindAdd(handler) {
        const form = document.getElementById("addEmployeeForm");
        if (!form) return;

        form.addEventListener("submit", e => {
            e.preventDefault();
            const data = {
                first_name: form.first_name.value.trim(),
                last_name: form.last_name.value.trim(),
                email: form.email.value.trim(),
                phone: form.phone.value.trim(),
                hire_date: form.hire_date.value.trim(),
                department_id: form.hire_date.value.trim(),
                position: form.position.value.trim(),
                salary: form.salary.value ? parseFloat(form.salary.value) : null,
                manager_id: form.manager_id.value || null,
                status: "Active"
            };

            handler(data);
            form.reset(); 
        });
    },

    /**
     *  Bind delete button events on employee rows 
     * @param {Function} hander - Callback to handle delete (id)
    */

    bindDelete(handler)     {
        const table = document.querySelector("#employeeTable");
        if (!table) return 

        table.addEventListener("click", e => {
            if (e.target.classList.contains("deleteBtn")) {
                const id = Number(e.target.dataset.id);
                if (confirm("Are you sure you want to delete this employee?")) {
                    handler(id);
                }
            }
        });
    },

    /**
     *  Bind edit button events on employee 
     * @param {Function} handler - callback to handle edit (id, updateData)
    */

    bindEdit(handler) {
        const table = document.querySelector("#employeeTable");
        if (!table) return;

        table.addEventListener("click", e => {
            if (e.target.classList.contains("editBtn")) {
                const id = Number(e.target.dataset.id);
                const newFirstName = prompt("Enter new first name:");
                if (newFirstName) {
                    handler(id, {first_name: newFirstName.trim() });
                }
            }
        });
    }
};