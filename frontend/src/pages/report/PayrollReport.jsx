//src/pages/report/PayrollReport.jsx 

import { useState, useEffect, useCallback } from 'react';
import { getPayrollReport } from '../../services/reportService';
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableContainer,
    Paper,
    CircularProgress,
    Typography,
    Box,
    TextField,
    Chip
} from '@components/common';

const PayrollReport = () => {
    const [reportData, setReportData] = useState([]);
    const [filter, setFilter] = useState({
        month: '',
        year: ''
    }); 

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchReport = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getPayrollReport(filter);
            setReportData(Array.isArray(data) ? data : []);
        
        } catch (err) {
            setError('Failed to fetch report data.');
        } finally {
            setLoading(false);
        }
    } , [filter]);


    useEffect(() => {
        if (filter.month && filter.year) {
            fetchReport();
        }
    }, [fetchReport, filter]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilter((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <Paper sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>
                Payroll Report
            </Typography>


            {/* Filter Section */}
                <Box sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
                    <TextField
                        type="month"
                        name="month"
                        label="Payroll Month"
                        value={filter.month}
                        onChange={handleFilterChange}
                        InputLabelProps={{ shrink: true }}
                        size="small"
                    />
                </Box>
                
            {/* States */}
            {loading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
                    <CircularProgress />
                </Box>
            )}

            {error && (
                <Typography color="error" align="center">
                    {error}
                </Typography>
            )}  

            {!loading && !error && reportData.length === 0 && (
                <Typography align="center" color="textSecondary">
                    No data available.
                </Typography>
            )}

            {/* Table Data */}
            {!loading && !error && reportData.length > 0 && (
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Employee</TableCell>
                            <TableCell align="right">Basic Salary</TableCell>
                            <TableCell align="right">Allowances</TableCell>
                            <TableCell align="right">Deductions</TableCell>
                            <TableCell align="right">Net Salary</TableCell>
                            <TableCell align="right">Payslip</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {reportData.map((record) => (
                            <TableRow key={`${record.employeeId} - ${record.month}`}>
                                <TableCell>{record.employeeName}</TableCell>
                                <TableCell align="right">{formatCurrency(record.basicSalary)}</TableCell>
                                <TableCell align="right">{formatCurrency(record.allowances)}</TableCell>
                                <TableCell align="right">{formatCurrency(record.deductions)}</TableCell>
                                <TableCell align="right">{formatCurrency(record.netSalary)}</TableCell>
                                <TableCell align="center">{record.payslip}</TableCell>
                                <TableCell align="right">
                                    <Button 
                                        size="small"
                                        variant="outlined"
                                        onClick={() => alert(`handleDownloadPayslip(record.employeeId, record.month)`)}
                                    >
                                        Download
                                    </Button>

                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>            
            )}
        </Paper>
    );
};
export default PayrollReport;

