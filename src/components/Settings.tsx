
import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  Button,
  Card,
  CardContent,
  Avatar,
  Grid
} from '@mui/material';
import { 
  Translate, 
  DarkMode, 
  LightMode, 
  Notifications, 
  Person,
  LogoutOutlined
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const { user, logout } = useAuth();
  const { mode, toggleTheme } = useTheme();
  const { t, language, changeLanguage } = useLanguage();
  const navigate = useNavigate();
  
  // Handle logout
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 3, height: '100%' }}>
            <CardContent sx={{ textAlign: 'center', py: 4 }}>
              <Avatar 
                sx={{ 
                  width: 100, 
                  height: 100, 
                  mx: 'auto', 
                  bgcolor: 'primary.main',
                  fontSize: '2.5rem'
                }}
              >
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </Avatar>
              
              <Typography variant="h5" sx={{ mt: 2, fontWeight: 'medium' }}>
                {user?.name}
              </Typography>
              
              <Typography variant="body1" color="text.secondary" gutterBottom>
                {user?.email}
              </Typography>
              
              <Button 
                variant="outlined" 
                color="error" 
                startIcon={<LogoutOutlined />}
                onClick={handleLogout}
                sx={{ mt: 3 }}
              >
                {t('logout')}
              </Button>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h5" component="h1" gutterBottom fontWeight="medium">
              {t('settings')}
            </Typography>
            
            <Divider sx={{ my: 2 }} />
            
            <List>
              {/* Language Settings */}
              <ListItem sx={{ py: 2 }}>
                <ListItemIcon>
                  <Translate />
                </ListItemIcon>
                <ListItemText 
                  primary={t('language')}
                  secondary={t('appLanguage')}
                />
                <FormControl>
                  <RadioGroup
                    row
                    value={language}
                    onChange={(e) => changeLanguage(e.target.value as 'en' | 'sv')}
                  >
                    <FormControlLabel 
                      value="en" 
                      control={<Radio />} 
                      label="English" 
                    />
                    <FormControlLabel 
                      value="sv" 
                      control={<Radio />} 
                      label="Svenska" 
                    />
                  </RadioGroup>
                </FormControl>
              </ListItem>
              
              <Divider variant="inset" component="li" />
              
              {/* Theme Settings */}
              <ListItem sx={{ py: 2 }}>
                <ListItemIcon>
                  {mode === 'dark' ? <DarkMode /> : <LightMode />}
                </ListItemIcon>
                <ListItemText 
                  primary={t('theme')}
                  secondary={t('themeDescription')}
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={mode === 'dark'}
                      onChange={toggleTheme}
                      color="primary"
                    />
                  }
                  label={mode === 'dark' ? t('darkMode') : t('lightMode')}
                  labelPlacement="start"
                />
              </ListItem>
              
              <Divider variant="inset" component="li" />
              
              {/* Notifications Settings */}
              <ListItem sx={{ py: 2 }}>
                <ListItemIcon>
                  <Notifications />
                </ListItemIcon>
                <ListItemText 
                  primary={t('notifications')}
                  secondary={t('notificationsDescription')}
                />
                <FormControlLabel
                  control={
                    <Switch
                      defaultChecked
                      color="primary"
                    />
                  }
                  label={t('enabled')}
                  labelPlacement="start"
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Settings;
