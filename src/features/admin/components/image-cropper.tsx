import type React from 'react';
import { useState, useRef } from 'react';
import ReactCrop, { type Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

interface ImageCropperProps {
  image: string;
  onCropComplete: (croppedImageUrl: string, croppedBlob: Blob) => void;
  onCancel: () => void;
}

const ImageCropper: React.FC<ImageCropperProps> = ({
  image,
  onCropComplete,
  onCancel,
}) => {
  const [crop, setCrop] = useState<Crop>({
    unit: '%',
    width: 80,
    height: 80,
    x: 10,
    y: 10,
  });
  const [completedCrop, setCompletedCrop] = useState<Crop | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setImageLoaded(true);
    setImageSize({
      width: e.currentTarget.naturalWidth,
      height: e.currentTarget.naturalHeight,
    });
  };

  const getCroppedImg = () => {
    if (!completedCrop || !imgRef.current) return;

    const canvas = document.createElement('canvas');
    const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
    const scaleY = imgRef.current.naturalHeight / imgRef.current.height;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      throw new Error('No 2d context');
    }

    canvas.width = completedCrop.width;
    canvas.height = completedCrop.height;

    ctx.drawImage(
      imgRef.current,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      completedCrop.width,
      completedCrop.height,
    );

    // Convert canvas to blob
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          console.error('Canvas is empty');
          return;
        }
        const croppedImageUrl = URL.createObjectURL(blob);
        onCropComplete(croppedImageUrl, blob);
      },
      'image/jpeg',
      0.95,
    );
  };

  return (
    <div className="max-h-[90vh] max-w-full overflow-auto p-4">
      <h3 className="mb-4 text-lg font-semibold">Crop Image</h3>
      <div className="mb-4 max-h-[70vh] overflow-auto">
        <ReactCrop
          crop={crop}
          onChange={(c) => setCrop(c)}
          onComplete={(c) => setCompletedCrop(c)}
          aspect={1}
          className="max-w-full"
        >
          <img
            ref={imgRef}
            src={image || '/placeholder.svg'}
            alt="Crop me"
            onLoad={handleImageLoad}
            crossOrigin="anonymous"
            className="max-h-[60vh] max-w-full object-contain"
          />
        </ReactCrop>
      </div>
      <div className="flex justify-end space-x-2">
        <button
          onClick={onCancel}
          className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          onClick={getCroppedImg}
          className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
          disabled={!completedCrop}
        >
          Apply Crop
        </button>
      </div>
    </div>
  );
};

export default ImageCropper;
