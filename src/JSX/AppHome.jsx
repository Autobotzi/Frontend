import React, { useState, useEffect } from "react";
import { Calendar } from 'primereact/calendar';
import "../CSS/AppHome.css";
import "../CSS/Admin.css";
import "../CSS/Calendar.css";
import RectangleBackground from "../Imagini/RectangleBackground.png";
import BigRectangleBackground from "../Imagini/BigRectangleBackground.png";
import EditIcon from "../Imagini/EditIcon.png";
import PhotoProfile from "../Imagini/PhotoProfile.png";
import { Link, useLocation } from 'react-router-dom';
import Navbar from "./Navbar";
import { MdEdit,MdDelete} from "react-icons/md";
import DepInfoBackground from "../Imagini/DepInfoBackground.png";
import AboutProjectBackground from "../Imagini/AboutProjectBackground.png";
import axios from 'axios';
import EditDepartmentModal from './EditDepartmentModal'; // Import the EditDepartmentModal component

const AppHome = () => {
    
  const [date, setDate] = useState(null);
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);
  const location = useLocation();
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false); // State to track editing status
  const [userToEdit, setUserToEdit] = useState(null); // State to store the user being edited
  const [projectDetails, setProjectDetails] = useState({});
  useEffect(() => {
    const email = sessionStorage.getItem('email');
    if (email) {
      fetchUser(email);
    } else {
      console.error("No email found in sessionStorage.");
    }
    const storedDepartmentName = sessionStorage.getItem('departmentName');
    if (storedDepartmentName) {
      setDepartmentName(storedDepartmentName);
      fetchUsersByDepartment(storedDepartmentName);
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
      } else {
        console.error("Invalid user data received:", userData);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchUsersByDepartment = async (departmentName) => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.get(`https://autobotzi-ccec90c77ecb.herokuapp.com/user/get-by-department?departmentName=${departmentName}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      const usersWithRoles = response.data.map(user => {
        return {
          ...user,
          role: user.role // Adjust this according to the actual property name where the role is stored in the user object
        };
      });
  
      setUsers(usersWithRoles);
    } catch (error) {
      setError(error);
      console.error("Error fetching users by department:", error);
    }
  };
  

  const [departmentName, setDepartmentName] = useState("");

  // Function to handle edit action
  const handleEdit = (user) => {
    setUserToEdit(user);
    setEditing(true);
  };

  // Function to handle delete action
  // Function to handle delete action
  const handleDelete = async (email, role) => {
    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        console.error("Token not found in sessionStorage.");
        return;
      }
  
      const requestBody = {
        email: email,
        role: role
      };
  
      console.log("Request Body:", requestBody); // Log the request body
  
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        data: requestBody
      };
  
      await axios.delete('https://autobotzi-ccec90c77ecb.herokuapp.com/user/roles/delete', config);
      // After successful deletion, refetch users
      fetchUsersByDepartment(departmentName);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  const fetchProjectDetails = async (departmentName) => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.get(`https://autobotzi-ccec90c77ecb.herokuapp.com/projects/ttt`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      // Set the project details state
      setProjectDetails(response.data);
    } catch (error) {
      setError(error);
      console.error("Error fetching project details:", error);
    }
  };
  
  useEffect(() => {
    // Fetch project details when the component mounts
    fetchProjectDetails(departmentName);
  }, [departmentName]);
  
  


  return (
    <div className="AdminContainer">
      <Navbar />
      <div className="DepList">
        <div className="DepInfoContainer">
          <div className="AddRowDep">
            <div className="namePageDep-Home"><p className="titleDep-Home">{departmentName || "Example Department"}</p></div>
            <Link className="addDep-Home" onClick={handleEdit}><MdEdit /></Link>
          </div>
          <img src={DepInfoBackground} alt="" className="DepInfoBackground" />
          <div className="AddRowDep">
            <div className="AboutProject-Home"><p className="titleDep-Home">About Project</p></div>
          </div>
          <img src={AboutProjectBackground} alt="" className="AboutProjectBackground" />
          {/* <div className="projectDetails">
    <p>Name: {projectDetails.name}</p>
    <p>Description: {projectDetails.description}</p>
    <p>Period: {projectDetails.period}</p>
    <p>Project Status: {projectDetails.projectStatus}</p>
    <p>Start Date: {projectDetails.startDate}</p>
    <p>Deadline: {projectDetails.deadLine}</p>
    <p>Technology: {projectDetails.technology}</p>
  </div> */}
        </div>
      </div>
      <div className="OthersContainer">
        <div className="ProfileRectangle">
          <img src={RectangleBackground} alt="" className="RectangleBackground" />
          <Link to="/profile" className=""> <img src={EditIcon} alt="" className="EditIcon" /></Link>
          <p className="titleProfile">Profile</p>
          <img src={PhotoProfile} alt="" className="PhotoProfile" />
          {user && (
            <>
              <p className="AdmName">{user.name}</p>
              <p className="AdmEmail">{user.email}</p>
            </>
          )}
        </div>

        <div className="CalendarRectangle">
          <div className="Calendar  ">
            <Calendar value={date} onChange={(e) => setDate(e.value)} inline showWeek />
          </div>
        </div>

        <div className="EmployeeListConntainer">
          <div className="titleEmployee">Employer List</div>
          <div className="EmployeeList">
            {users.map((user, index) => (
                    <div className="EmployeeRow" key={index}>
                        <p className="EmployeeLstName"><MdDelete onClick={() => handleDelete(user.email)}/></p>
                        <img src={PhotoProfile} alt="" className="EmployeeLstImg" />
                       
                        <p className="EmployeeLstName">{user.name}</p>
                       
                    </div>
                ))}
            
          </div>
        </div>
      </div>
      {/* Edit Department Modal */}
<EditDepartmentModal
  visible={editing}
  onHide={() => setEditing(false)}
  departmentToEdit={userToEdit} // Pass departmentToEdit instead of user
/>

    </div>
  );
};

export default AppHome;
