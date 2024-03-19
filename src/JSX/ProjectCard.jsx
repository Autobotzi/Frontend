import React, { useState } from "react";
import "../CSS/ProjectCard.css";
import ProjectCardBackground from "../Imagini/ProjectCardBeckground.png";
import DepProfileImage from "../DepartmentCard-images/DepProfileImage.png";
import { Button } from 'primereact/button';
import FavoriteButton from "../Imagini/FavoriteButton.png";

const ProjectCard =({ name,  startDate, deadline }) => {
    
  
  return (  
   
    <div className="ProjectCardContainer">
      <img src={ProjectCardBackground} alt="" className="ProjectBeckgroundCard-Style" />
      <div className="ProjectCardContent">
        <img src={DepProfileImage} alt="" className="ProjectImg-Style" />
         <div className="ProjectCardFields">
          <div className="ProjectFildGap">
            <div className="ProjectFieldContentLabel">{name || "Empty"}</div>
            <div className="ProjectFieldNameLabel">Department Name</div>
          </div>
          <div className="ProjectFildGap">
            <div className="ProjectFieldContentLabel">{startDate || "Empty"}</div>
            <div className="ProjectFieldNameLabel">Start Date</div>
          </div>
          <div className="ProjectFildGap">
            <div className="ProjectFieldContentLabel">{deadline || "Empty"}</div>
            <div className="ProjectFieldNameLabel">Deadline</div>
          </div>

        </div>
        
        <div className="Projectexpendbutton">
          <Button label=">" />

        </div> 
        <p className="ProjectDate">25 Feb 2024</p>
        <button className="image-button">
            <img src={FavoriteButton} alt="" className="FavoriteButton" />
        </button>


      </div>
      

    </div>
    
    
    
        
    
     
    
  );
};

export default ProjectCard;
