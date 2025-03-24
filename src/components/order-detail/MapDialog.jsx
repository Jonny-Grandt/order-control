
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography
} from '@mui/material';
import Map from '../Map';
import { useLanguage } from '../../contexts/LanguageContext';

const MapDialog = ({ open, onClose, address, coordinates }) => {
  const { t } = useLanguage();

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        <Typography variant="h6">{address}</Typography>
      </DialogTitle>
      <DialogContent dividers sx={{ height: 400, p: 0 }}>
        <Map lat={coordinates.lat} lng={coordinates.lng} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t('close')}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default MapDialog;
