//src/pages/leave/LeaveList.jsx

import { useEffect, useState } from "react";
import { getLeaveBalance } from "../../services/leaveService";

const LeaveBalance = () => {
    const [balance, setBalance] = useState(null);

    useEffect(() => {
        const fetchBalance = async () => {
            const data = await getLeaveBalance();
            setBalance(data);
        };
        fetchBalance();
    }, []);

    return (
        <div>
            <h2>Leave Balance</h2>
            {balance ? (
                <ul>
                    <li>Annual Leave: {balance.annual}</li>
                    <li>Sick Leave: {balance.sick}</li>
                    <li>Casual Leave: {balance.casual}</li>
                </ul>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};
export default LeaveBalance;
