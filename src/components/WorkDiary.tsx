
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Grid,
  Paper,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
  Alert,
  Divider
} from '@mui/material';
import { Add, Event } from '@mui/icons-material';
import { useLanguage } from '../contexts/LanguageContext';
import { getDiaryEntriesByOrderId, addDiaryEntry, DiaryEntry } from '../services/orderService';

interface WorkDiaryProps {
  orderId: string;
}

const WorkDiary = ({ orderId }: WorkDiaryProps) => {
  const { t } = useLanguage();
  
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newEntry, setNewEntry] = useState({
    date: new Date().toISOString().substring(0, 10),
    text: ''
  });
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Load diary entries
  useEffect(() => {
    const fetchDiaryEntries = async () => {
      setLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 300));
        
        const data = getDiaryEntriesByOrderId(orderId);
        setDiaryEntries(data);
      } catch (error) {
        console.error('Error fetching diary entries:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDiaryEntries();
  }, [orderId]);
  
  // Handle add dialog open/close
  const handleOpenDialog = () => {
    setDialogOpen(true);
    setNewEntry({
      date: new Date().toISOString().substring(0, 10),
      text: ''
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
      [name]: value
    });
  };
  
  // Handle add diary entry
  const handleAddDiaryEntry = async () => {
    if (!newEntry.text) {
      setError('Entry text is required');
      return;
    }
    
    setSubmitLoading(true);
    setError('');
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const addedEntry = addDiaryEntry({
        orderId,
        ...newEntry
      });
      
      setDiaryEntries(prev => [...prev, addedEntry]);
      handleCloseDialog();
    } catch (error) {
      console.error('Error adding diary entry:', error);
      setError('Failed to add diary entry');
    } finally {
      setSubmitLoading(false);
    }
  };
  
  // Sort entries by date (newest first)
  const sortedEntries = [...diaryEntries].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
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
        <Typography variant="h6">{t('workDiary')}</Typography>
        <Button 
          variant="contained" 
          startIcon={<Add />}
          onClick={handleOpenDialog}
        >
          {t('addEntry')}
        </Button>
      </Box>
      
      {sortedEntries.length === 0 ? (
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography>{t('noDiaryEntriesYet')}</Typography>
        </Paper>
      ) : (
        <Grid container spacing={2}>
          {sortedEntries.map((entry) => (
            <Grid item xs={12} key={entry.id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Event color="primary" sx={{ mr: 1 }} />
                    <Typography variant="subtitle1" fontWeight="medium">
                      {new Date(entry.date).toLocaleDateString()}
                    </Typography>
                  </Box>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                    {entry.text}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      
      {/* Add Diary Entry Dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{t('addEntry')}</DialogTitle>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          
          <Grid container spacing={2} sx={{ mt: 0.5 }}>
            <Grid item xs={12}>
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
            <Grid item xs={12}>
              <TextField
                name="text"
                label={t('entry')}
                fullWidth
                multiline
                rows={5}
                value={newEntry.text}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>{t('cancel')}</Button>
          <Button 
            onClick={handleAddDiaryEntry}
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

export default WorkDiary;
