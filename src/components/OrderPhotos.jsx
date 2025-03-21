
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Camera, Trash2 } from 'lucide-react';
import { Dialog, DialogContent } from './ui/dialog';
import CameraCapture from './CameraCapture';
import { getPhotosByOrderId, addOrderPhoto, deleteOrderPhoto } from '../services/orderService';
import { AspectRatio } from './ui/aspect-ratio';
import { useLanguage } from '../contexts/LanguageContext';

const OrderPhotos = ({ orderId }) => {
  const { t } = useLanguage();
  const [photos, setPhotos] = useState(getPhotosByOrderId(orderId) || []);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  
  const handleCapture = (photoData) => {
    const newPhoto = addOrderPhoto({
      orderId,
      imageData: photoData,
      date: new Date().toISOString()
    });
    
    setPhotos((prev) => [...prev, newPhoto]);
  };
  
  const handleDelete = (photoId) => {
    deleteOrderPhoto(photoId);
    setPhotos((prev) => prev.filter(photo => photo.id !== photoId));
    setSelectedPhoto(null);
  };
  
  return (
    <>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">{t('photos')}</h3>
          <Button onClick={() => setCameraOpen(true)} size="sm">
            <Camera className="mr-2 h-4 w-4" />
            {t('takePhoto')}
          </Button>
        </div>
        
        {photos.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            {t('noPhotosYet')}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {photos.map((photo) => (
              <Card key={photo.id} className="overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => setSelectedPhoto(photo)}>
                <AspectRatio ratio={4/3}>
                  <img 
                    src={photo.imageData} 
                    alt={`Photo from ${new Date(photo.date).toLocaleDateString()}`}
                    className="w-full h-full object-cover"
                  />
                </AspectRatio>
              </Card>
            ))}
          </div>
        )}
      </div>
      
      {/* Camera Dialog */}
      <Dialog open={cameraOpen} onOpenChange={setCameraOpen}>
        <DialogContent className="sm:max-w-md p-0" hideClose>
          <CameraCapture 
            onCapture={handleCapture}
            onClose={() => setCameraOpen(false)}
          />
        </DialogContent>
      </Dialog>
      
      {/* Photo Preview Dialog */}
      <Dialog open={!!selectedPhoto} onOpenChange={() => setSelectedPhoto(null)}>
        <DialogContent className="sm:max-w-2xl">
          {selectedPhoto && (
            <div className="space-y-3">
              <div className="overflow-hidden rounded-lg">
                <img 
                  src={selectedPhoto.imageData} 
                  alt={`Photo from ${new Date(selectedPhoto.date).toLocaleDateString()}`}
                  className="w-full h-auto"
                />
              </div>
              <div className="flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                  {new Date(selectedPhoto.date).toLocaleString()}
                </div>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(selectedPhoto.id)}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  {t('delete')}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default OrderPhotos;
