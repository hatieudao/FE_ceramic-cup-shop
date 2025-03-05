import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import type React from 'react';
import { useState, useEffect, useCallback } from 'react';

type AnimationEffect = 'fade' | 'slide' | 'zoom' | 'flip';

interface AdvancedImageCarouselProps {
  images: string[];
  autoplay?: boolean;
  interval?: number;
  showControls?: boolean;
  showIndicators?: boolean;
  height?: string;
  width?: string;
  className?: string;
  effect?: AnimationEffect;
  showPlayPause?: boolean;
}

const AdvancedImageCarousel: React.FC<AdvancedImageCarouselProps> = ({
  images,
  autoplay = true,
  interval = 3000,
  showControls = true,
  showIndicators = true,
  height = 'h-96',
  width = 'w-full',
  className = '',
  effect = 'fade',
  showPlayPause = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(!autoplay);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');

  // Function to go to the next image
  const goToNext = useCallback(() => {
    if (isAnimating) return;

    setIsAnimating(true);
    setDirection('next');
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);

    // Reset animation state after transition completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 600); // Match this with the CSS transition duration
  }, [images.length, isAnimating]);

  // Function to go to the previous image
  const goToPrevious = useCallback(() => {
    if (isAnimating) return;

    setIsAnimating(true);
    setDirection('prev');
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length,
    );

    // Reset animation state after transition completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 600); // Match this with the CSS transition duration
  }, [images.length, isAnimating]);

  // Function to go to a specific image
  const goToImage = (index: number) => {
    if (isAnimating || index === currentIndex) return;

    setIsAnimating(true);
    setDirection(index > currentIndex ? 'next' : 'prev');
    setCurrentIndex(index);

    // Reset animation state after transition completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 600);
  };

  // Toggle play/pause
  const togglePlayPause = () => {
    setIsPaused(!isPaused);
  };

  // Set up autoplay
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      goToNext();
    }, interval);

    return () => clearInterval(timer);
  }, [isPaused, interval, goToNext]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goToPrevious();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      } else if (e.key === ' ') {
        togglePlayPause();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrevious]); // Removed togglePlayPause from dependencies

  // Get animation classes based on effect
  const getAnimationClasses = (index: number): string => {
    const isActive = index === currentIndex;
    const isNext = (currentIndex + 1) % images.length === index;
    const isPrev = (currentIndex - 1 + images.length) % images.length === index;

    switch (effect) {
      case 'fade':
        return `transition-opacity duration-500 ${isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'}`;

      case 'slide':
        if (isActive) {
          return 'transform transition-transform duration-500 z-10 translate-x-0';
        } else if (
          (direction === 'next' && isNext) ||
          (direction === 'prev' && isPrev)
        ) {
          return `transform transition-transform duration-500 z-0 ${
            direction === 'next' ? 'translate-x-full' : '-translate-x-full'
          }`;
        } else {
          return `transform transition-none z-0 ${direction === 'next' ? '-translate-x-full' : 'translate-x-full'}`;
        }

      case 'zoom':
        return `transition-all duration-500 ${isActive ? 'opacity-100 z-10 scale-100' : 'opacity-0 z-0 scale-110'}`;

      case 'flip':
        return `transition-all duration-500 perspective-1000 ${
          isActive
            ? 'opacity-100 z-10 rotate-y-0'
            : `opacity-0 z-0 ${direction === 'next' ? 'rotate-y-90' : '-rotate-y-90'}`
        }`;

      default:
        return `transition-opacity duration-500 ${isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'}`;
    }
  };

  // If no images, return null
  if (!images.length) return null;

  return (
    <div className={`relative overflow-hidden ${width} ${height} ${className}`}>
      {/* Images */}
      <div className="relative size-full">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute left-0 top-0 size-full ${getAnimationClasses(index)}`}
          >
            <img
              src={image || '/placeholder.svg'}
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

      {/* Play/Pause Button */}
      {showPlayPause && (
        <button
          onClick={togglePlayPause}
          className="absolute right-4 top-4 z-20 rounded-full bg-white/80 p-2 shadow-md transition-colors hover:bg-white"
          aria-label={isPaused ? 'Play slideshow' : 'Pause slideshow'}
        >
          {isPaused ? (
            <Play className="size-5" />
          ) : (
            <Pause className="size-5" />
          )}
        </button>
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

export default AdvancedImageCarousel;
