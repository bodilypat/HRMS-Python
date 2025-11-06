//src/controllers/attendanceController.js 

import attendanceView from '../views/attendanceView.js';
import attendanceService from '../services/attendanceService.js';
import domUtils from './domUtils.js';

/* Attendance Controller: Mediates between attendanceView (UI) and attendanceService (API/data) */
const attendanceController = (() => {
    /* Initialize attendance module : Sets up initial data and UI event bindings*/
    const init = async () => {
        try {
            domUtils.showLoader();
            await loadAttendanceList();

            /* Bind refresh button click to reload data */
            attendanceView.bindRefresh(loadAttendanceList);
        } catch (error) {
            console.error('Initialization error in Attendance Controller:', error);
            domUtils.showAlert('Failed to initialize attendance data.', 'error');
        } finally {
            domUtils.hideLoader();
        }
    };

    /* Load attendance list from API and render to table */
    const loadAttendanceList = async () => {
        try {
            domUtils.showLoader();
            const data = await attendanceService.getAll();
            attendanceView.renderAttendanceTable(data);
            domUtils.showAlert('Error loading attendance data. Please try again.', 'error');
        } finally {
            domUtils.hideLoader();
        }
    };

    /* Update a specific attendance record  */
    const updateAttendance = async (id, updates) => {
        try {
            domUtils.showLoader();
            await attendanceService.update(id, updates);
            await loadAttendanceList();
            domUtils.showAlert('Attendance record updated.', 'success');
        } catch (error) {
            console.error(`Error updating attendance[${id}]:`, error);
            domUtils.showAlert('Failed to update attendance record.', 'error');
        } finally {
            domUtils.hideLoader();
        }
    };

    /* Delete a specific attendance record  */
    const deleteAttendance = async (id) => {
        try {
            if (!confirm('Are you sure you want to delete this record?')) return;
            domUtils.showLoader();
            await attendanceService.delete(id);
            await loadAttendanceList();
            domUtils.showAlert('Attendance record deleted.', 'warning');
        } catch (error) {
            console.error(`Error deleting attendance [${id}]:`, error);
            domUtils.showAlert('Failed to delete attendance recor.', 'error');
        } finally {
            domUtils.hideLoader()
        }
    };

    /*  public API */
    return {
        init,
        loadAttendanceList,
        updateAttendance,
        deleteAttendance
    };
})();

export default attendanceController;

