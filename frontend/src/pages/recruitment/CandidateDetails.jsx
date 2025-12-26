//src/pages/recruitment/CandidateDetails.jsx

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCandidateById } from '../../services/candidateService';
import ApplicationStatus from "./ApplicationStatus";

const CandidateDetails = () => {
    const { id } = useParams();
    const [candidate, setCandidate] = useState(null);

    useEffect(() => {
        getCandidateById(id).then((response) => setCandidate(response.data));
    }, [id]);

    if (!candidate) return <div>Loading...</div>;

    return (
        <div>
            <h2>Candidate Details</h2>
            <p><strong>Name:</strong> {candidate.name}</p>
            <p><strong>Email:</strong> {candidate.email}</p>
            <p><strong>Phone:</strong> {candidate.phone}</p>
            <ApplicationStatus candidateId={id} currentStatus={candidate.applicationStatus} />
        </div>
    );
};
export default CandidateDetails;
