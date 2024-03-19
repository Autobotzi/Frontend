import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import axios from 'axios';
import '../CSS/EditProjectModal.css'; // Import CSS file

const EditProjectModal = ({ visible, onHide }) => {
    const [projectNames, setProjectNames] = useState([]);
    const [selectedProjectName, setSelectedProjectName] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        period: '',
        status: ''
    });

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
    try {
        const token = sessionStorage.getItem('token');
        if (!token) {
            console.error("Token not found in sessionStorage.");
            return;
        }

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };

        const data = {
            "name": formData.name,
            "description": formData.description,
            "period": formData.period,
            "status": formData.status
        };

        const response = await axios.put(`https://autobotzi-ccec90c77ecb.herokuapp.com/projects?name=${selectedProjectName}`, data, config);

        console.log("Project updated successfully:", response.data);

        onHide();
        setFormData({
            name: '',
            description: '',
            period: '',
            status: ''
        });
        window.location.reload();
    } catch (error) {
        console.error("Error updating project:", error);
    }
};

    
    
    const handleOverlayClick = (e) => {
        e.stopPropagation(); // Prevent click event from reaching underlying dialog
    };

    return (
        <div className={`edit-project-overlay ${visible ? 'visible' : ''}`} onClick={handleOverlayClick}>
            <Dialog visible={visible} onHide={onHide} className="edit-project-dialog" modal header="Edit Project" closeOnEscape={false}>
                <div className="edit-project-content">
                    <div className="edit-project-field">
                        <label htmlFor="projectName">Project Name</label>
                        <select id="projectName" name="projectName" value={selectedProjectName} onChange={(e) => setSelectedProjectName(e.target.value)}>
                            <option value="">Select a project</option>
                            {projectNames.map((projectName, index) => (
                                <option key={index} value={projectName}>{projectName}</option>
                            ))}
                        </select>
                    </div>
                    <div className="edit-project-field">
                        <label htmlFor="name">Name</label>
                        <input id="name" type="text" name="name" value={formData.name} onChange={handleChange} />
                    </div>
                    <div className="edit-project-field">
                        <label htmlFor="description">Description</label>
                        <input id="description" type="text" name="description" value={formData.description} onChange={handleChange} />
                    </div>
                    <div className="edit-project-field">
                        <label htmlFor="period">Period</label>
                        <input id="period" type="text" name="period" value={formData.period} onChange={handleChange} />
                    </div>
                    <div className="edit-project-field">
                        <label htmlFor="status">Status</label>
                        <input id="status" type="text" name="status" value={formData.status} onChange={handleChange} />
                    </div>
                    <div className="edit-project-button">
                        <Button label="Confirm" onClick={handleSubmit} />
                    </div>
                </div>
            </Dialog>
        </div>
    );
};

export default EditProjectModal;
