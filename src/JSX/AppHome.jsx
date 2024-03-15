import React, { useState,useEffect } from "react";
import { Calendar } from 'primereact/calendar';
import "../CSS/AppHome.css";
import "../CSS/Admin.css";
import "../CSS/Calendar.css";
import RectangleBackground from "../Imagini/RectangleBackground.png";
import BigRectangleBackground from "../Imagini/BigRectangleBackground.png";
import EditIcon from "../Imagini/EditIcon.png";
import PhotoProfile from "../Imagini/PhotoProfile.png";
import {Link, useLocation } from 'react-router-dom';
import Navbar from "./Navbar";
import { MdAdd } from "react-icons/md";
import DepInfoBackground from "../Imagini/DepInfoBackground.png";
import AboutProjectBackground from "../Imagini/AboutProjectBackground.png";
import axios from 'axios'; 

const AppHome = () => {
   
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
      <Navbar/> 
      <div className="DepList">
      
      <div className="DepInfoContainer">
        <div className="AddRowDep">
            <div className="namePageDep-Home"><p className="titleDep-Home">Exemple Department</p></div>
                <div className="addDep-Home"><Link className="addDep-Home"><MdAdd /></Link></div>
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

export default AppHome;
