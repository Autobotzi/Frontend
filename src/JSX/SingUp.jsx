import React, { useState } from "react";
import "../CSS/SignUp.css";
import HomeBackground from '../Imagini/HomeBackground.png';
import Line from '../Imagini/Line.png';
import Ellipse from '../Imagini/Ellipse.png';
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "", // Changed to email to match the request body schema
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Construct the URL with the adminEmail query parameter
      const url = `https://autobotzi-ccec90c77ecb.herokuapp.com/auth/sign-up?adminEmail=admin%40new.com`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        // Success
        console.log("User signed up successfully!");
        navigate("/login");
      } else {
        // Handle error
        console.error("Sign up failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (  
    <div className="HomeContainer">
      <img src={HomeBackground} alt="" className="HomeBackground-STYLE-SingUp" />
      <div className="HomeContent-SingUp">
        <img src={Line} alt="" className="Line-STYLE-SingUp" />
        <img src={Line} alt="" className="Line1-STYLE-SingUp" /> 
        <img src={Ellipse} alt="" className="Ellipse-STYLE-SingUp" />
        <img src={Ellipse} alt="" className="Ellipse1-STYLE-SingUp" />
        <img src={Ellipse} alt="" className="Ellipse2-STYLE-SingUp" />
        <div className="NameLabel-SingUp">Team Finder</div>
        <div className="ChoiceLabel-SingUp">SignUp</div>
        <form className="SingUp" onSubmit={handleSubmit}>
          <div className="Collumn-Input-SingUp">
            <input type="text" className="textbox-SingUp" id="name" name="name" placeholder="Name" required value={formData.name} onChange={handleChange} />
            <input type="email" className="textbox-SingUp" id="email" name="email" placeholder="Email" required value={formData.email} onChange={handleChange} />
            <input type="password" className="textbox-SingUp" id="password" name="password" placeholder="Password" required value={formData.password} onChange={handleChange} />
          </div>
          <button type="submit" className="button-SignUp">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
