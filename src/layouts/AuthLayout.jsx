
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

const AuthLayout = () => {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        minHeight: '100vh',
        backgroundColor: (theme) => 
          theme.palette.mode === 'dark' 
            ? 'background.default'
            : 'background.default'
      }}
    >
      <Outlet />
    </Box>
  );
};

export default AuthLayout;
