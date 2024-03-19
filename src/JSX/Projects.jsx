// Projects.js
import React, { useState, useEffect } from 'react';
import { MdAdd, MdEdit, MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import axios from 'axios';
import AddProjectModal from "../JSX/AddProjectModal";
import EditProjectModal from "../JSX/EditProjectModal";
import ProjectCard from "../JSX/ProjectCard";
import DeleteProjectModal from "../JSX/DeleteProjectModal"; // Import the DeleteProjectModal component
import '../CSS/Projects.css';
import Navbar from "./Navbar";

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false); // State variable for showing the delete modal
    const [searchQuery, setSearchQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedProjectName, setSelectedProjectName] = useState('');
    const [deleteProjectName, setDeleteProjectName] = useState('');

    const toggleAddModal = () => {
        setShowAddModal(!showAddModal);
    };

    const toggleEditModal = () => {
        setShowEditModal(!showEditModal);
    };

    const toggleDeleteModal = () => {
        setShowDeleteModal(!showDeleteModal); // Toggle the delete modal
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleEditClick = (projectName) => {
        setSelectedProjectName(projectName);
        toggleEditModal();
    };

    const handleDeleteSelect = (projectName) => {
        setDeleteProjectName(projectName);
        toggleDeleteModal(); // Open the delete modal when a project name is selected
    };

    const handleDeleteClick = async () => {
        try {
            const token = sessionStorage.getItem('token');
            if (!token) {
                console.error("Token not found in sessionStorage.");
                return;
            }

            const response = await axios.delete(`https://autobotzi-ccec90c77ecb.herokuapp.com/projects?name=${deleteProjectName}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log("Project deleted successfully:", response.data);

            // Remove the deleted project from the state
            setProjects(prevProjects => prevProjects.filter(project => project.name !== deleteProjectName));
            toggleDeleteModal(); // Close the delete modal after successful deletion
        } catch (error) {
            console.error("Error deleting project:", error);
        }
    };

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const token = sessionStorage.getItem('token');
                if (!token) {
                    console.error("Token not found in sessionStorage.");
                    return;
                }

                const response = await axios.get('https://autobotzi-ccec90c77ecb.herokuapp.com/projects/organization', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                let sortedProjects = response.data.sort((a, b) => {
                    // Sort by start date in ascending order
                    return new Date(a.startDate) - new Date(b.startDate);
                });

                // Apply sorting by end date if selected
                if (selectedOption === "Sort by End Date") {
                    sortedProjects = response.data.sort((a, b) => {
                        return new Date(a.deadLine) - new Date(b.deadLine);
                    });
                }

                setProjects(sortedProjects);
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        };

        fetchProjects();
    }, [selectedOption]); // Add selectedOption as a dependency to useEffect

    // Filter projects based on search query
    const filteredProjects = projects.filter(project =>
        project.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="Container">
            <Navbar />
            <div className="workspaceProjects">
                <div className="headerProjects">
                    <div className="namePageProject"><p className="titleProjects">Projects</p></div>
                    <div onClick={toggleAddModal} className="addProjects"><Link><MdAdd /></Link> <div className="tooltipProj">Add project</div></div>
                    <div onClick={toggleEditModal} className="addProjects"><Link><MdEdit /></Link> <div className="tooltipProj">Edit project</div></div>
                    <div onClick={toggleDeleteModal} className="addProjects"><Link><MdDelete /></Link> <div className="tooltipProj">Delete project</div></div>
                    <div className="searchProject">
                        <input
                            className="inputSearchProject"
                            type="text"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                        <div className="tooltipInputProj">Search by project name</div>
                    </div>
                    <div className="dropdownProject">
                        <div className="dropdownToggle" onClick={toggleDropdown}>
                            Sort by
                        </div>
                        {isOpen && (
                            <div className="dropdownMenu">
                                <div className="dropdownItem" onClick={() => handleOptionSelect("Sort by Start Date")}>Start Date</div>
                                <div className="dropdownItem" onClick={() => handleOptionSelect("Sort by End Date")}>End Date</div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="ProjectListContainer">
                    {filteredProjects.map((project, index) => (
                        <ProjectCard
                            key={index}
                            name={project.name}
                            startDate={project.startDate}
                            deadline={project.deadLine}
                            onEdit={() => handleEditClick(project.name)}
                        />
                    ))}
                </div>
            </div>
            <AddProjectModal visible={showAddModal} onHide={toggleAddModal} />
            <EditProjectModal visible={showEditModal} onHide={toggleEditModal} projectName={selectedProjectName} />
            {/* Render the DeleteProjectModal component with props */}
            <DeleteProjectModal visible={showDeleteModal} onHide={toggleDeleteModal} projectName={deleteProjectName} onDelete={handleDeleteClick} />
        </div>
    );
};

export default Projects;
