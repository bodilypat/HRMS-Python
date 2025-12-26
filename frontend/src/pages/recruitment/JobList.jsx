//src/pages/recruitment/JobList.jsx 

import { useEffect, useState } from 'react';
import { getJobs } from '../../services/jobService';
import { Link } from 'react-router-dom';

const JobList = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        const response = await getJobs();
        setJobs(response.data);
    };

    return (
        <div>
            <h1>Job Listings</h1>
            <Link to="/recruitment/add">Add New Job</Link>
            <ul>
                {jobs.map(job => (
                    <li key={job.id}>
                        <Link to={`/recruitment/job/${job.id}`}>{job.title}</Link>
                    </li>
                ))}
            </ul>   
        </div>
    );
};
export default JobList;
