//src/pages/payroll/PayrollSettings.jsx 

import { useEffect, useState } from 'react';
import { getPayrollSettings, updatePayrollSettings } from '../../services/payrollService';

const PayrollSettings = () => {
    const [settings, setSettings] = useState({
        basicPercentage: "",
        hraPercentage: "",
        conveyanceAllowance: "",
        medicalAllowance: "",
        specialAllowance: "",
        taxPercentage: ""
    });

    useEffect(() => {
        getPayrollSettings().then(data => setSettings(data));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updatePayrollSettings(settings);
        alert('Payroll settings updated successfully!');
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Payroll Settings</h2>
            <label>
                Basic Percentage:
                <input
                    type="number"
                    value={settings.basicPercentage}
                    onChange={(e) => setSettings({ ...settings, basicPercentage: e.target.value })}
                />
            </label>
            <label>
                HRA Percentage:
                <input
                    type="number"
                    value={settings.hraPercentage}
                    onChange={(e) => setSettings({ ...settings, hraPercentage: e.target.value })}
                />
            </label>
            <label>
                Conveyance Allowance:
                <input
                    type="number"
                    value={settings.conveyanceAllowance}
                    onChange={(e) => setSettings({ ...settings, conveyanceAllowance: e.target.value })}
                />
            </label>
            <label>
                Medical Allowance:
                <input
                    type="number"
                    value={settings.medicalAllowance}
                    onChange={(e) => setSettings({ ...settings, medicalAllowance: e.target.value })}
                />
            </label>
            <label>
                Special Allowance:
                <input
                    type="number"
                    value={settings.specialAllowance}
                    onChange={(e) => setSettings({ ...settings, specialAllowance: e.target.value })}
                />
            </label>
            <label>
                Tax Percentage:
                <input
                    type="number"
                    value={settings.taxPercentage}
                    onChange={(e) => setSettings({ ...settings, taxPercentage: e.target.value })}
                />
            </label>
            <button type="submit">Save Settings</button>    
        </form>
    );
};
export default PayrollSettings;
