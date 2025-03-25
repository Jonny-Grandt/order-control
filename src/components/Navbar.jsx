import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme as useMuiTheme,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';

// Import the smaller components
import LanguageMenu from './navbar/LanguageMenu.jsx';
import UserMenu from './navbar/UserMenu.jsx';
import ThemeToggle from './navbar/ThemeToggle.jsx';
import NavbarDrawer from './navbar/NavbarDrawer.jsx';

// Drawer width
const drawerWidth = 240;

const Navbar = () => {
  console.log("Rendering Navbar component");
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = useState(false);
  
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  
  return (
    <>
      <AppBar 
        position="fixed" 
        elevation={0}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: 'background.paper',
          color: 'text.primary',
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            CleanPro
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LanguageMenu />
            <ThemeToggle />
            <UserMenu />
          </Box>
        </Toolbar>
      </AppBar>
      
      {/* Drawer component */}
      <NavbarDrawer 
        isOpen={mobileOpen} 
        onClose={handleDrawerToggle} 
        drawerWidth={drawerWidth}
        isMobile={isMobile}
      />
      
      {/* Content Wrapper with better mobile support */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3 }, // Responsive padding
          width: '100%',
          ml: { sm: `${drawerWidth}px` },
          mt: '64px', // AppBar height
          transition: 'margin 225ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
        }}
      >
        {/* Content is rendered inside here */}
      </Box>
    </>
  );
};

export default Navbar;
