
import React from 'react';
import { Menu, MenuItem, ListItemText, IconButton, Tooltip } from '@mui/material';
import { Translate } from '@mui/icons-material';
import { useLanguage } from '../../contexts/LanguageContext.jsx';

const LanguageMenu = () => {
  const { language, changeLanguage } = useLanguage();
  const [anchorEl, setAnchorEl] = React.useState(null);
  
  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const handleLanguageChange = (lang) => {
    changeLanguage(lang);
    handleClose();
  };
  
  return (
    <>
      <Tooltip title={language === 'en' ? 'Change language' : 'Byt språk'}>
        <IconButton 
          onClick={handleOpen}
          color="inherit"
          size="medium"
        >
          <Translate />
        </IconButton>
      </Tooltip>
      
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleLanguageChange('en')}>
          <ListItemText primary="English" />
        </MenuItem>
        <MenuItem onClick={() => handleLanguageChange('sv')}>
          <ListItemText primary="Svenska" />
        </MenuItem>
      </Menu>
    </>
  );
};

export default LanguageMenu;
