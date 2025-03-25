
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Button,
  Switch,
  FormControlLabel,
} from '@mui/material';
import {
  Dashboard,
  Assignment,
  SmartToy,
  Settings,
  Translate,
} from '@mui/icons-material';
import { useTheme } from '../../contexts/ThemeContext.jsx';
import { useLanguage } from '../../contexts/LanguageContext.jsx';

const NavbarDrawer = ({ isOpen, onClose, drawerWidth, isMobile }) => {
  const { mode, toggleTheme } = useTheme();
  const { t, language, changeLanguage } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) {
      onClose();
    }
  };
  
  // Navigation items
  const navItems = [
    { text: t('dashboard'), icon: <Dashboard />, path: '/dashboard' },
    { text: t('orders'), icon: <Assignment />, path: '/orders' },
    { text: t('aiAssistant'), icon: <SmartToy />, path: '/ai-assistant' },
    { text: t('settings'), icon: <Settings />, path: '/settings' },
  ];
  
  return (
    <Drawer
      variant={isMobile ? 'temporary' : 'permanent'}
      open={isMobile ? isOpen : true}
      onClose={onClose}
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
            onClick={(e) => changeLanguage(language === 'en' ? 'sv' : 'en')}
            sx={{ mt: 1 }}
          >
            {language === 'en' ? 'English' : 'Svenska'}
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default NavbarDrawer;
