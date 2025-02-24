import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const TaskDetail = () => {
    const [task, setTask] = useState(null);
    const { id } = useParams();  
    const navigate = useNavigate();  

    // Fetch task details
    const getSingleTask = async () => {
        try {
            const { data } = await axios.get(`http://127.0.0.1:8000/tasks/${id}/`);
            setTask(data);
        } catch (error) {
            console.error("Error fetching task details:", error);
        }
    };

    // Delete task
    const deleteTask = async () => {
        try {
            await axios.delete(`http://127.0.0.1:8000/tasks/${id}/`);
            navigate('/tasks');
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    useEffect(() => {
        getSingleTask();
    }, [id]);  

    // Show loading until data is fetched
    if (!task) {
        return <div className="text-center mt-4">Loading...</div>;
    }

    return (
        <div className="container my-5">
            <div className="card shadow-lg border-0" style={{ maxWidth: '800px', margin: 'auto' }}>
                {task.image && (
                    <img
                        src={task.image}
                        className="card-img-top img-fluid rounded-top"
                        alt={task.title}
                        style={{ height: '250px', objectFit: 'cover' }}
                    />
                )}
                <div className="card-body p-4">
                    <h2 className="card-title text-center text-primary mb-3">{task.title}</h2>
                    <p className="card-text"><strong>Description:</strong> {task.description}</p>
                    <p className="card-text"><strong>Status:</strong>
                        <span className={task.status === "completed" ? "badge bg-success" : "badge bg-warning text-dark"}>
                            {" "}{task.status.replace("_", " ").toUpperCase()}
                        </span>
                    </p>
                    <p className="card-text"><strong>Priority:</strong> <span className="badge bg-secondary">{task.priority}</span></p>
                    <p className="card-text"><strong>Due Date:</strong> {new Date(task.due_date).toLocaleString()}</p>
                    <p className="card-text"><strong>Assigned To:</strong> {task.assigned_to || "Unassigned"}</p>
                    <p className="card-text"><strong>Completed:</strong>
                        {task.completed ? <span className="text-success"> ✅ Yes</span> : <span className="text-danger"> ❌ No</span>}
                    </p>
                    <p className="card-text"><strong>Created At:</strong> {new Date(task.created_at).toLocaleString()}</p>
                    <p className="card-text"><strong>Updated At:</strong> {new Date(task.updated_at).toLocaleString()}</p>

                    <div className="d-flex justify-content-between mt-4">
                        <button className="btn btn-outline-primary" onClick={() => navigate('/tasks')}>🔙 Back to Tasks</button>
                        <button className="btn btn-outline-danger" onClick={deleteTask}>🗑 Delete Task</button>
                        <Link to={`/tasks/update/${task.id}`} className="btn btn-outline-warning">✏️ Edit Task</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskDetail;