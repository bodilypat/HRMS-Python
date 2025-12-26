//src/services/recruitmentService.js 

import api from "./api";
/* Recruitment Service
   Handles all recruitment-related API calls:
   - Job postings
   - Candidate applications
   - Application status updates 
   - Hiring workflow
*/

// Job APIs (HR / Admin)
export const getJobs = (params) => {
    return api.get("/recruitment/jobs", { params });
};

// Get job by ID
export const getJobById = (id) => {
    return api.get(`/recruitment/jobs/${id}`);
};

// Create a new job posting
export const createJob = (data) => {
    return api.post("/recruitment/jobs", data);
};

// Update an existing job posting
export const updateJob = (id, data) => {
    return api.put(`/recruitment/jobs/${id}`, data);
};

// Delete / close job posting
export const deleteJob = (id) => {
    return api.delete(`/recruitment/jobs/${id}`);
};

/* Candidate APIs */

// Apply for a job (Candidate / Employee)
export const applyForJob = (jobId, formData) => {
    return api.post(`/recruitment/jobs/${jobId}/applications`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

// Get all candidate for a job (HR / Admin)
export const getCandidatesForJob = (jobId, params) => {
    return api.get(`/recruitment/jobs/${jobId}/applications`, { params });
};

// Get candidate by ID
export const getCandidateById = (Id) => {
    return api.get(`/recruitment/applications/${Id}`);
};

// Update candidate application status (Approve / Reject / Interview))
export const updateCandidateStatus = (Id, data) => {
    return api.put(`/recruitment/applications/${Id}/status`, data);
};

// Add HR comments to candidate 
export const addCandidateComments = (Id, data) => {
    return api.post(`/recruitment/applications/${Id}/comments`, data);
};

// Schedule interview for candidate
export const scheduleInterview = (Id, data) => {
    return api.post(`/recruitment/applications/${Id}/interview`, data);
};

// Hire candidate
export const hireCandidate = (Id, data) => {
    return api.post(`/recruitment/applications/${Id}/hire`, data);
};

// Reject candidate
export const rejectCandidate = (Id, data) => {
    return api.post(`/recruitment/applications/${Id}/reject`, data);
};
// Get hiring workflow status
export const getHiringWorkflowStatus = (Id) => {
    return api.get(`/recruitment/applications/${Id}/workflow-status`);
};
// Update hiring workflow status
export const updateHiringWorkflowStatus = (Id, data) => {
    return api.put(`/recruitment/applications/${Id}/workflow-status`, data);
};

