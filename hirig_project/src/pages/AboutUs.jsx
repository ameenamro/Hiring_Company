import React from 'react'
import { Container, Typography, Paper } from "@mui/material";

function AboutUs() {
  return (
    <Container maxWidth="md" style={{ marginTop: "150px" , padding: "80px" }}>
    <Paper elevation={15} style={{ padding: "20px",  borderRadius:"15px"}}>
      <Typography variant="h4" gutterBottom>
        About Us
      </Typography>
      <Typography variant="body1" paragraph>
        Welcome to our company! We are dedicated to providing high-quality repair services to our customers.
      </Typography>
      <Typography variant="body1" paragraph>
        Our team of skilled technicians is committed to delivering reliable and efficient repairs for your home or workplace.
      </Typography>
      <Typography variant="body1" paragraph>
        With years of experience in the industry, we take pride in our workmanship and ensure the satisfaction of our clients.
      </Typography>
      <Typography variant="body1" paragraph>
        At [RANI Company], we prioritize timely service to meet your repair needs and enhance your living spaces.
      </Typography>
      <Typography variant="body1" paragraph>
        Explore our services and let us take care of your repair requirements with dedication and excellence.
      </Typography>
    </Paper>
  </Container>
  )
}

export default AboutUs