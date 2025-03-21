
import React, { useState } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  TextField, 
  Button, 
  Container,
  CircularProgress,
  Alert,
  FormControl,
  InputAdornment,
  IconButton
} from '@mui/material';
import { Email, Visibility, VisibilityOff } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

// Logo placeholder component (replace with your actual logo)
const Logo = () => (
  <Box 
    sx={{ 
      width: 150, 
      height: 150, 
      backgroundColor: 'primary.main', 
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto',
      mb: 4,
      color: 'white',
      fontSize: '2rem',
      fontWeight: 'bold'
    }}
  >
    CleanPro
  </Box>
);

const Login = () => {
  const { login, isLoading } = useAuth();
  const { t } = useLanguage();
  
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    
    try {
      setError('');
      await login(email);
    } catch (err) {
      setError('Failed to login. Please try again.');
    }
  };
  
  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          mt: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            width: '100%',
            borderRadius: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Logo />
          
          <Typography component="h1" variant="h4" fontWeight="bold" gutterBottom>
            {t('loginTitle')}
          </Typography>
          
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            {t('loginSubtitle')}
          </Typography>
          
          {error && (
            <Alert severity="error" sx={{ width: '100%', mt: 2 }}>
              {error}
            </Alert>
          )}
          
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label={t('email')}
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                ),
              }}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={isLoading}
              sx={{ mt: 3, mb: 2, py: 1.5 }}
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                t('loginButton')
              )}
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
