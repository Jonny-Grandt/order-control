
import React, { useState } from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Switch, 
  FormControlLabel,
  Divider,
  MenuItem,
  Select,
  Paper,
  Grid,
  Button
} from '@mui/material';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import PhotoExportSettings from './PhotoExportSettings';

const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, changeLanguage, t } = useLanguage();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  
  const handleLanguageChange = (event) => {
    changeLanguage(event.target.value);
  };
  
  return (
    <Box sx={{ maxWidth: '100%', overflow: 'hidden' }}>
      <Typography variant="h4" component="h1" gutterBottom fontWeight="medium">
        {t('settings')}
      </Typography>
      
      <Box sx={{ mt: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: 3, overflow: 'hidden', maxWidth: '100%' }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  {t('appLanguage')}
                </Typography>
                <Divider sx={{ mb: 3 }} />
                <Select
                  value={language}
                  onChange={handleLanguageChange}
                  fullWidth
                  sx={{ mb: 2 }}
                >
                  <MenuItem value="en">English</MenuItem>
                  <MenuItem value="sv">Svenska</MenuItem>
                </Select>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: 3, overflow: 'hidden', maxWidth: '100%' }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  {t('theme')}
                </Typography>
                <Divider sx={{ mb: 3 }} />
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {t('themeDescription')}
                </Typography>
                <FormControlLabel
                  control={
                    <Switch
                      checked={theme === 'dark'}
                      onChange={toggleTheme}
                    />
                  }
                  label={theme === 'dark' ? t('darkMode') : t('lightMode')}
                />
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: 3, overflow: 'hidden', maxWidth: '100%' }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  {t('notifications')}
                </Typography>
                <Divider sx={{ mb: 3 }} />
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {t('notificationsDescription')}
                </Typography>
                <FormControlLabel
                  control={
                    <Switch
                      checked={notificationsEnabled}
                      onChange={() => setNotificationsEnabled(!notificationsEnabled)}
                    />
                  }
                  label={notificationsEnabled ? t('enabled') : t('disabled')}
                />
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12}>
            <PhotoExportSettings />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Settings;
