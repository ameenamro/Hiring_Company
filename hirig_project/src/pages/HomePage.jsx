import React from "react";
import { Container, Typography, Button, Grid, Paper } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

import "../companantCSS/Homepage.css"; // Import your CSS file

function HomePage() {
 const navigate=useNavigate();

const FindServce=()=>

{

navigate("/user");



}






  return (
    <div className="video-container" style={{}}>
      <video autoPlay loop muted playsInline className="video">
        <source src="https://media.istockphoto.com/id/1302685647/video/handsome-plumber-checking-a-list-and-pipes-of-kitchen-sink-during-a-home-renovation-project.mp4?s=mp4-640x640-is&k=20&c=K22jrlvmSNCAhPlC6-B4SOsjM5fu1oAGR6SH-kOBLPo=" />
        Your browser does not support the video tag.
      </video>
      <div className="content">
        <Container>
          <Typography variant="h2" className="heading">
            <span
              style={{
                fontSize:"80px",
                backgroundColor: "blue",
                padding: "10px",
                margin:"10px",
                borderRadius: "10px",
              }}
            >
              Welcome 
            </span >
            To Our Repair Services
          </Typography>
          <Typography
            variant="h6"
            className="description"
            style={{ padding: "10px", borderRadius: "5px" }}
          >
            We fix and enhance your living{" "}
            <span
              style={{
                backgroundColor: "#6e8ab0bd",
                padding: "9px",
                borderRadius: "15px",
              }}
            >
              spaces
            </span>
            . Your satisfaction is our
            <span   style={{ backgroundColor: '#1818d6', padding: '9px', borderRadius: '15px' }}>priority.</span>
          </Typography>
          <br></br>
          <br></br>
          <Button
            variant="contained"
            color="primary"
            size="large"
            
            style={{ backgroundColor: '#d6ad18',                borderRadius: "15px",
          }} 
            className="explore-button"
            onClick={FindServce}
          >
            Explore Services
          </Button>
        </Container>
      </div>
    </div>
  );
}

export default HomePage;
