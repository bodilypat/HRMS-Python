//src/pages/recruitment/EditJob.jsx 

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getJobById, updateJob } from '../../services/recruitmentService';

const EditJob = () => {
    const { id } = useParams();
    const [form, setForm] = useState({});

    useEffect(() => {
        getJobById(id).then((response) => setForm(response.data));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        updateJob(id, form).then(() => {
            alert('Job updated successfully!');
            window.location.href = `/recruitment/job/${id}`;
        });
    };

    return (
        <form onSubmit={handleSubmit}>
        <h2>Edit Job</h2>
        <label>
            Job Title:
            <input
                type="text"
                value={form.title || ''}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
        </label>
        <br />
        <label>
            Description:
            <textarea
                value={form.description || ''}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
            />  
        </label>
        <br />
        <button type="submit">Update Job</button>
    </form>
    );
}
export default EditJob;
