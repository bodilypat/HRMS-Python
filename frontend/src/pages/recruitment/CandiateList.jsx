//src/pages/recruitment/CandidateList.jsx 

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCandidatesByJob } from '../../services/recruitmentService';

const CandidateList = () => {
    const { id } = useParams();
    const [candidates, setCandidates] = useState([]);

    useEffect(() => {
        getCandidatesByJob(id).then((response) => setCandidates(response.data));
    }, [id]);

    return (
        <div>
            <h2>Candidates for Job ID: {id}</h2>
            <ul>
                {candidates.map((candidate) => (
                    <li key={candidate.id}>{candidate.name} - {candidate.email}</li>
                ))}
            </ul>
        </div>
    );
};
export default CandidateList;

