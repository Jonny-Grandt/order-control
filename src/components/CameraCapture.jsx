
import React, { useRef, useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Camera, X, CheckCircle } from 'lucide-react';
import { AspectRatio } from './ui/aspect-ratio';

const CameraCapture = ({ onCapture, onClose }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  
  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "environment" } 
      });
      setStream(mediaStream);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };
  
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };
  
  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // Draw video frame to canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Convert to data URL
      const imageDataUrl = canvas.toDataURL('image/jpeg');
      setCapturedImage(imageDataUrl);
      
      // Stop camera after capturing
      stopCamera();
    }
  };
  
  const confirmPhoto = () => {
    if (capturedImage && onCapture) {
      onCapture(capturedImage);
      onClose();
    }
  };
  
  const retakePhoto = () => {
    setCapturedImage(null);
    startCamera();
  };
  
  React.useEffect(() => {
    startCamera();
    
    return () => {
      stopCamera();
    };
  }, []);
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Take Photo</span>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!capturedImage ? (
          <AspectRatio ratio={4/3} className="bg-muted overflow-hidden rounded-md">
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              className="w-full h-full object-cover"
            />
          </AspectRatio>
        ) : (
          <AspectRatio ratio={4/3} className="bg-muted overflow-hidden rounded-md">
            <img 
              src={capturedImage} 
              alt="Captured" 
              className="w-full h-full object-cover" 
            />
          </AspectRatio>
        )}
        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </CardContent>
      <CardFooter className="flex justify-center">
        {!capturedImage ? (
          <Button onClick={takePhoto} className="w-full">
            <Camera className="mr-2" />
            Capture Photo
          </Button>
        ) : (
          <div className="flex space-x-2 w-full">
            <Button variant="outline" onClick={retakePhoto} className="flex-1">
              Retake
            </Button>
            <Button onClick={confirmPhoto} className="flex-1">
              <CheckCircle className="mr-2" />
              Confirm
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default CameraCapture;
