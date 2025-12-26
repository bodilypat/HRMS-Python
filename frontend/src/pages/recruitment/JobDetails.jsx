//src/pages/recruitment/JobDetial.jsx

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getJobById } from '../../services/recruitmentService';

const JobDetail = () => {
    const { id } = useParams();
    const [job, setJob] = useState(null);

    useEffect(() => {
        getJobById(id).then((response) => setJob(response.data));
    }, [id]);


    if (!job) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{job.title}</h1>
            <p>{job.description}</p>
            <p>Location: {job.location}</p>
            <p>Type: {job.type}</p>
            <p>Posted on: {new Date(job.postedDate).toLocaleDateString()}</p>
            <Link to={`/recruitment/edit/${id}`}>Edit</Link>
            <Link to={`/recruitment/${id}/candidates`}>View Candidates</Link>
        </div>
    );
};
export default JobDetail;
