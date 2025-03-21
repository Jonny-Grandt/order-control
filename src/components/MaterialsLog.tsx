
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
  IconButton,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
  Alert
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import { useLanguage } from '../contexts/LanguageContext';
import { getMaterialsByOrderId, addMaterial, Material } from '../services/orderService';

interface MaterialsLogProps {
  orderId: string;
}

const MaterialsLog = ({ orderId }: MaterialsLogProps) => {
  const { t } = useLanguage();
  
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newMaterial, setNewMaterial] = useState({
    name: '',
    quantity: 1,
    unit: 'st'
  });
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Load materials
  useEffect(() => {
    const fetchMaterials = async () => {
      setLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 300));
        
        const data = getMaterialsByOrderId(orderId);
        setMaterials(data);
      } catch (error) {
        console.error('Error fetching materials:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMaterials();
  }, [orderId]);
  
  // Handle add dialog open/close
  const handleOpenDialog = () => {
    setDialogOpen(true);
    setNewMaterial({
      name: '',
      quantity: 1,
      unit: 'st'
    });
    setError('');
  };
  
  const handleCloseDialog = () => {
    setDialogOpen(false);
  };
  
  // Handle form input changes
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewMaterial({
      ...newMaterial,
      [name]: name === 'quantity' ? Number(value) : value
    });
  };
  
  // Handle add material
  const handleAddMaterial = async () => {
    if (!newMaterial.name) {
      setError('Material name is required');
      return;
    }
    
    if (newMaterial.quantity <= 0) {
      setError('Quantity must be greater than 0');
      return;
    }
    
    setSubmitLoading(true);
    setError('');
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const addedMaterial = addMaterial({
        orderId,
        ...newMaterial
      });
      
      setMaterials(prev => [...prev, addedMaterial]);
      handleCloseDialog();
    } catch (error) {
      console.error('Error adding material:', error);
      setError('Failed to add material');
    } finally {
      setSubmitLoading(false);
    }
  };
  
  // Available units
  const units = ['st', 'kg', 'liter', 'par', 'm²', 'm³'];
  
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
        <Typography variant="h6">{t('materials')}</Typography>
        <Button 
          variant="contained" 
          startIcon={<Add />}
          onClick={handleOpenDialog}
        >
          {t('addMaterial')}
        </Button>
      </Box>
      
      <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t('materialName')}</TableCell>
              <TableCell align="right">{t('quantity')}</TableCell>
              <TableCell>{t('unit')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {materials.map((material) => (
              <TableRow key={material.id}>
                <TableCell>{material.name}</TableCell>
                <TableCell align="right">{material.quantity}</TableCell>
                <TableCell>{material.unit}</TableCell>
              </TableRow>
            ))}
            
            {materials.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} align="center" sx={{ py: 3 }}>
                  <Typography>{t('noMaterialsYet')}</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      
      {/* Add Material Dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{t('addMaterial')}</DialogTitle>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          
          <Grid container spacing={2} sx={{ mt: 0.5 }}>
            <Grid item xs={12}>
              <TextField
                autoFocus
                name="name"
                label={t('materialName')}
                fullWidth
                value={newMaterial.name}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                name="quantity"
                label={t('quantity')}
                type="number"
                fullWidth
                value={newMaterial.quantity}
                onChange={handleInputChange}
                inputProps={{ min: 1 }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="unit"
                label={t('unit')}
                select
                fullWidth
                value={newMaterial.unit}
                onChange={handleInputChange}
              >
                {units.map((unit) => (
                  <MenuItem key={unit} value={unit}>
                    {unit}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>{t('cancel')}</Button>
          <Button 
            onClick={handleAddMaterial}
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

export default MaterialsLog;
