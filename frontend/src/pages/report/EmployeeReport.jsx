//src/pages/report/EmployeeReport.jsx 

import { useState, useEffect, useCallback } from 'react';
import { getEmployeeReport } from '../../services/reportService';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper,
    CircularProgress,
    Typography,
    Box,
    TextField,
    Chip,
} from '@components/common';

const EmployeeReport = () => {
    const [reportData, setReportData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchReportData = useCallback(async () => {

        try{
            setLoading(true);
            setError(null); 
            const data = await getEmployeeReport();
            setReportData(Array.isArray(data) ? data : []);
        } catch (err) {
            setError("Failed to fetch report data.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchReportData();
    }, [fetchReportData]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Active':
                return 'success';
            case 'Inactive':
                return 'default';
            case 'On Leave':
                return 'warning';
            default:
                return 'default';
        }
    };
    
    return (
        <Paper sx={{ padding: 3 }}>
            <Typography variant="h6" gutterBottom>
                Employee Report
            </Typography>

            {/* States */}
            {loading && ( 
                <Box sx={{ textAlign: "center", padding: 3 }}>
                    <CircularProgress />
                </Box>
            )}

            {error && (
                <Typography color="error" align="center">
                    {error}
                </Typography>
            )}

            {!loading && !error && reportData.length === 0 && (
                <Typography align="center">No records found.</Typography>
            )}

            {/* Table Data */}
            {!loading && !error && reportData.length > 0 && (
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Employee ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Department</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {reportData.map((employee) => (
                            <TableRow key={employee.employee.id}>
                                <TableCell>{employee.employee.id}</TableCell>
                                <TableCell>{employee.employee.name}</TableCell>
                                <TableCell>{employee.employee.department}</TableCell>
                                <TableCell>{employee.employee.role}</TableCell>
                                <TableCell>{employee.employee.joinDate}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={employee.employee.status}
                                        color={getStatusColor(employee.employee.status)}
                                        size="small"
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

export default EmployeeReport;
