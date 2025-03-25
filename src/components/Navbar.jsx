
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  Divider,
  Avatar,
  Button,
  Switch,
  FormControlLabel,
  useMediaQuery,
  useTheme as useMuiTheme,
  Tooltip
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard,
  Assignment,
  SmartToy,
  Settings,
  Logout,
  Translate,
  DarkMode,
  LightMode,
  Person
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useTheme } from '../contexts/ThemeContext.jsx';
import { useLanguage } from '../contexts/LanguageContext.jsx';

// Drawer width
const drawerWidth = 240;

const Navbar = () => {
  console.log("Rendering Navbar component");
  const { user, logout } = useAuth();
  const { mode, toggleTheme } = useTheme();
  const { t, language, changeLanguage } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));
  
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langMenuAnchor, setLangMenuAnchor] = useState(null);
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);
  
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  
  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) {
      setMobileOpen(false);
    }
  };
  
  const handleLogout = () => {
    logout();
    setUserMenuAnchor(null);
    navigate('/');
  };
  
  const handleLanguageChange = (lang) => {
    changeLanguage(lang);
    setLangMenuAnchor(null);
  };
  
  // Navigation items
  const navItems = [
    { text: t('dashboard'), icon: <Dashboard />, path: '/dashboard' },
    { text: t('orders'), icon: <Assignment />, path: '/orders' },
    { text: t('aiAssistant'), icon: <SmartToy />, path: '/ai-assistant' },
    { text: t('settings'), icon: <Settings />, path: '/settings' },
  ];
  
  const drawer = (
    <Box>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h6" component="div" fontWeight="bold">
          CleanPro
        </Typography>
      </Box>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => handleNavigation(item.path)}
              sx={{
                borderRadius: 1,
                mx: 1,
                my: 0.5,
                '&.Mui-selected': {
                  backgroundColor: 'primary.main',
                  color: 'primary.contrastText',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  },
                },
              }}
            >
              <ListItemIcon sx={{ 
                color: location.pathname === item.path ? 'primary.contrastText' : 'inherit',
                minWidth: 40
              }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box sx={{ p: 2 }}>
        <FormControlLabel
          control={
            <Switch
              checked={mode === 'dark'}
              onChange={toggleTheme}
              color="primary"
            />
          }
          label={mode === 'dark' ? t('darkMode') : t('lightMode')}
        />
        <Button
          startIcon={<Translate />}
          fullWidth
          variant="outlined"
          onClick={(e) => setLangMenuAnchor(e.currentTarget)}
          sx={{ mt: 1 }}
        >
          {language === 'en' ? 'English' : 'Svenska'}
        </Button>
      </Box>
    </Box>
  );
  
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
            <Tooltip title={language === 'en' ? 'Change language' : 'Byt språk'}>
              <IconButton 
                onClick={(e) => setLangMenuAnchor(e.currentTarget)}
                color="inherit"
              >
                <Translate />
              </IconButton>
            </Tooltip>
            
            <Tooltip title={mode === 'dark' ? t('lightMode') : t('darkMode')}>
              <IconButton 
                onClick={toggleTheme}
                color="inherit"
                sx={{ mx: 1 }}
              >
                {mode === 'dark' ? <LightMode /> : <DarkMode />}
              </IconButton>
            </Tooltip>
            
            <IconButton 
              onClick={(e) => setUserMenuAnchor(e.currentTarget)}
              sx={{ ml: 1 }}
            >
              <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                {user?.name.charAt(0).toUpperCase() || 'U'}
              </Avatar>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      
      {/* Language Menu */}
      <Menu
        anchorEl={langMenuAnchor}
        open={Boolean(langMenuAnchor)}
        onClose={() => setLangMenuAnchor(null)}
      >
        <MenuItem onClick={() => handleLanguageChange('en')}>
          <ListItemText primary="English" />
        </MenuItem>
        <MenuItem onClick={() => handleLanguageChange('sv')}>
          <ListItemText primary="Svenska" />
        </MenuItem>
      </Menu>
      
      {/* User Menu */}
      <Menu
        anchorEl={userMenuAnchor}
        open={Boolean(userMenuAnchor)}
        onClose={() => setUserMenuAnchor(null)}
      >
        <MenuItem onClick={() => {
          setUserMenuAnchor(null);
          navigate('/settings');
        }}>
          <ListItemIcon>
            <Person fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={user?.name} secondary={user?.email} />
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={t('logout')} />
        </MenuItem>
      </Menu>
      
      {/* Drawer */}
      <Box component="nav">
        <Drawer
          variant={isMobile ? 'temporary' : 'permanent'}
          open={isMobile ? mobileOpen : true}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better mobile performance
          }}
          sx={{
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              border: 'none',
              ...(!isMobile && {
                height: 'calc(100% - 64px)',
                top: 64,
              }),
            },
            display: { xs: 'block', sm: 'block' },
            width: { sm: drawerWidth },
            flexShrink: 0,
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
};

export default Navbar;
