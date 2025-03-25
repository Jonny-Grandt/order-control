
import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { DarkMode, LightMode } from '@mui/icons-material';
import { useTheme } from '../../contexts/ThemeContext.jsx';
import { useLanguage } from '../../contexts/LanguageContext.jsx';

const ThemeToggle = () => {
  const { mode, toggleTheme } = useTheme();
  const { t } = useLanguage();
  
  return (
    <Tooltip title={mode === 'dark' ? t('lightMode') : t('darkMode')}>
      <IconButton 
        onClick={toggleTheme}
        color="inherit"
        sx={{ mx: 1 }}
        size="medium"
      >
        {mode === 'dark' ? <LightMode /> : <DarkMode />}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;
