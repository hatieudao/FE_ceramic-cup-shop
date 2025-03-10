'use client';

import { useState } from 'react';

import { getImageUrl } from '../../../utils/get-image-url';

interface ProductImagesProps {
  images: string[];
}

const ProductImages = ({ images }: ProductImagesProps) => {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="space-y-4">
      <div className="border border-gray-200 p-2">
        <img
          src={getImageUrl(images[selectedImage])}
          alt="Product"
          className="h-[500px] w-full object-cover"
        />
      </div>

      <div className="flex space-x-2 overflow-x-auto pb-2">
        {images.map((image, index) => (
          <button
            key={index}
            className={`min-w-[80px] border p-1 ${selectedImage === index ? 'border-black' : 'border-gray-200'}`}
            onClick={() => setSelectedImage(index)}
          >
            <img
              src={getImageUrl(image)}
              alt={`Thumbnail ${index + 1}`}
              className="h-20 w-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
