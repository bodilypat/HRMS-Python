//src/pages/payroll/GeneratePayslip.jsx 

import { useState } from 'react';
import { generatePayslip } from '../../services/payrollService';

const GeneratePayslip = () => {
    const [from, setfrom] = useState({
        employeeId: '',
        month: '',
        basicSalary: '',
        allowances: '',
        deductions: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await generatePayslip(from);
        alert('Payslip generated successfully!');
        window.location.href = '/payroll/payslips';
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow-md">
            <h2 className="text-2xl font-bold mb-4">Generate Payslip</h2>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Employee ID</label>
                <input
                    type="text"
                    value={from.employeeId}
                    onChange={(e) => setfrom({...from, employeeId: e.target.value})}
                    className="w-full px-3 py-2 border rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Month</label>
                <input
                    type="month"
                    value={from.month}
                    onChange={(e) => setfrom({...from, month: e.target.value})}
                    className="w-full px-3 py-2 border rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Basic Salary</label>
                <input
                    type="number"
                    value={from.basicSalary}
                    onChange={(e) => setfrom({...from, basicSalary: e.target.value})}
                    className="w-full px-3 py-2 border rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Allowances</label>
                <input
                    type="number"
                    value={from.allowances}
                    onChange={(e) => setfrom({...from, allowances: e.target.value})}
                    className="w-full px-3 py-2 border rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Deductions</label>
                <input
                    type="number"
                    value={from.deductions}
                    onChange={(e) => setfrom({...from, deductions: e.target.value})}
                    className="w-full px-3 py-2 border rounded"
                />
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Generate Payslip
            </button>
        </form>
    );
};
export default GeneratePayslip;
