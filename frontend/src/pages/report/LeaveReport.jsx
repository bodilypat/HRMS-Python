//src/pages/report/leaveReport.jsx

import { useState, useEffect, useCallback } from 'react';
import  { getLeaveReport } from '../../services/reportService';
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
    Box, 
    TextField,
    Chip
} from '@components/common';

const LeaveReport = () => {
    const [reportData, setReportData] = useState([]);
    const [filteredData, setFilteredData] = useState({
        startDate: null,
        endDate: null,
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const fetchReportData = useCallback(async () => {
        try{
            setLoading(true);
            setError
            const data = await getLeaveReport(filteredData.startDate, filteredData.endDate);
            setReportData(Array.isArray(data) ? data : []);
        } catch (err) {
            setError('Failed to fetch report data.');
        } finally {
            setLoading(false);
        } 
    }, [filteredData]);

    useEffect(() => {
        fetchReportData();
    }, [fetchReportData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilteredData((prevData) => ({
            ...prevData,
            [name]: value,
        }));    
    };

    const getStatusConlor = (status) => {
        switch (status) {
            case "Approved":
                return "success";
            case "Pending":
                return "warning";
            case "Rejected":
                return "error";
            default:
                return "default";
            }
    };

    return (
        <Paper sx={{ padding: 3 }}>
            <Typography variant="h6" gutterBottom>
                Leave Report
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
                <TextField
                    type="date"
                    name="startDate"
                    label="Start Date"
                    value={filteredData.startDate || ''}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    type="date"
                    name="endDate"
                    label="End Date"
                    value={filteredData.endDate || ''}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                />
            </Box>

            {/* Loading State */}
            {loading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
                    <CircularProgress />
                </Box>
            )}

            {/* Error State */}
            {error && (
                <Typography color="error" variant="body1">
                    {error}
                </Typography>
            )}

            {/* Report Table */}
            {!loading && !error && reportData.length > 0 && (
                <TableContainer align="center" color="text.secondary">
                    No leave records found for the selected period.
                </TableContainer>
            )}

            {/* Table Display */}
            {!loading && !error && reportData.length > 0 && (
                <Table sise="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Employee Name</TableCell>
                            <TableCell>Leave Type</TableCell>
                            <TableCell>Start Date</TableCell>
                            <TableCell>End Date</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {reportData.map((record) => (
                            <TableRow key={record.id}>
                                <TableCell>{record.employeeName}</TableCell>
                                <TableCell>{record.leaveType}</TableCell>
                                <TableCell>{record.startDate}</TableCell>
                                <TableCell>{record.endDate}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={record.status}
                                        color={getStatusColor(record.status)}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </Paper>
    );
};
export default LeaveReport;

