// DeleteProjectModal.js
import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import axios from 'axios';
import '../CSS/DeleteProjectModal.css'; 


const DeleteProjectModal = ({ visible, onHide }) => {
    const [projectNames, setProjectNames] = useState([]);
    const [selectedProjectName, setSelectedProjectName] = useState('');

    useEffect(() => {
        const fetchProjectNames = async () => {
            try {
                const token = sessionStorage.getItem('token');
                if (!token) {
                    console.error("Token not found in sessionStorage.");
                    return;
                }

                const response = await axios.get('https://autobotzi-ccec90c77ecb.herokuapp.com/projects', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setProjectNames(response.data.map(project => project.name));
            } catch (error) {
                console.error("Error fetching project names:", error);
            }
        };

        if (visible) {
            fetchProjectNames();
        }
    }, [visible]);

    const handleDelete = async () => {
        try {
            const token = sessionStorage.getItem('token');
            if (!token) {
                console.error("Token not found in sessionStorage.");
                return;
            }

            const response = await axios.delete(`https://autobotzi-ccec90c77ecb.herokuapp.com/projects?name=${selectedProjectName}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log("Project deleted successfully:", response.data);

            onHide();
        } catch (error) {
            console.error("Error deleting project:", error);
        }
    };

    const handleOverlayClick = (e) => {
        e.stopPropagation(); // Prevent click event from reaching underlying dialog
    };

    return (
        <div className={`delete-project-overlay ${visible ? 'visible' : ''}`} onClick={handleOverlayClick}>
            <Dialog visible={visible} onHide={onHide} className="delete-project-dialog" modal header="Delete Project" closeOnEscape={false}>
                <div className="delete-project-content">
                    <div className="delete-project-field">
                        <label htmlFor="projectName">Select Project to Delete:</label>
                        <select id="projectName" value={selectedProjectName} onChange={(e) => setSelectedProjectName(e.target.value)}>
                            <option value="">Select a project</option>
                            {projectNames.map((projectName, index) => (
                                <option key={index} value={projectName}>{projectName}</option>
                            ))}
                        </select>
                    </div>
                    <div className="delete-project-button">
                        <Button label="Confirm" onClick={handleDelete} />
                    </div>
                </div>
            </Dialog>
        </div>
    );
};

export default DeleteProjectModal;
