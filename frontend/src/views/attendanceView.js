//src/views/attendanceView.js 

import domUtils from '../controllers/domUtils.js';

/* Attendance view, Responsible for rendering attendance records and handling user interactions */
const attendanceView = (() => {
    const getElements = () => ({
        tableBody: document.getElementById('attendanceTableBody'),
        ReferenBtn: document.getElementById('refreshAttendance'),
        countLabel: document.getElementById('attendanceCount')
    });

    /* Render the attendance table, @param {Array<Object> } attendanceList - List of attendance records */
    const renderAttendanceTable =  (attendanceList = []) => {
        const { tableBody, countLabel } = getElements();
        if (!tableBody) return;

        domUtils.clearElement(tableBody);

        if (!attendanceList.length) {
            domUtils.setHTML(
                tablebody,
                `<tr>
                    <td colspan="8" class="text-center text-muted">
                        No attendance record found.
                    </td>
                </tr>`
            );
            if (countLabel) countLabel.textContent = '0';
            return;
        }

        const rowsHTML = attendanceList 
            .map(a => ` 
                <tr data-id="{a.attendance_id}">
                    <td>${a.attendance_id}</td>
                    <td>${a.employee_id}</td>
                    <td>${a.formatDate(a.attendance_date)}</td>
                    <td>${a.check_in ? formatTime(a.check_in) : '-'}</td>
                    <td>${a.check_out ? formatTime(a.check_out) : '-'}</td>
                    <td><span class="badge bg-${getStatusColor(a.status)}">${sanitizeText(a.status)}</span></td>
                    <td>${a.notes ? sanitizeText(a.notes) : '-'}</td>
                    <td>${formatDateTime(a.updated_at)}</td>
                </tr>
            `).join('');
        domUtils.setHTML(tableBody, rowsHTML);
        if (countLabel) countLabel.textContent = attendanceList.length.toString();
    };

    /* Utilities: Get badge color for attendance status. */
    const getStatusColor = (status) => {
        switch(status) {
            case 'Present': return 'success';
            case 'Absent': return 'danger';
            case 'Leave': return 'warning';
            case 'Late': return 'info';
            default: return 'secondary';
        }
    };

    /* Format a date */
    const formatDate = (dateString) => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    /* Format date + time to human-readable form. */
    const formatDateTime = (dateString) => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return date.toLocaleString('en-US',  {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    /* Format a time string (HH:MM:SS -> 12 hour format) */
    const formatTime = (timeValue) => {
        if (!timeValue) return '-';
        const date = new Date(`1970-01-01T${timeValue}`);
        return date.toLocaleDateString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    /* Sanitize text for safe Html OUTPUT */
    const sanitizeText = (text) => {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    };

    /* Event binding: Bind refresh button click event. */
    const bindRefresh = (handler) => {
        const { refreshBtn } = getElements();
        refreshBtn?.addEventListener('click', handler);
    };

    /* Pubic interface */
    return {
        renderAttendanceTable,
        bindRefresh
    };

})();

export default attendanceView;

