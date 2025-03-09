import { ChevronLeft, ChevronRight } from 'lucide-react';
import type React from 'react';
import { useState, useEffect, useCallback } from 'react';

import { SERVER_IMAGE_URL } from '../../../types/product';

interface ImageCarouselProps {
  images: string[];
  autoplay?: boolean;
  interval?: number;
  showControls?: boolean;
  showIndicators?: boolean;
  height?: string;
  width?: string;
  className?: string;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  autoplay = true,
  interval = 3000,
  showControls = true,
  showIndicators = true,
  height = 'h-96',
  width = 'w-full',
  className = '',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Function to go to the next image
  const goToNext = useCallback(() => {
    if (isAnimating) return;

    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);

    // Reset animation state after transition completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 500); // Match this with the CSS transition duration
  }, [images.length, isAnimating]);

  // Function to go to the previous image
  const goToPrevious = useCallback(() => {
    if (isAnimating) return;

    setIsAnimating(true);
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length,
    );

    // Reset animation state after transition completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 500); // Match this with the CSS transition duration
  }, [images.length, isAnimating]);

  // Function to go to a specific image
  const goToImage = (index: number) => {
    if (isAnimating || index === currentIndex) return;

    setIsAnimating(true);
    setCurrentIndex(index);

    // Reset animation state after transition completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  // Set up autoplay
  useEffect(() => {
    if (!autoplay) return;

    const timer = setInterval(() => {
      goToNext();
    }, interval);

    return () => clearInterval(timer);
  }, [autoplay, interval, goToNext]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goToPrevious();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrevious]);

  // If no images, return null
  if (!images.length) return null;

  return (
    <div className={`relative overflow-hidden ${width} ${height} ${className}`}>
      {/* Images */}
      <div className="relative size-full">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute left-0 top-0 size-full transition-opacity duration-500 ${
              index === currentIndex ? 'z-10 opacity-100' : 'z-0 opacity-0'
            }`}
          >
            <img
              src={
                image && image.startsWith('/uploads')
                  ? SERVER_IMAGE_URL + image
                  : image
              }
              alt={`Slide ${index + 1}`}
              className="size-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Navigation Controls */}
      {showControls && images.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-md transition-colors hover:bg-white"
            aria-label="Previous image"
          >
            <ChevronLeft className="size-6" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-md transition-colors hover:bg-white"
            aria-label="Next image"
          >
            <ChevronRight className="size-6" />
          </button>
        </>
      )}

      {/* Indicators */}
      {showIndicators && images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`size-2.5 rounded-full transition-all ${
                index === currentIndex
                  ? 'w-6 bg-white'
                  : 'bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;
