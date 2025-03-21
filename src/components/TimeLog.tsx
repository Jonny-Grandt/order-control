
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
  Alert
} from '@mui/material';
import { Add } from '@mui/icons-material';
import { useLanguage } from '../contexts/LanguageContext';
import { getTimeEntriesByOrderId, addTimeEntry, TimeEntry } from '../services/orderService';

interface TimeLogProps {
  orderId: string;
}

const TimeLog = ({ orderId }: TimeLogProps) => {
  const { t } = useLanguage();
  
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newEntry, setNewEntry] = useState({
    date: new Date().toISOString().substring(0, 10),
    hours: 1,
    description: ''
  });
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Calculate total hours
  const totalHours = timeEntries.reduce((total, entry) => total + entry.hours, 0);
  
  // Load time entries
  useEffect(() => {
    const fetchTimeEntries = async () => {
      setLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 300));
        
        const data = getTimeEntriesByOrderId(orderId);
        setTimeEntries(data);
      } catch (error) {
        console.error('Error fetching time entries:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTimeEntries();
  }, [orderId]);
  
  // Handle add dialog open/close
  const handleOpenDialog = () => {
    setDialogOpen(true);
    setNewEntry({
      date: new Date().toISOString().substring(0, 10),
      hours: 1,
      description: ''
    });
    setError('');
  };
  
  const handleCloseDialog = () => {
    setDialogOpen(false);
  };
  
  // Handle form input changes
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewEntry({
      ...newEntry,
      [name]: name === 'hours' ? Number(value) : value
    });
  };
  
  // Handle add time entry
  const handleAddTimeEntry = async () => {
    if (newEntry.hours <= 0) {
      setError('Hours must be greater than 0');
      return;
    }
    
    if (!newEntry.description) {
      setError('Description is required');
      return;
    }
    
    setSubmitLoading(true);
    setError('');
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const addedEntry = addTimeEntry({
        orderId,
        ...newEntry
      });
      
      setTimeEntries(prev => [...prev, addedEntry]);
      handleCloseDialog();
    } catch (error) {
      console.error('Error adding time entry:', error);
      setError('Failed to add time entry');
    } finally {
      setSubmitLoading(false);
    }
  };
  
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
        <CircularProgress />
      </Box>
    );
  }
  
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Box>
          <Typography variant="h6">{t('timeLog')}</Typography>
          <Typography variant="subtitle2" color="text.secondary">
            {t('totalHours')}: {totalHours}
          </Typography>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<Add />}
          onClick={handleOpenDialog}
        >
          {t('logHours')}
        </Button>
      </Box>
      
      <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t('date')}</TableCell>
              <TableCell align="right">{t('hours')}</TableCell>
              <TableCell>{t('description')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {timeEntries.map((entry) => (
              <TableRow key={entry.id}>
                <TableCell>{new Date(entry.date).toLocaleDateString()}</TableCell>
                <TableCell align="right">{entry.hours}</TableCell>
                <TableCell>{entry.description}</TableCell>
              </TableRow>
            ))}
            
            {timeEntries.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} align="center" sx={{ py: 3 }}>
                  <Typography>{t('noTimeEntriesYet')}</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      
      {/* Add Time Entry Dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{t('logHours')}</DialogTitle>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          
          <Grid container spacing={2} sx={{ mt: 0.5 }}>
            <Grid item xs={6}>
              <TextField
                name="date"
                label={t('date')}
                type="date"
                fullWidth
                value={newEntry.date}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="hours"
                label={t('hours')}
                type="number"
                fullWidth
                value={newEntry.hours}
                onChange={handleInputChange}
                inputProps={{ min: 0.5, step: 0.5 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('description')}
                fullWidth
                multiline
                rows={3}
                value={newEntry.description}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>{t('cancel')}</Button>
          <Button 
            onClick={handleAddTimeEntry}
            variant="contained"
            disabled={submitLoading}
          >
            {submitLoading ? <CircularProgress size={24} /> : t('addButton')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TimeLog;
