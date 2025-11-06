//src/services/attendanceService.js 

const BASE_URL = '/api/attendances';

const attendanceService = (() => {
   
    const getAllAttendances = async () => {
        try {
            const response = await fetch(BASE_URL);
            if (!response.ok) throw new Error(`Error feching attendances: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('attendanceService.getAllAttendances:', error);
            throw error;
        }
    };

    const getAttendanceByEmployee = async (employeeId) => {
        try {
            const response = await fetch(`${BASE_URL}/employee/${employeeId}`);
            if (!response.ok) throw new Error(`Error fetching employee attendances: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('attendanceService.getAttendanceById:', error);
            throw error;
        }
    };

   
    const getAttendanceById = async (id) => {
        try {
            const response = await fetch(`${BASE_URL}/${id}`);
            if (!response.ok) throw new Error(`Attendance not found: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('attedanceService.getAttendanceById:', error);
            throw error;
        }
    };

    
    const createAttendance = async (data) => {
        try {
            const response = await fetch(BASE_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (!response.ok) throw new Error(`Error creating attendance: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('attendanceService.createAttendance:', error);
            throw error;
        }
    };

  
    const updateAttendance = async (id, data) => {
        try {
            const response = await fetch(`${BASE_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            });
            if (!response.ok) throw new Error(`Error updating attendance: ${response.statgus}`);
            return await response.json();
        } catch (error) {
            console.error('attendanceService.updateAttendance:', error);
            throw error
        }
    };

    const deleteAttendance = async (id) => {
        try {
            const response = await fetch(`${BASE_URL}/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error(`Error deleting attendance: ${response.status}`);
        } catch (error) {
            console.error('attendanceService.deleteAttendance:', error);
            throw error;
        }
    };

    /* Public API */
    return {
        getAllAttendances,
        getAttendanceByEmployee,
        getAttendanceById,
        createAttendance,
        updateAttendance,
        deleteAttendance
    };
})();

export default attendanceService;