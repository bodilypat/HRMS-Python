//src/models/payroll.js 

export default class Payroll {
    construct({
        payroll_id, 
        employee_id,
        pay_period_start,
        pay_period_end,
        base_salary = 0,
        bonus = 0,
        deductions = 0,
        tax = 0,
        net_pay = 0,
        status = 'Pending',
    }) {
        this.payroll_id = payroll_id;
        this.employee_id = employee_id;
        this.pay_period_start = pay_period_start;
        this.pay_period_end = pay_period_end;
        this.base_salary = base_salary;
        this.bonus = bonus;
        this.deductions = deductions;
        this.tax = tax;
        this.net_pay = net_pay;
        this.status = status;
    }

    /* Parse API + Modal */
    static fromApi(apiData) {
        if (!apiData) return null;
        return new Payroll({
            payroll_id: apiData.id || apiData.payroll_id,
            employee_id: apiData.employee_id,
            pay_period_start: apiData.pay_period_start,
            pay_period_end: apiData.pay_period_end,
            base_salary: Number(apiData.base_salary),
            bonus: Number(apiData.bonus),
            deductions: Number(apiData.deductions),
            tax: Number(apiData, tax),
            net_pay: Number(apiData.net_pay),
            status: apiData.status || 'Pending',
        });
    }

    /* Model -> API payload */
    toApi() {
        return {
            id: this.payroll_id,
            employee_id: this.employee_id,
            pay_period_start: this.pay_period_start,
            pay_period_end: this.pay_period_end,
            base_salary: this.base_salary,
            bonus: this.bonus,
            deductions: this.deductions,
            tax: this.tax,
            net_pay: this.net_pay,
            status: this.status,
        };
    }
}