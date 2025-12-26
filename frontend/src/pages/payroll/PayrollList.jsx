//src/pages/payroll/PayrollList.jsx 

import { useState, useEffect } from 'react';
import { getPayrollList } from '../../services/payrollService';
import { Link } from 'react-router-dom';

const PayrollList = () => {
    const [payrolls, setPayrolls] = useState([]);

    useEffect(() => {
        fetchPayrolls();
    }, []);

    const fetchPayrolls = async () => {
        try {
            const data = await getPayrollList();
            setPayrolls(data);
        } catch (error) {
            console.error('Error fetching payrolls:', error);
        }
    };


    return (
        <div>
            <h1>Payroll List</h1>
            <ul>
                {payrolls.map(payroll => (
                    <li key={payroll.id}>
                        <Link to={`/payroll/${payroll.id}`}>
                            {payroll.employeeName} - {payroll.period}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default PayrollList;


