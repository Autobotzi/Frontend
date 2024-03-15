import React, { useState, useEffect } from "react";
import { Calendar } from 'primereact/calendar';
import "../CSS/Admin.css";
import "../CSS/Calendar.css";
import RectangleBackground from "../Imagini/RectangleBackground.png";
import BigRectangleBackground from "../Imagini/BigRectangleBackground.png";
import EditIcon from "../Imagini/EditIcon.png";
import PhotoProfile from "../Imagini/PhotoProfile.png";
import { Link, useLocation } from 'react-router-dom';
import Navbar from "./Navbar";
import DepartmentCard from "../JSX/DepartmentCard";
import { MdAdd } from "react-icons/md";
import axios from 'axios'; // Import axios for making HTTP requests

const Admin = () => {
  const [date, setDate] = useState(null);
  const [user, setUser] = useState({});

    useEffect(() => {
        const email = localStorage.getItem('email');
        if (email) {
            fetchUser(email);
        } else {
            console.error("No email found in localStorage.");
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


    return (
        <div className="AdminContainer">
            <Navbar />
            <div className="DepList">
                <div className="AddRow">
                    <div className="namePageDep"><p className="titleDep">Departments</p></div>
                    <div className="addDep"><Link className="addDep"><MdAdd /></Link></div>
                </div>
                <div className="DepListContainer">
                    <DepartmentCard />
                    <DepartmentCard />
                    <DepartmentCard />
                    <DepartmentCard />
                    <DepartmentCard />
                    <DepartmentCard />
                    <DepartmentCard />
                    <DepartmentCard />
                    <DepartmentCard />
                    <DepartmentCard />
                    <DepartmentCard />
                    <DepartmentCard />
                   
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
                    <div className="Calendar">
                        <Calendar value={date} onChange={(e) => setDate(e.value)} inline showWeek />
                    </div>
                </div>

                <div className="EmployeeListConntainer">
                    <div className="titleEmployee">Employer List</div>
                    <div className="EmployeeList">
                    <div className="EmployeeRow">
                        <img src={PhotoProfile} alt="" className="EmployeeLstImg" />
                        <p className="EmployeeLstName">I don t have a name lmao</p>
                    </div>
                    <div className="EmployeeRow">
                        <img src={PhotoProfile} alt="" className="EmployeeLstImg" />
                        <p className="EmployeeLstName">I don t have a name lmao</p>
                    </div>
                    <div className="EmployeeRow">
                        <img src={PhotoProfile} alt="" className="EmployeeLstImg" />
                        <p className="EmployeeLstName">I don t have a name lmao</p>
                    </div>
                    <div className="EmployeeRow">
                        <img src={PhotoProfile} alt="" className="EmployeeLstImg" />
                        <p className="EmployeeLstName">I don t have a name lmao</p>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;
