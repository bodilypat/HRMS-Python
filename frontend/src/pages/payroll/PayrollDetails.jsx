//src/pages/payroll/PayrollDetails.jsx 

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPayrollById, downloadPayslip } from '../../services/payrollService';

const PayrollDetails = () => {
    const { id } = useParams();
    const [payroll, setPayroll] = useState(null);

    useEffect(() => {
        getPayrollById(id).then((response) => setPayroll(response.data));
    }, [id]);

    if (!payroll) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Payroll Details for {payroll.employeeName}</h1>
            <p>Employee ID: {payroll.employeeId}</p>
            <p>Month: {payroll.month}</p>
            <p>Basic Salary: {payroll.basicSalary}</p>
            <p>Allowances: {payroll.allowances}</p>
            <p>Deductions: {payroll.deductions}</p>
            <button onClick={() => downloadPayslip(payroll.id)}>Download Payslip</button>
        </div>
    );
};
export default PayrollDetails;
