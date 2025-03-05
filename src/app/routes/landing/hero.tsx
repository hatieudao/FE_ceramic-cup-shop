import { motion, AnimatePresence } from 'framer-motion';
import { MoveLeft, MoveRight } from 'lucide-react';
import type React from 'react';
import { useState } from 'react';

const slides = [
  {
    id: 1,
    tag: '#New Trend',
    tagline: 'Enlight your world. Make yourself more bright.',
    title: 'ABOTAR LIGHTING',
    image: 'assets/images/slider-01-img-01.webp',
    bgColor: 'bg-[#e0f5f5]',
  },
  {
    id: 2,
    tag: '#Best Seller',
    tagline: 'Comfort and style for your living space.',
    title: 'MODERN FURNITURE',
    image: 'assets/images/slider-02-img-01.webp',
    bgColor: 'bg-[#f5f0e0]',
  },
];

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
    }),
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.2, duration: 0.5 },
    }),
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: 'spring', stiffness: 100, damping: 15, delay: 0.2 },
    },
  };

  return (
    <section
      className={`relative overflow-hidden transition-colors duration-500 ${slides[currentSlide].bgColor}`}
    >
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: 'tween', duration: 0.5 }}
          className="container mx-auto px-4 py-20 md:py-32"
        >
          <div
            className={`flex flex-col items-center ${currentSlide % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'}`}
          >
            {/* Image */}
            <motion.div
              className="mb-8 md:mb-0 md:w-1/2"
              variants={imageVariants}
              initial="hidden"
              animate="visible"
            >
              <img
                src={
                  slides[currentSlide].image ||
                  '/placeholder.svg?height=400&width=600'
                }
                alt="Featured Product"
                className="h-[400px] w-[600px] object-contain"
              />
            </motion.div>

            {/* Content */}
            <div className="md:w-1/2 md:px-12">
              <motion.p
                custom={1}
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                className="mb-2 font-medium text-gray-600"
              >
                {slides[currentSlide].tag}
              </motion.p>

              <motion.h1
                custom={2}
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                className="mb-4 text-4xl font-bold md:text-5xl"
              >
                {slides[currentSlide].tagline}
              </motion.h1>

              <motion.h2
                custom={3}
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                className="mb-6 text-2xl font-bold"
              >
                {slides[currentSlide].title}
              </motion.h2>

              <motion.button
                custom={4}
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border border-black px-8 py-3 font-medium transition-colors hover:bg-black hover:text-white"
              >
                SHOP NOW
              </motion.button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <div className="absolute bottom-6 right-6 flex space-x-2">
        <motion.button
          whileHover={{ backgroundColor: '#000', color: '#fff' }}
          whileTap={{ scale: 0.95 }}
          onClick={prevSlide}
          className="bg-white p-3 transition-colors"
        >
          <MoveLeft size={18} />
        </motion.button>
        <motion.button
          whileHover={{ backgroundColor: '#000', color: '#fff' }}
          whileTap={{ scale: 0.95 }}
          onClick={nextSlide}
          className="bg-white p-3 transition-colors"
        >
          <MoveRight size={18} />
        </motion.button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 space-x-2">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => {
              setDirection(index > currentSlide ? 1 : -1);
              setCurrentSlide(index);
            }}
            className={`size-3 rounded-full ${index === currentSlide ? 'bg-black' : 'bg-gray-300'}`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
