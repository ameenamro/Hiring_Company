import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  Drawer,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

function NavbarApp({ setIsLoggedIn, isLoggedIn }) {
  const gradientBackground = {
    background: "linear-gradient(to right, #f7f7f0df, #aaa0a0)",
    padding: "20px",
  };

  const brand = {
    background: "linear-gradient(to right, blue, #9d7d0a)",
    WebkitBackgroundClip: "text",
    color: "transparent",
    display: "inline-block",
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/login");
  };

  const handleLogin = () => {
    // Add your login logic here

    // Navigate to the user's profile or any other page after login
    navigate("/login");
  };

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const largeScreenNavbar = (
    <>
      <Typography
        variant="h6"
        component="div"
        sx={{
          display: { xs: "none", md: "block" },
          [`@media (max-width: 600px)`]: {
            display: "none", // Hide on small screens
          },
          flexGrow: 1,
        }}
      >
        <i className="fa fa-car me-3" style={brand}>
          HomeRepair
        </i>
      </Typography>
      <Typography
        variant="h6"
        component="div"
        sx={{
          display: { xs: "none", md: "block" },
          [`@media (max-width: 600px)`]: {
            display: "none", // Hide on small screens
          },
        }}
      >
        <Button color="inherit" component={Link} to="/Home">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/User">
          Services
        </Button>
        <Button color="inherit" component={Link} to="/AboutUs">About Us</Button>
     
        <Button color="inherit">Contact</Button>
     
        {isLoggedIn ? (<Button onClick={handleLogout} color="inherit" component={Link} to="/Login">
        Logout

        </Button>
        ) : (
      <Button onClick={handleLogin} color="inherit" component={Link} to="/Login">
          Login
        </Button>
           )}

      </Typography>
    </>
  );

  // {isLoggedIn ? (
  //   <Button variant="text-dark" onClick={handleLogout}>{" "}

  //     Logout
  //   </Button>
  // 
  //   <Nav.Link className="text-dark" onClick={handleLogin}>{" "}

  //     <IoMdPerson />
  //     Login
  //   </Nav.Link>
  // )}

  const smallScreenNavbar = (
    <Typography
      variant="h6"
      component="div"
      sx={{
        flexGrow: 1,
        display: { xs: "flex", md: "none" },
        justifyContent: "space-between", // Distribute space between logo and button
        alignItems: "center", // Center items vertically
      }}
    >
      <div>
        <i className="fa fa-car me-3" style={brand}>
          homerepair
        </i>
      </div>
      <IconButton
        color="inherit"
        onClick={() => setIsDrawerOpen(true)}
      >
        <MenuIcon />
      </IconButton>
    </Typography>
  );
  

  const listLinks = (
    <List>
      <ListItem>
        <Button color="inherit" component={Link} to="/Home">
          Home
        </Button>
      </ListItem>
      <ListItem>
        <Button color="inherit" component={Link} to="/User">
          Serves
        </Button>
      </ListItem>
      <ListItem>
        <Button color="inherit"component={Link} to="/AboutUs">About Us</Button>
      </ListItem>
      <ListItem>
        <Button color="inherit">Contact</Button>
      </ListItem>
      <ListItem>
        <Button color="inherit" component={Link} to="/Login">
          Login
        </Button>
      </ListItem>
    </List>
  );

  return (
    <AppBar style={gradientBackground} color="primary">
      <Toolbar>
        {/* Conditional rendering based on screen size and drawer state */}
        {isDrawerOpen ? null : largeScreenNavbar}
        {smallScreenNavbar}
      </Toolbar>
      {/* Drawer for small screens */}
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <div
          role="presentation"
          onClick={() => setIsDrawerOpen(false)}
          onKeyDown={() => setIsDrawerOpen(false)}
        >
          {listLinks}
        </div>
      </Drawer>
    </AppBar>
  );
}

export default NavbarApp;
