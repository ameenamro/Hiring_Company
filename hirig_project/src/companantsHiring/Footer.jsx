// Footer.js
import React from 'react';
import { Typography, Container, Grid, Link, Box } from '@mui/material';

const Footer = () => {
  return (
    <Container
      component="footer" maxWidth="xl" 
      sx={{
        minWidth:"100vh",
        minHeight:"30vh",
        py: 4,
        backgroundColor: '#212b85',
        color: 'white',
        display: 'flex',
        marginTop:"auto",
        borderRadius:"11px",
        flexDirection: 'column',
        paddingBottom:"300px"
      }}
    >
      <Grid container spacing={35} >
        {/* Company Info */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6">Your Company</Typography>
          <Typography variant="body2">
            A brief description of your company. Provide contact information or links to important
            pages.
          </Typography>
        </Grid>

        {/* Quick Links */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6">Quick Links</Typography>
          <Typography variant="body2">
            <Link color="inherit" href="#">
              Home
            </Link>
            {' | '}
            <Link color="inherit" href="#">
              Jobs
            </Link>
            {' | '}
            <Link color="inherit" href="#">
              About Us
            </Link>
            {' | '}
            <Link color="inherit" href="#">
              Contact
            </Link>
          </Typography>
        </Grid>

        {/* Social Media Links */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6">Connect With Us</Typography>
          <Typography variant="body2">
            <Link color="inherit" href="#">
              Facebook
            </Link>
            {' | '}
            <Link color="inherit" href="#">
              Twitter
            </Link>
            {' | '}
            <Link color="inherit" href="#">
              LinkedIn
            </Link>
          </Typography>
        </Grid>
      </Grid>

      {/* Copyright */}
      <Box mt={2} sx={{ width: '100%' }}>
        <Typography variant="body2" align="center">
          © {new Date().getFullYear()} Your Company. All rights reserved.
        </Typography>
      </Box>
    </Container>
  );
};

export default Footer;
