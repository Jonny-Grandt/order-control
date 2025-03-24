
import React, { useState } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  TextField, 
  Button, 
  Alert,
  Switch,
  FormControlLabel,
  Divider,
  Snackbar
} from '@mui/material';
import { useLanguage } from '../contexts/LanguageContext';

const PhotoExportSettings = () => {
  const { t } = useLanguage();
  const [apiEndpoint, setApiEndpoint] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [autoSync, setAutoSync] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [error, setError] = useState('');
  
  const handleSaveSettings = (e) => {
    e.preventDefault();
    
    if (!apiEndpoint) {
      setError('Please enter a valid API endpoint');
      return;
    }
    
    try {
      // Save the settings to local storage
      localStorage.setItem('photoExportSettings', JSON.stringify({
        apiEndpoint,
        apiKey,
        autoSync
      }));
      
      setSnackbarMessage('Settings saved successfully!');
      setSnackbarOpen(true);
      setError('');
    } catch (err) {
      setError('Failed to save settings. Please try again.');
    }
  };
  
  // Load saved settings on component mount
  React.useEffect(() => {
    const savedSettings = localStorage.getItem('photoExportSettings');
    if (savedSettings) {
      const parsedSettings = JSON.parse(savedSettings);
      setApiEndpoint(parsedSettings.apiEndpoint || '');
      setApiKey(parsedSettings.apiKey || '');
      setAutoSync(parsedSettings.autoSync || false);
    }
  }, []);
  
  return (
    <Paper sx={{ p: 3, borderRadius: 2, mb: 4 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Photo Export Settings
      </Typography>
      
      <Divider sx={{ mb: 3 }} />
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      
      <Box component="form" onSubmit={handleSaveSettings}>
        <TextField
          fullWidth
          margin="normal"
          label="Pyramid API Endpoint"
          placeholder="https://api.pyramid.example.com/photos"
          value={apiEndpoint}
          onChange={(e) => setApiEndpoint(e.target.value)}
          helperText="Enter the API endpoint for your Pyramid business system"
        />
        
        <TextField
          fullWidth
          margin="normal"
          label="API Key"
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          helperText="Enter your Pyramid API key for authentication"
        />
        
        <FormControlLabel
          control={
            <Switch
              checked={autoSync}
              onChange={(e) => setAutoSync(e.target.checked)}
              color="primary"
            />
          }
          label="Automatically sync photos when taken"
          sx={{ mt: 2, display: 'block' }}
        />
        
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
        >
          Save Settings
        </Button>
      </Box>
      
      <Typography variant="body2" color="text.secondary" sx={{ mt: 4 }}>
        <strong>How it works:</strong> Photos taken in the app will be automatically 
        synchronized with your Pyramid business system when connectivity is available.
        You can manually trigger synchronization from the Photos tab in each order.
      </Typography>
      
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </Paper>
  );
};

export default PhotoExportSettings;
