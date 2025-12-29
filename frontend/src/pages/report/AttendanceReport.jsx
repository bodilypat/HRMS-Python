//src/pages/report/AttendanceReport.jsx 

import { useState, useEffect, useCallback } from 'react';
import { getAttendanceReport } from '../../services/reportService';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    CircularProgress,
    Typography,
} from '@components/common';
 
const AttendanceReport = () => {
    const [reportData, setReportData] = useState([]);
    const [filtering, setFiltering] = useState({
        startDate: null,
        endDate: null,
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchReportData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getAttendanceReport(filtering);
            setReportData(Array.isArray(data) ? data : []);
        } catch (err) {
            setError("Failed to fetch attendance report: " + err.message);
        } finally {
            setLoading(false);
        }
    }, [filtering]);

    useEffect(() => {
        fetchReportData();
    }, [fetchReportData]);

    return (
        <Paper style={{ padding: 16 }}>
            <Typography variant="h6" gutterBottom>
                Attendance Report
            </Typography>

            {/*Filters*/}
            <Box sx={{ display: "flex", gap: 2, mb: 2}}>
                <TextField
                    type="date"
                    name="StartDate"
                    label="Start Date"
                    value={filtering.startDate || ''}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                    size="small"
                />
                <TextField
                    type="date"
                    name="EndDate"
                    label="End Date"
                    value={filtering.endDate || ''}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                    size="small"
                />
            </Box>

            {/* States */}
            {loading && (
                <Box sx={{ textAlign: "center", py: 3 }}>
                    <CircularProgress />
                </Box>
            )}
            {error && (
                <Typography color="error">{error}</Typography>
            )}

            {!loading && !error && reportData.length === 0 && (
                <Table size="small">
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={5} align="center">
                                No data available for the selected date range.
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            )}
            {!loading && !error && reportData.length > 0 && (
                <TableContainer>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Date</TableCell> 
                                <TableCell>Employee Name</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell align="center">Present</TableCell>
                                <TableCell align="center">Absent</TableCell>
                                <TableCell align="center">Late</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {reportData.map((record, index) => (
                                <TableRow key={index}>
                                    <TableCell>{record.date}</TableCell>
                                    <TableCell>{record.employeeName}</TableCell>
                                    <TableCell>{record.status}</TableCell>
                                    <TableCell align="center">{record.presentDate}</TableCell> 
                                    <TableCell align="center">{record.absentDate}</TableCell>
                                    <TableCell align="center">{record.lateDate}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Paper>
    );
};
export default AttendanceReport;
