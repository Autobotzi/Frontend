import React, { useState } from "react";
import axios from 'axios';
import "../CSS/AddSkillModal.css";
const AddSkillModal = ({ isOpen, onClose }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const token = sessionStorage.getItem('token');
            if (!token) {
                console.error("Token not found in sessionStorage.");
                return;
            }
    
            // Log the request body
            console.log("Request Body:", {
                name,
                description,
                category
            });
    
            // Construct the URL with query parameters
            const url = `https://autobotzi-ccec90c77ecb.herokuapp.com/skills/add?name=${name}&description=${description}&category=${category}`;
    
            // Make the POST request
            await axios.post(url, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
    
            // Close the modal after successfully adding the skill
            onClose();
            window.location.reload();
        } catch (error) {
            console.error("Error adding skill:", error);
        }
    };
    
    

    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Add Skill</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" className="inputModalBox" value={name} onChange={handleNameChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description:</label>
                        <textarea  id="description" name="description" value={description}    onChange={handleDescriptionChange} required></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="category">Category:</label>
                        <input  type="text" id="category" name="category" className="inputModalBox" value={category} onChange={handleCategoryChange} required />
                    </div>
                    <button className="btnSkills" type="submit">Add Skill</button>
                </form>
            </div>
        </div>
    );
};

export default AddSkillModal;
