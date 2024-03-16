import React from "react";
import { Link } from 'react-router-dom';
import "../CSS/DepartmentCard.css";
import DepartmentCardBackground from "../DepartmentCard-images/DepartmentCardBeckground.png";
import DepProfileImage from "../DepartmentCard-images/DepProfileImage.png";
import { Button } from 'primereact/button';

const DepartmentCard = ({ name, manager, description }) => {
  const handleClick = () => {
    localStorage.setItem('departmentName', name);
    console.log("Department Name:", name);
  };
  return (  
    <div className="DepCardContainer">
     
        <img src={DepartmentCardBackground} alt="" className="DepBeckgroundCard-Style" />
        <div className="DepCardContent">
          <img src={DepProfileImage} alt="" className="DepImg-Style" />
          <div className="DepCardFields">
            <div className="FildGap">
              <div className="FieldContentLabel">{name || "Empty"}</div>
              <div className="FieldNameLabel">Department Name</div>
            </div>
            <div className="FildGap">
              <div className="FieldContentLabel">{manager || "Empty"}</div>
              <div className="FieldNameLabel">Department Manager</div>
            </div>
            <div className="FildGap">
              <div className="FieldContentLabel">{description || "Empty"}</div>
              <div className="FieldNameLabel">Description</div>
            </div>
          </div>
          <Link to={{ pathname: '/apphome', state: { departmentName: name } }}>
          <div className="expendbutton">
            <Button label=">" onClick={handleClick}/>
          </div>
          </Link>
        </div>
      
    </div>
  );
};

export default DepartmentCard;
