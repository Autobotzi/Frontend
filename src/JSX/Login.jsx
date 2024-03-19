import React, { useState } from "react";
import "../CSS/Login.css";
import "../CSS/Modal.css"; // Import the modal styles
import HomeBackground from '../Imagini/HomeBackground.png';
import { Link, useNavigate } from "react-router-dom";
import Line from '../Imagini/Line.png';
import Ellipse from '../Imagini/Ellipse.png';
import axios from 'axios'; // Import axios for making HTTP requests
import Modal from 'react-modal'; // Import React Modal

Modal.setAppElement('#root'); // Set the root element for accessibility

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [showModal, setShowModal] = useState(false); // State variable to control the visibility of the modal
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        method: "POST",
        url: 'https://autobotzi-ccec90c77ecb.herokuapp.com/auth/sign-in',
        data: formData
      });
      const { token } = response.data;
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('email', formData.email);
      console.log("Login successful. Token:", token);
      console.log("Login successful. email:", formData.email);
      navigate("/admin"); // Use navigate function to redirect to admin page upon successful login
    } catch (error) {
      setShowModal(true); // Set showModal to true to open the modal
      console.error("Login failed: ", error);
    }
  };
  

  return (
    <div className="HomeContainer">
      <img src={HomeBackground} alt="" className="HomeBackground-STYLE-Login" />
      <div className="HomeContent-SingUp">
        <img src={Line} alt="" className="Line-STYLE-Login" />
        <img src={Line} alt="" className="Line1-STYLE-Login" />
        <img src={Ellipse} alt="" className="Ellipse-STYLE-Login" />
        <img src={Ellipse} alt="" className="Ellipse1-STYLE-Login" />
        <img src={Ellipse} alt="" className="Ellipse2-STYLE-Login" />
        <div className="NameLabel-Login">Team Finder</div>
        <div className="NameLabel-Resset-Login">Reset Password</div>
        <Link to="/signup">
          <div className="NameLabel1-Login">Sign Up</div>
        </Link>
        <div className="ChoiceLabel-Login">Login</div>
        <form className="Login" onSubmit={handleSubmit}>
          <div className="Collumn-Input-Login">
            <input type="email" className="textbox-Login" id="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required ></input>
            <input type="password" className="textbox-Login" id="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
          </div>
          <button type="submit" className="button-Login">Continue</button>
        </form>
      </div>
      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        contentLabel="Login Error Modal"
        className="ModalContent" // Apply the modal content class
        overlayClassName="ModalOverlay" // Apply the modal overlay class
      >
        <h2 className="ModalHeading">Incorrect email or password</h2>
        <button onClick={() => setShowModal(false)} className="ModalButton">Close</button>
      </Modal>
    </div>
  );
};

export default Login;
