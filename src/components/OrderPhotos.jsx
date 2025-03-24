
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Camera, Trash2, Upload } from 'lucide-react';
import { Dialog, DialogContent } from './ui/dialog';
import { useToast } from './ui/use-toast';
import CameraCapture from './CameraCapture';
import { getPhotosByOrderId, addOrderPhoto, deleteOrderPhoto } from '../services/orderService';
import { AspectRatio } from './ui/aspect-ratio';
import { useLanguage } from '../contexts/LanguageContext';
import { useIsMobile } from '../hooks/use-mobile';

const OrderPhotos = ({ orderId }) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [photos, setPhotos] = useState(getPhotosByOrderId(orderId) || []);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [syncing, setSyncing] = useState(false);
  
  const handleCapture = (photoData) => {
    const newPhoto = addOrderPhoto({
      orderId,
      imageData: photoData,
      date: new Date().toISOString()
    });
    
    setPhotos((prev) => [...prev, newPhoto]);
    
    // Check if auto-sync is enabled
    const settings = localStorage.getItem('photoExportSettings');
    if (settings) {
      const { autoSync } = JSON.parse(settings);
      if (autoSync) {
        syncPhotos([newPhoto]);
      }
    }
  };
  
  const handleDelete = (photoId) => {
    deleteOrderPhoto(photoId);
    setPhotos((prev) => prev.filter(photo => photo.id !== photoId));
    setSelectedPhoto(null);
  };
  
  const syncPhotos = async (photosToSync = photos) => {
    const settings = localStorage.getItem('photoExportSettings');
    if (!settings) {
      toast({
        title: "Export settings not configured",
        description: "Please configure the Pyramid API settings in Settings page",
        variant: "destructive",
      });
      return;
    }
    
    const { apiEndpoint, apiKey } = JSON.parse(settings);
    if (!apiEndpoint || !apiKey) {
      toast({
        title: "Missing API configuration",
        description: "API endpoint or key is missing in settings",
        variant: "destructive",
      });
      return;
    }
    
    setSyncing(true);
    try {
      // Simulate API call - in a real app, this would be a fetch to your Pyramid API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Photos synchronized",
        description: `${photosToSync.length} photos have been sent to Pyramid`,
      });
      
      console.log("Photos would be sent to:", apiEndpoint);
      console.log("With photos data:", photosToSync.map(p => ({id: p.id, date: p.date})));
    } catch (error) {
      toast({
        title: "Synchronization failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSyncing(false);
    }
  };
  
  return (
    <>
      <div className="space-y-4 max-w-full">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">{t('photos')}</h3>
          <div className="space-x-2">
            {photos.length > 0 && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => syncPhotos()}
                disabled={syncing}
              >
                <Upload className="mr-2 h-4 w-4" />
                {syncing ? "Syncing..." : "Export to Pyramid"}
              </Button>
            )}
            <Button onClick={() => setCameraOpen(true)} size="sm">
              <Camera className="mr-2 h-4 w-4" />
              {t('takePhoto')}
            </Button>
          </div>
        </div>
        
        {photos.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            {t('noPhotosYet')}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mx-auto max-w-full">
            {photos.map((photo) => (
              <Card key={photo.id} className="overflow-hidden cursor-pointer hover:opacity-90 transition-opacity max-w-full"
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
        <DialogContent className={isMobile ? "w-[95vw] max-w-full p-0" : "sm:max-w-md p-0"} hideClose>
          <CameraCapture 
            onCapture={handleCapture}
            onClose={() => setCameraOpen(false)}
          />
        </DialogContent>
      </Dialog>
      
      {/* Photo Preview Dialog */}
      <Dialog open={!!selectedPhoto} onOpenChange={() => setSelectedPhoto(null)}>
        <DialogContent className={isMobile ? "w-[95vw] max-w-full" : "sm:max-w-2xl"}>
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
                <div className="space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => syncPhotos([selectedPhoto])}
                    disabled={syncing}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    {syncing ? "Syncing..." : "Export"}
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    onClick={() => handleDelete(selectedPhoto.id)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    {t('delete')}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default OrderPhotos;
