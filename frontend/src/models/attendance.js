//src/models/attendance.js 

/* Represent a single attendance record and provides, helpers for API <-> Model <-> transformations. */

export default class Attendance {
    constructor({
        attendance_id,
        employee_id,
        attendance_date,
        check_in = null,
        check_out = null,
        status = 'Absent',
        notes = '',
        updated_at = null,
    }) {
        this.attendance_id = attendance_id;
        this.employee_id = employee_id;
        this.attendance_date = attendance_date;
        this.check_in = check_in;
        this.check_out = check_out;
        this.status = status;
        this.notes = notes;
        this.updated_at = updated_at;
    }

    /* FACTORY METHODS: Convert API response -> Model instance */

    static fromApi(apiData) {
        if (!apiData) return null;

        return new Attendance({
            attendance_id: apiData.id || apiData.attendance_id,
            employee_id: apiData.employee_id,
            attendance_data: apiData.attendance_data,
            check_in: apiData.check_in,
            check_out: apiData.check_out,
            status: apiData.status || 'Absent',
            notes: apiData.notes || '',
            updated_at: apiData.updated_at || apiData.modified_at,
        });
    }

    /* Convert Model instance -> API payload (for POST / PUT requests ) */
    toApi() {
        return {
            id: this.attendance_id,
            employee_id: this.employee_id,
            attendance_date: this.attendance_date,
            check_in: this.check_in,
            check_out: this.check_out,
            status: this.status,
            notes: this.notes
        };
    }

    /* VIEW HELPERS */
    get formattedDate() {
        if (!this.attendance_date) return '-';
        const date = new Date(this.attendance_date);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    }

    /* Format time fields for display */
    get formattedCheckIn() {
        return this.formatTime(this.check_in);
    }

    get formattedCheckOut() {
        return this.formatTime(this.check_out);
    }

    /* Format update timestamp */
    get formattedUpdatedAt() {
        if (!this.updated_at) return '-';
        const date = new Date(this.updated_at);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    }

    /* Format time to 12 - hour readable for format */
    formatTime(timeValue) {
        if (!timeValue) return '-';
        const date = new Date(`1970-01-01T${timeValue}`);
        return date.toLocaleDateString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        });
    }

    /* STATUS UTILS : Return Bootstrap-like color for status badge */

    static getStatusColor(status) {
        switch(status) {
            case 'Present': return 'success';
            case 'Absent': return 'danger';
            case 'Leave': return 'warning';
            case 'Late': return 'info';
            default: return 'secondary';
        }
    }
}