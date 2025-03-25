
import React, { useRef, useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Camera, X, CheckCircle } from 'lucide-react';
import { AspectRatio } from './ui/aspect-ratio';
import { useIsMobile } from '../hooks/use-mobile';

const CameraCapture = ({ onCapture, onClose }) => {
  console.log("Rendering CameraCapture component");
  
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [cameraError, setCameraError] = useState(null);
  const isMobile = useIsMobile();
  
  const startCamera = async () => {
    try {
      setCameraError(null);
      const constraints = {
        video: { 
          facingMode: "environment",
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      };
      
      console.log("Requesting camera access with constraints:", constraints);
      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      console.log("Camera access granted, got stream:", mediaStream);
      
      setStream(mediaStream);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      setCameraError(`Error accessing camera: ${error.message}`);
    }
  };
  
  const stopCamera = () => {
    if (stream) {
      console.log("Stopping camera stream");
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };
  
  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      console.log("Taking photo, video dimensions:", video.videoWidth, "x", video.videoHeight);
      
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // Draw video frame to canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Convert to data URL
      const imageDataUrl = canvas.toDataURL('image/jpeg');
      console.log("Photo captured, data URL length:", imageDataUrl.length);
      setCapturedImage(imageDataUrl);
      
      // Stop camera after capturing
      stopCamera();
    } else {
      console.error("Video or canvas ref is null");
    }
  };
  
  const confirmPhoto = () => {
    if (capturedImage && onCapture) {
      console.log("Confirming photo");
      onCapture(capturedImage);
      onClose();
    }
  };
  
  const retakePhoto = () => {
    console.log("Retaking photo");
    setCapturedImage(null);
    startCamera();
  };
  
  useEffect(() => {
    console.log("CameraCapture component mounted");
    startCamera();
    
    return () => {
      console.log("CameraCapture component unmounting");
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
        {cameraError ? (
          <div className="text-center text-red-500 py-4">
            {cameraError}
          </div>
        ) : !capturedImage ? (
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
