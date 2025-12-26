//src/page/recruitment/ApplicationStatus.jsx 

import { updateCandidateStatus } from '../../services/recruitmentService';

const ApplicationStatus = ({ applicationId }) => {
    const updateStatus = async (newStatus) => {
        await updateCandidateStatus(applicationId, newStatus);
        alert('Status updated successfully!');
        window.location.reload();
    };

    return (
        <div>
            <button onClick={() => updateStatus('Reviewed')}>Mark as Reviewed</button>
            <button onClick={() => updateStatus('Interviewed')}>Mark as Interviewed</button>
        </div>
    );
};

export default ApplicationStatus;
