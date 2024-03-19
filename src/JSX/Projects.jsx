import Navbar from "./Navbar";
import '../CSS/Projects.css';
import { MdAdd } from "react-icons/md";
import { Link } from "react-router-dom";
import React, { useState,useEffect } from "react";
import ProjectCard from "../JSX/ProjectCard";
import axios from 'axios';
import AddProjectModal from "../JSX/AddProjectModal";




const Projects = () => {

    const [projects, setProjects] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);

    const toggleAddModal = () => {
        setShowAddModal(!showAddModal);
    };
    const [isOpen, setIsOpen] = useState(false); // Starea pentru deschiderea/închiderea dropdown-ului
    const [selectedOption, setSelectedOption] = useState(null); // Starea pentru opțiunea selectată din dropdown

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        setIsOpen(false); // Închide dropdown-ul după selectarea unei opțiuni
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
                setProjects(response.data);
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        };
    
        fetchProjects();
    }, []);
    
   return(
    <div className="Container">
        <Navbar />
        <div className="workspaceProjects">

            <div className="headerProjects">
                <div className="namePageProject"><p className="titleProjects">Projects</p></div>
                <div onClick={toggleAddModal} className="addProjects"><Link><MdAdd/></Link> <div className="tooltipProj">Add project</div></div>
                <div className="searchProject"><input className="inputSearchProject" type="text" placeholder="search"/><div className="tooltipInputProj">search by project name</div></div>
                <div className="dropdownProject">
                        <div className="dropdownToggle" onClick={toggleDropdown}>
                            Sort by
                        </div>
                        {isOpen && (
                            <div className="dropdownMenu">
                                <div className="dropdownItem" onClick={() => handleOptionSelect("Option 1")}>Option 1</div>
                                <div className="dropdownItem" onClick={() => handleOptionSelect("Option 2")}>Option 2</div>
                                <div className="dropdownItem" onClick={() => handleOptionSelect("Option 3")}>Option 3</div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="ProjectListContainer">
                {projects.map((project, index) => (
                        <ProjectCard
                            key={index}
                            name={project.name}
                            startDate={project.startDate}
                            deadline={project.deadLine}
                        />
                    ))}

                </div>

                
        </div>
        <AddProjectModal visible={showAddModal} onHide={toggleAddModal} />
    </div>


   );
      
    
  };
  
  export default Projects;