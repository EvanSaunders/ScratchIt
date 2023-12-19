import React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {jwtDecode} from "jwt-decode";

const Appbar = () => {
    const navigate = useNavigate();
    const jwtToken = localStorage.getItem('jwtToken');

    const handleNavigation = () => {
        if (jwtToken) {
            // Perform logout logic, e.g., clear token from localStorage
            localStorage.removeItem('jwtToken');
            // Navigate to the home page after successful logout
            navigate('/');
                console.log("Successfully Logged Out")
        } else {
            // Navigate to the login page
            navigate('/login');
        }
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        News
                    </Typography>
                    <Button color="inherit" onClick={handleNavigation}>
                        {jwtToken ? 'Logout' : 'Login'}
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Appbar;
