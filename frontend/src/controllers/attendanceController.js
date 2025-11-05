//src/controllers/attendanceController.js 
import attendanceView from '../views/attendanceView.js';
import attendanceService from '../views/attendanceService.js'

const attendanceView = (() => {
    const init =  async () => {
        await loadAttendanceList();
        attendanceView.bindRefresh(loadAttendanceList);
    };

    const loadAttendanceList = async () => {
        try {
            const data = await attendanceService.getAllAttendances();
            attendanceView.renderAttendanceTable(data);
        } catch (error) {
            console.error('Failed to load attendance list:', error);
        }
    };
    return { init };
}) ();

export default attendanceController;

