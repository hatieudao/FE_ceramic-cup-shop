import type React from 'react';

import AdvancedImageCarousel from './advanced-image';
import ImageCarousel from './image-card';

interface ProductImageGalleryProps {
  images: string[];
  useAdvanced?: boolean;
  effect?: 'fade' | 'slide' | 'zoom' | 'flip';
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
  images,
  useAdvanced = false,
  effect = 'fade',
}) => {
  if (images.length === 0) {
    // Fallback image if no images provided
    return (
      <div className="flex h-96 w-full items-center justify-center bg-gray-100">
        <span className="text-gray-400">No images available</span>
      </div>
    );
  }

  return (
    <div className="w-full">
      {useAdvanced ? (
        <AdvancedImageCarousel
          images={images}
          effect={effect}
          showPlayPause={true}
          height="h-[500px]"
          className="rounded-lg"
        />
      ) : (
        <ImageCarousel
          images={images}
          height="h-[500px]"
          className="rounded-lg"
        />
      )}
    </div>
  );
};

export default ProductImageGallery;
