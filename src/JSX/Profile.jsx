import React, { useState, useEffect } from "react";
import "../CSS/Profile.css";
import PhotoProfile from "../Imagini/PhotoProfile.png";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Navbar from "./Navbar";
import ProfileBkg from "../Imagini/ProfileBkg.png";
import AboutExpBkg from "../Imagini/AboutExpBkg.png";
import RoleBkg from "../Imagini/RoleBkg.png";
import SkillsBkg from "../Imagini/SkillsBkg.png";
import MessageImage from "../Imagini/MessageImage.png";
import axios from 'axios';
import { MdAdd, MdEdit, MdDelete } from "react-icons/md";
import AddSkillModal from "./AddSkillModal";

const Profile = () => {
    const [user, setUser] = useState({});
    const [role, setRole] = useState('');
    const [skills, setSkills] = useState([]);
    const [isAddSkillModalOpen, setIsAddSkillModalOpen] = useState(false);

    useEffect(() => {
        const email = sessionStorage.getItem('email');
        if (email) {
            fetchUser(email);
            fetchSkills();
        } else {
            console.error("No email found in sessionStorage.");
        }
    }, []);

    const fetchUser = async (email) => {
        try {
            const token = sessionStorage.getItem('token');
            if (!token) {
                console.error("Token not found in sessionStorage.");
                return;
            }

            const response = await axios.get(`https://autobotzi-ccec90c77ecb.herokuapp.com/user/get-by-email?email=${email}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const userData = response.data;
            if (userData && userData.name && userData.email) {
                setUser(userData);
                if (userData.role) {
                    setRole(userData.role);
                }
            } else {
                console.error("Invalid user data received:", userData);
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    const fetchSkills = async () => {
        try {
            const token = sessionStorage.getItem('token');
            if (!token) {
                console.error("Token not found in sessionStorage.");
                return;
            }

            const response = await axios.get('https://autobotzi-ccec90c77ecb.herokuapp.com/skills/all', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setSkills(response.data);
        } catch (error) {
            console.error("Error fetching skills:", error);
        }
    };

    const openAddSkillModal = () => {
        setIsAddSkillModalOpen(true);
    };

    const closeAddSkillModal = () => {
        setIsAddSkillModalOpen(false);
    };

    return (
        <div className="ProfileContainer">
            <Navbar />
            <div className="ProfileItems">
                <div className="ProfileRow">
                    <img src={ProfileBkg} alt="" className="ProfileBkg" />
                    <div className="ProfileCollumn">
                        <img src={PhotoProfile} alt="" className="PhotoProfile1" />
                    </div>
                    <div className="ProfileCollumn1">
                        {user && (
                            <p className="LabelInfoProfile">{user.name}</p>
                        )}
                        <p className="NameLabelProfile">Name</p>
                        {user && (
                            <p className="LabelInfoProfile">{user.email}</p>
                        )}
                        <p className="NameLabelProfile">Email</p>
                        <div className="MessageRow">
                            <img src={MessageImage} alt="" className="MessageImage" />
                            <p className="MessageLabel">Send message</p>
                        </div>
                    </div>
                </div>
                <div className="InfoRow">
                    <div className="InfoCollumn1">
                        <img src={RoleBkg} alt="" className="RoleBkg" />
                        <p className="Role">Roles</p>
                        <p className="RoleEdt">Edit Role</p>
                        {role && (
                            <p className="UserRole">{role}</p>
                        )}
                        <img src={SkillsBkg} alt="" className="SkillsBkg" />
                        <p className="Skills">Skills</p>
                        <p className="SkillsEdt" onClick={openAddSkillModal}>Edit Skills</p>
                        <div className="SkillsContainer">
                            {skills.map((skill, index) => (
                                <p key={index} className="Skill">{skill.name}</p>
                            ))}
                        </div>
                        <div className="addSkills" onClick={openAddSkillModal}><Link><MdAdd /></Link></div>

                    </div>
                    <div className="InfoCollumn">
                        <div className="AboutExpBkg" >
                        <p className="AboutExp">About Experience</p>
                        </div>
                    </div>
                </div>
            </div>
            <AddSkillModal isOpen={isAddSkillModalOpen} onClose={closeAddSkillModal} />
        </div>
    );
};

export default Profile;

