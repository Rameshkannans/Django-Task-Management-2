import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const UpdateTask = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();

    const [task, setTask] = useState({
        title: '',
        description: '',
        status: '',
        priority: '',
        due_date: '',
        assigned_to: '',
        image: null  
    });

    const [error, setError] = useState('');
    const [previewImage, setPreviewImage] = useState(null);

    // Fetch task details
    const getTask = async () => {
        try {
            const { data } = await axios.get(`http://127.0.0.1:8000/tasks/${id}/`);
            setTask({
                title: data.title,
                description: data.description,
                status: data.status,
                priority: data.priority,
                due_date: data.due_date ? data.due_date.substring(0, 16) : '',
                assigned_to: data.assigned_to || '',
                image: null  
            });
            setPreviewImage(data.image ? data.image : null);
        } catch (error) {
            console.error("Error fetching task:", error);
            setError("Failed to load task data.");
        }
    };

    useEffect(() => {
        getTask();
    }, [id]);

    // Handle Input Change
    const handleChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value });
    };

    // Handle Image Change
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setTask({ ...task, image: file });
        setPreviewImage(URL.createObjectURL(file));
    };

    // Handle Form Submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        
        formData.append('title', task.title);
        formData.append('description', task.description);
        formData.append('status', task.status);
        formData.append('priority', task.priority);
        formData.append('due_date', task.due_date);
        formData.append('assigned_to', task.assigned_to);
        
        if (task.image) {
            formData.append('image', task.image);
        }

        try {
            await axios.put(`http://127.0.0.1:8000/tasks/${id}/`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            navigate('/tasks');   
        } catch (error) {
            setError("Failed to update task. Please try again.");
            console.error("Error updating task:", error);
        }
    };

    return (
        <div className="container mt-5 d-flex justify-content-center">
            <div className="card shadow-lg p-4" style={{ maxWidth: '600px', width: '100%' }}>
                <h2 className="text-center text-primary mb-4">Update Task</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label fw-bold">Title</label>
                        <input type="text" name="title" className="form-control" value={task.title} onChange={handleChange} required />
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-bold">Description</label>
                        <textarea name="description" className="form-control" rows="3" value={task.description} onChange={handleChange}></textarea>
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-bold">Assigned To</label>
                        <input type="text" name="assigned_to" className="form-control" value={task.assigned_to} onChange={handleChange} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-bold">Status</label>
                        <select name="status" className="form-select" value={task.status} onChange={handleChange}>
                            <option value="pending">Pending</option>
                            <option value="in_progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-bold">Priority</label>
                        <select name="priority" className="form-select" value={task.priority} onChange={handleChange}>
                            <option value={1}>Low</option>
                            <option value={2}>Medium</option>
                            <option value={3}>High</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-bold">Due Date</label>
                        <input type="datetime-local" name="due_date" className="form-control" value={task.due_date} onChange={handleChange} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-bold">Task Image</label>
                        <input type="file" name="image" className="form-control" accept="image/*" onChange={handleImageChange} />
                        {previewImage && <div className="mt-3 text-center"><img src={previewImage} alt="Task Preview" className="img-thumbnail" width="200" /></div>}
                    </div>

                    <button type="submit" className="btn btn-success w-100 mb-2">Update Task</button>
                    <Link to={`/tasks/${id}`} className="btn btn-outline-danger w-100">❌ Cancel</Link>
                </form>
            </div>
        </div>
    );
};

export default UpdateTask;
