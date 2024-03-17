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
import { MdEdit } from "react-icons/md";
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

  useEffect(() => {
    const email = localStorage.getItem('email');
    if (email) {
      fetchUser(email);
    } else {
      console.error("No email found in localStorage.");
    }
    const storedDepartmentName = localStorage.getItem('departmentName');
    if (storedDepartmentName) {
      setDepartmentName(storedDepartmentName);
      fetchUsersByDepartment(storedDepartmentName);
    }
  }, []);

  const fetchUser = async (email) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error("Token not found in localStorage.");
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
      const token = localStorage.getItem('token');
      const response = await axios.get(`https://autobotzi-ccec90c77ecb.herokuapp.com/user/get-by-department?departmentName=${departmentName}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUsers(response.data);
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
        </div>
      </div>
      <div className="OthersContainer">
        <div className="ProfileRectangle">
          <img src={RectangleBackground} alt="" className="RectangleBackground" />
          <img src={EditIcon} alt="" className="EditIcon" />
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
            <ul>
              {users.map(user => (
                <li key={user.email}>
                  {user.name} - {user.email}
                </li>
              ))}
            </ul>
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
