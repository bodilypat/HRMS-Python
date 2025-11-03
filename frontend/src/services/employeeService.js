// frontend/src/services/employeeService.js

const API_BASE_URL = "/api/employees"; // Adjust if your backend uses another base path

export const employeeService = {
    /* Fetch all employees */
    async getAll() {
        try {
            const res = await fetch(API_BASE_URL);
            if (!res.ok) throw new Error(`Failed to fetch employees (${res.status})`);
            return await res.json();
        } catch (err) {
            console.error("Error fetching employees:", err);
            alert("Error loading employees. Please try again later.");
            return [];
        }
    },

    /* Get a single employee by ID */

    async getById(id) {
        try {
            const res = await fetch(`${API_BASE_URL}/${id}`);
            if (!res.ok) throw new Error(`Employee not found (${res.status})`);
            return await res.json();
        } catch (err) {
            console.error("Error fetching employee:", err);
            alert("Unable to load employee data.");
            return null;
        }
    },

    /* Create a new employee */
    async create(employeeData) {
        try {
            const res = await fetch(API_BASE_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(employeeData)
            });

            if (!res.ok) {
                const errText = await res.text();
                throw new Error(`Failed to create employee: ${errText}`);
            }

            return await res.json();
        } catch (err) {
            console.error("Error creating employee:", err);
            alert("Error adding employee. Please check the input and try again.");
            throw err;
        }
    },

    /* Update an existing employee */
    async update(id, updates) {
        try {
            const res = await fetch(`${API_BASE_URL}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updates)
            });

            if (!res.ok) {
                const errText = await res.text();
                throw new Error(`Failed to update employee: ${errText}`);
            }

            return await res.json();
        } catch (err) {
            console.error("Error updating employee:", err);
            alert("Error updating employee information.");
            throw err;
        }
    },

    /* Delete an employee */
    async delete(id) {
        try {
            const res = await fetch(`${API_BASE_URL}/${id}`, {
                method: "DELETE"
            });

            if (!res.ok) throw new Error(`Failed to delete employee (${res.status})`);
            return true;
        } catch (err) {
            console.error("Error deleting employee:", err);
            alert("Error deleting employee. Please try again.");
        }
    }
};
