//src/pages/recruitment/AddJob.jsx 

import { useState } from 'react';
import { createJob } from '../../services/recruitmentService';

const AddJob = () => {
    const AddJob = async (jobData) => {
        const [form, setForm] = useState({
            title: '',
            description: '',
            location: '',
            description: ''
        });

        const handleSubmit = async (e) => {
            e.preventDefault();
            await createJob(form);
            alert('Job created successfully!');
            window.location.href = '/recruitment/jobs';
        };

        return (
            <form onSubmit={handleSubmit} className="job-form">
                <h2>Add New Job</h2>
                <div>
                    <label>Job Title:</label>
                    <input
                        type="text"
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label>Location:</label>
                    <input
                        type="text"
                        value={form.location}
                        onChange={(e) => setForm({ ...form, location: e.target.value })}
                        required
                    />
                </div>
                <button type="submit">Create Job</button>
            </form>
        );
    }
    return AddJob();
};
export default AddJob;


    