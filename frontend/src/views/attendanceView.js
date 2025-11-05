//src/views/attendanceView.js 

import domUnit from '../controllers/domUnits.js';

const attendanceView = (() => {
    /* DOM Elements */
    const attendanceTable = document.getElementById('attendanceTableBody');
    const refreshBtn = document.getElementById('refreshAttendance');
    const attendanceCount = document.getElementById('attendanceCount');

    /* Render attendance rows */
    const renderAttendanceTable = (attendanceList = []) => {
        attendanceTable.innerHTML = '';
        
        if (attendanceList.length === 0){
            attendanceTable.innerHTML = `
                <tr>
                    <td colspan="8" class="text-center text-muted">No attendance records found</td>
                </tr>
            `;
            attendanceCount.textContent = 0;
            return;
        }

        attendanceList.forEach(a => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${a.attendance_id}</td>
                <td>${a.employee_id}</td>
                <td>${a.formatDate(a.attendance_date)}</td>
                <td>${a.check_id ? formatTime(a.check_in) : '-'}</td>
                <td>${a.check_out ? formatTime(a.check_out) : '-'}</td>
                <td><span class="badge bg-${getStatusColor(a.status)}">${a.status}</span><td>
                <td>${a.notes ? sanitizeText(a.notes) : '-'}</td>
                <td>${formatDateTime(a.updated_at)}</td>
            `;
            attendanceTable.appendChild(row);
        });
        
        attendanceCount.textContent = attendanceList.length;
    };

    /* Utility: color status badge */
    const getStatusColor = (status) => {
        switch (status) {
            case 'Present': return 'success';
            case 'Absent': return 'danger';
            case 'Leave': return 'warning';
            case 'Late': return 'info';
            default: return 'secondary';
        }
    };

    /* Utility: format date */
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numneric'
        });
    };

    /* Utility: format datetime */
    const formatDateTime = (dateString) => {
        if (!dateString) return '-';
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    /* Utility: format time */
    const formatTime = (timeValue) => {
        /* Handle both string (from backend) or Date object */
        const date = new Date(`1970-01-01T${timeValue}`);
        return date.toLocaleTimeString('en-US', { hour: '2-digit' });
    };

    /* Utility: santize text for HTML output */
    const sanitizeText = (text) => {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    };

    /* Bind refresh event */
    const bindRefresh = (handler) => {
        refreshBtn?.addEventListener('click', handler);
    };

    /* Public interface */
    return {
        renderAttendanceTable,
        bindRefresh
    };
})();

export default attendanceView;
