//src/pages/report/RecruitmentReport.jsx 

import { useState, useEffect, useCallback } from 'react';
import { getRecruitmentReport } from '../../services/reportService';
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableRow, 
    Paper, 
    Typography, 
    CircularProgress, 
    Box, 
    Button, 
    TextField } from '@components/common';

const RecruitmentReport = () => {
    const [reportData, setReportData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchReportData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getRecruitmentReport();
            setReportData(Array.isArray(data) ? data : []);
        } catch (err) {
            setError('Failed to fetch report data.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchReportData();
    }, [fetchReportData]);

    const getStatusColor = (status) => {
        switch (status) {
            case "Open":
                return "info";
            case "In Progress":
                return "warning";
            case "Closed":
                return "success";
            default:
                return "default";
        }
    };

    return (
        <Paper style={{ padding: 16 }}>
            <Typography variant="h6" gutterBottom>
                Recruitment Report
            </Typography>

            {/* Loading State */}
            {loading && (
                <Box sx={{ textAlign: 'center', py: 3 }}>
                    <CircularProgress />
                </Box>
            )}
            {/* Error State */}
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

            {/* Report Data Table */}
            {!loading && !error && reportData.length > 0 && (
                <Table size="small" >
                    <TableHead>
                        <TableRow>
                            <TableCell>Job Title</TableCell>
                            <TableCell>Department</TableCell>
                            <TableCell align="center">Opening</TableCell>
                            <TableCell align="center">Hired</TableCell>
                            <TableCell align="center">Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {reportData.map((job) => (
                            <TableRow key={job.id}>
                                <TableCell>{job.title}</TableCell>
                                <TableCell>{job.department}</TableCell>
                                <TableCell align="center">{job.openings}</TableCell>
                                <TableCell align="center">{job.hired}</TableCell>
                                <TableCell align="center">
                                    <Button
                                        variant="contained"
                                        color={getStatusColor(job.status)}
                                        size="small"
                                        disabled
                                    >
                                        {job.status}
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

export default RecruitmentReport;
