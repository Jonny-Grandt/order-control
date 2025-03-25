
import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';

const MainLayout = () => {
  console.log("Rendering MainLayout");
  return (
    <Box sx={{ 
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      width: '100%',
      overflow: 'hidden'
    }}>
      <Navbar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3 },
          width: '100%',
          mt: '64px', // AppBar height
          transition: 'margin 225ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
