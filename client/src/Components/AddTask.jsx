import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddTask = () => {
    const navigate = useNavigate();

    const [task, setTask] = useState({
        title: '',
        description: '',
        status: '',
        priority: '',
        due_date: '',
        assigned_to: ''
    });

    const [error, setError] = useState('');

    // Handle Input Change
    const handleChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value });
    };

    // Submit Form
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('http://127.0.0.1:8000/tasks/', task);
            navigate('/tasks');  
        } catch (error) {
            setError("Failed to add task. Please try again.");
            console.error("Error adding task:", error);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center">Add New Task</h2>
            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input
                        type="text"
                        name="title"
                        className="form-control"
                        value={task.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                        name="description"
                        className="form-control"
                        rows="3"
                        value={task.description}
                        onChange={handleChange}
                    ></textarea>
                </div>

                <div className="mb-3">
                    <label className="form-label">Assigned To</label>
                    <input
                        type="text"
                        name="assigned_to"
                        className="form-control"
                        value={task.assigned_to}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Status</label>
                    <select
                        name="status"
                        className="form-control"
                        value={task.status}
                        onChange={handleChange}
                    >
                        <option value="pending">Pending</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Priority</label>
                    <select
                        name="priority"
                        className="form-control"
                        value={task.priority}
                        onChange={handleChange}
                    >
                        <option value={1}>Low</option>
                        <option value={2}>Medium</option>
                        <option value={3}>High</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Due Date</label>
                    <input
                        type="datetime-local"
                        name="due_date"
                        className="form-control"
                        value={task.due_date}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit" className="btn btn-success w-100">Add Task</button>
            </form>
        </div>
    );
};

export default AddTask;
    