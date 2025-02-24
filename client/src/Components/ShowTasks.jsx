import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const ShowTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const getTasks = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/tasks/');
            setTasks(response.data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    useEffect(() => {
        getTasks();
    }, []);

    // Filter tasks based on search query
    const filteredTasks = tasks.filter(task =>
        Object.values(task).some(value =>
            value && value.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

    return (
        <div className="container my-5">
            <h2 className="text-center mb-4">Task List</h2>

            <div className="d-flex justify-content-between mb-4">
                <input
                    type="text"
                    className="form-control w-50"
                    placeholder="Search tasks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Link to="/tasks/add" className="btn btn-primary">➕ Add Task</Link>
            </div>

            <div className="row g-4">
                {filteredTasks.length > 0 ? (
                    filteredTasks.map(task => (
                        <div key={task.id} className="col-md-4">
                            <div className="card shadow-sm" style={{ width: '100%', height: '100%' }}>
                                {task.image && (
                                    <img 
                                        src={task.image} 
                                        className="card-img-top" 
                                        alt={task.title} 
                                        style={{ height: '200px', objectFit: 'cover' }} 
                                    />
                                )}
                                <div className="card-body d-flex flex-column justify-content-between" style={{ height: '250px' }}>
                                    <h5 className="card-title text-truncate">{task.title}</h5>
                                    <p className="card-text"><strong>Assigned To:</strong> {task.assigned_to || "Unassigned"}</p>
                                    <p className="card-text">
                                        <strong>Status:</strong> {task.completed ?
                                            <span className="text-success"> ✅ Completed</span> :
                                            <span className="text-danger"> ❌ Pending</span>}
                                    </p>
                                    <div className="mt-auto">
                                        <Link to={`/tasks/${task.id}`} className="btn btn-primary w-100">View Details</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-12 text-center">
                        <p>No tasks available</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ShowTasks;
