// AddProjectModal.js
import React, { useState } from "react";
import { Button } from 'primereact/button';
import axios from 'axios';
import { Dialog } from 'primereact/dialog';
import '../CSS/AddProjectModal.css';
const AddProjectModal = ({ visible, onHide }) => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        period: "Fixed",
        projectStatus: "NotStarted",
        startDate: "",
        deadline: "",
        technology: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };


    const handleAddProject = async () => {
        try {
            const token = sessionStorage.getItem('token');
            if (!token) {
                console.error("Token not found in sessionStorage.");
                return;
            }
    
            // Constructing the query parameters
            const params = new URLSearchParams();
            params.append('name', formData.name);
            params.append('description', formData.description);
            params.append('period', formData.period);
            params.append('projectStatus', formData.projectStatus);
            params.append('startDate', formData.startDate);
            params.append('deadLine', formData.deadline);
            params.append('technology', formData.technology);
    
            // Constructing the URL with query parameters
            const url = `https://autobotzi-ccec90c77ecb.herokuapp.com/projects?${params.toString()}`;
    
            // Log the URL to see if it's correct
            console.log("URL:", url);
    
            // Making the POST request
            const response = await axios.post(url, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
    
            // Log the response data if the request is successful
            console.log("Response:", response.data);
    
            // Reset form data after successful addition
            setFormData({
                name: "",
                description: "",
                period: "Fixed",
                projectStatus: "NotStarted",
                startDate: "",
                deadline: "",
                technology: ""
            });
    
            // Close the modal
            onHide();
            window.location.reload();
        } catch (error) {
            console.error("Error adding project:", error);
        }
    };
    
    
    

    return (
        <div className={`modal-overlay ${visible ? 'show' : 'hide'}`}>
            <Dialog visible={visible} onHide={onHide} className="modal-content" modal header="Add Department"  closeOnEscape={false}>
                <div className="modalBox">
                <label>Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} />
                <label>Description:</label>
                <input type="text" name="description" value={formData.description} onChange={handleChange} />
                <label>Period:</label>
                <input type="text" name="period" value={formData.period} onChange={handleChange} />
                <label>Project Status:</label>
                <input type="text" name="projectStatus" value={formData.projectStatus} onChange={handleChange} />
                <label>Start Date:</label>
                <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} />
                <label>Deadline:</label>
                <input type="date" name="deadline" value={formData.deadline} onChange={handleChange} />
                <label>Technology:</label>
                <input type="text" name="technology" value={formData.technology} onChange={handleChange} />
                <Button label="Add" onClick={handleAddProject} />
                </div>
                </Dialog>
        </div>
    );
};

export default AddProjectModal;
