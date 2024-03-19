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
import AddDepartmentModal from './AddDepartmentModal'; // Import the modal component


const Admin = () => {
  const [date, setDate] = useState(null);
  const [user, setUser] = useState({});
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
        try {
            const token = sessionStorage.getItem('token');
            if (!token) {
                console.error("Token not found in sessionStorage.");
                return;
            }

            const departmentResponse = await axios.get('https://autobotzi-ccec90c77ecb.herokuapp.com/departments/all', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setDepartments(departmentResponse.data);

            const email = sessionStorage.getItem('email');
            if (email) {
                await fetchUser(email);
            } else {
                console.error("No email found in sessionStorage.");
            }

            const employeesResponse = await axios.get('https://autobotzi-ccec90c77ecb.herokuapp.com/user/all', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setEmployees(employeesResponse.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    fetchData();
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

const handleAddModalToggle = () => {
    setShowAddModal(prevState => !prevState);
};
const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
return (
    <div className="AdminContainer">
        <Navbar />
        <div className="DepList">
            <div className="AddRow">
                <div className="namePageDep"><p className="titleDep">Departments</p></div>
                <div className="addDep"><Link className="addDepIcon" onClick={handleAddModalToggle}><MdAdd /></Link> <div className="tooltipDep">Add Department</div></div>
                <div className="searchDepartment">
                        <input
                            className="inputSearchDepartment"
                            type="text"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={handleSearchChange} // Call handleSearchChange on input change
                          
                        />
                         <div className="tooltipInputDep">Search by department name</div>
                    </div>
            </div>

            <div className="DepListContainer">

  {departments
    .filter(department => department.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .map((department, index) => (
      <DepartmentCard
        key={index}
        name={department.name}
        manager={department.departmentManager}
        description={department.description}
      />
    ))}
</div>

        </div>
        <div className="OthersContainer">
            <div className="ProfileRectangle">
                <img src={RectangleBackground} alt="" className="RectangleBackground" />
                <Link to="/profile" className=""><img src={EditIcon} alt="" className="EditIcon" /></Link>
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
                <div className="titleEmployee">Employee List</div>
                <div className="EmployeeList">
                {employees.map((employee, index) => (
                    <div className="EmployeeRow" key={index}>
                        <img src={PhotoProfile} alt="" className="EmployeeLstImg" />
                        <p className="EmployeeLstName">{employee.name}</p>
                    </div>
                ))}
                </div>
            </div>
        </div>

        <AddDepartmentModal visible={showAddModal} onHide={handleAddModalToggle} />
    </div>
);
};

export default Admin;
