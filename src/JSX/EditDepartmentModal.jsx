import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import axios from 'axios';
import '../CSS/AddDepartmentModal.css'; // Import CSS file

const EditDepartmentModal = ({ visible, onHide, departmentToEdit }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: ''
    });

    useEffect(() => {
        if (departmentToEdit) {
            setFormData({
                name: departmentToEdit.name || '',
                description: departmentToEdit.description || ''
            });
        }
    }, [departmentToEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleEdit = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error("Token not found in localStorage.");
                return;
            }
    
            if (!departmentToEdit) {
                console.error("Department to edit is not defined.");
                return;
            }
    
            console.log("Department data to be updated:", formData);
            console.log("Department name being edited:", departmentToEdit.name);
    
            const { name, description } = formData; // Extract name and description from formData

        const response = await axios.put(`https://autobotzi-ccec90c77ecb.herokuapp.com/departments/update?name=${encodeURIComponent(name)}`, {
            name,
            description
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
    
            console.log("Department updated successfully:", response.data);
            onHide();
            setFormData({
                name: '',
                description: ''
            });
            window.location.reload(); // Consider better ways to update UI after edit
        } catch (error) {
            console.error("Error editing department:", error);
        }
    };
    

    const handleOverlayClick = (e) => {
        e.stopPropagation(); // Prevent click event from reaching underlying dialog
    };

    return (
        <div className={`add-department-overlay ${visible ? 'visible' : ''}`} onClick={handleOverlayClick}>
            <Dialog visible={visible} onHide={onHide} className="add-department-dialog" modal header="Edit Department" closeOnEscape={false}>
                <div className="add-department-content">
                    <div className="add-department-field">
                        <label htmlFor="name">Name</label>
                        <input id="name" type="text" name="name" value={formData.name} onChange={handleChange} />
                    </div>
                    <div className="add-department-field">
                        <label htmlFor="description">Description</label>
                        <input id="description" type="text" name="description" value={formData.description} onChange={handleChange} />
                    </div>
                    <div className="add-department-button">
                        <Button label="Submit" onClick={handleEdit} />
                    </div>
                </div>
            </Dialog>
        </div>
    );
};

export default EditDepartmentModal;
