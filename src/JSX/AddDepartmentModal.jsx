import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import axios from 'axios';
import '../CSS/AddDepartmentModal.css'; // Import CSS file

const AddDepartmentModal = ({ visible, onHide }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error("Token not found in localStorage.");
                return;
            }

            const adminEmail = ''; // Set adminEmail to the required value

            console.log("Department data to be sent:", formData);

            const response = await axios.post(`https://autobotzi-ccec90c77ecb.herokuapp.com/departments/add`, formData, {
               
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log("Department added successfully:", response.data);

            onHide();
            setFormData({
                name: '',
                description: ''
            });
            window.location.reload();
        } catch (error) {
            console.error("Error adding department:", error);
        }
    };

    const handleOverlayClick = (e) => {
        e.stopPropagation(); // Prevent click event from reaching underlying dialog
    };

    return (
        <div className={`add-department-overlay ${visible ? 'visible' : ''}`} onClick={handleOverlayClick}>
            <Dialog visible={visible} onHide={onHide} className="add-department-dialog" modal header="Add Department" closeOnEscape={false}>
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
                        <Button label="Submit" onClick={handleSubmit} />
                    </div>
                </div>
            </Dialog>
        </div>
    );
};

export default AddDepartmentModal;
