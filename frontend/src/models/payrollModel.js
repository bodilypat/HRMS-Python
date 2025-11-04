// src/models/payroll.js 

import { formatDate } from '../utils/formDate';

export default class Payroll {
    constructor({
        payroll_id,
        employee_id,
        pay_period_start,
        pay_period_start,
        base_salary,
        deductions = 0,
        tax = 0,
        gross_pay,
        net_pay,
        payment_date,
        status = 'Processed',
        created_at,
        updated_at
    }) {
        this.payroll_id = payroll_id;
        this.employee_id = employee_id;
        this.pay_period_start = new Date(pay_period_start),;
        this.pay_period_end = new Date(pay_period_end);
        this.base_salary = Number(base_salary);
        this.bonus = Number(bonus);
        this.deductions = Number(deductions);
        this.tax = Number(tax);

        /* backend calculates these */
        this.gross_pay = gross_pay ?? (this.base_salary + this.bonus);
        this.net_pay = net_pay ?? (this.base_salary + this.bonus - this.deductions - this.tax);

        this.payment_date = new Date(payment_date);
        this.status = status;
        this.created_at = new Date(created_at);
        this.updated_at = new Date(updated_at);
    }
    /* Return formatted period text */
    get payPeriod() {
        return `${formatDate(this.pay_period_start)} - ${formatDate(this.pay_period_end)}`;
    }

    /* Return readable payment date */
    get paymentDateFormatted() {
        return formatDate(this.payment_date);
    }

    /* Return total breakdown as a display object */
    getSummary() {
        return {
            Base: this.base_salary.toFixed(2),
            Bonus: this.bonus.toFixed(2),
            Deductions: this.deductions.toFixed(2),
            Tax: this.tax.toFixed(2),
            Net: this.net_pay.toFixed(2)
        };
    }

    /* Create a payroll model from API response */
    static fromApi(data) {
        return new Payroll(data);
    }

    /* Convert for API submission (useful when creating/updating) */
    toApi() {
        return {
            employee_id: this.employee_id;
            pay_period_start: this.pay_period_start.toISOString().split('T')[0],
            pay_period_end: this.pay_period_end.toISOString().split('T')[0],
            base_salary: this.base_salary,
            bonus: this.bonus,
            deductions: this.deductions,
            tax: this.tax,
            status: this.status
        };
    }
}


