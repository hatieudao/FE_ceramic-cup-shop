import { ChevronDown, ChevronUp, Eye, Play, X } from 'lucide-react';
import { useState } from 'react';
const ImagePreviewModal = ({ image, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
    <div className="relative w-full max-w-5xl bg-white p-4">
      <button
        onClick={onClose}
        className="absolute -right-4 -top-4 flex size-8 items-center justify-center rounded-full bg-white shadow-lg hover:bg-gray-100"
      >
        <X className="size-4" />
      </button>
      <img
        src={image || '/placeholder.svg'}
        alt="Preview"
        className="h-auto w-full"
      />
    </div>
  </div>
);

const VideoModal = ({ onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
    <div className="relative aspect-video w-full max-w-4xl bg-white p-4">
      <button
        onClick={onClose}
        className="absolute -right-4 -top-4 flex size-8 items-center justify-center rounded-full bg-white shadow-lg hover:bg-gray-100"
      >
        <X className="size-4" />
      </button>
      <video controls className="size-full">
        <source src="/placeholder-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  </div>
);
const ProductDetail = () => {
  const [activeTab, setActiveTab] = useState('description');
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const [showImagePreview, setShowImagePreview] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const images = [
    {
      id: 1,
      src: 'assets/images/slider-02-img-01.webp',
      alt: 'Chair front view',
    },
    {
      id: 2,
      src: 'assets/images/product-demo.webp',
      alt: 'Chair side view',
    },
    {
      id: 3,
      src: 'assets/images/slider-01-img-01.webp',
      alt: 'Chair phone holder',
    },
  ];

  const handleQuantityChange = (amount: number) => {
    const newQuantity = quantity + amount;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleDirectQuantityInput = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1) {
      setQuantity(value);
    }
  };

  const clearSize = () => {
    setSelectedSize(null);
  };
  const visibleThumbnails = images.slice(startIndex, startIndex + 3);

  const handlePrevThumbnails = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const handleNextThumbnails = () => {
    if (startIndex + 3 < images.length) {
      setStartIndex(startIndex + 1);
    }
  };

  return (
    <div className="mx-auto max-w-7xl p-4 font-sans">
      <div className="flex flex-col gap-8 md:flex-row">
        {/* Left Column - Image Gallery */}
        <div className="flex gap-4 md:w-2/3">
          {/* Thumbnails */}
          <div className="relative flex flex-col">
            <button
              className={`flex h-6 w-full items-center justify-center ${startIndex === 0 ? 'text-gray-300' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={handlePrevThumbnails}
              disabled={startIndex === 0}
            >
              <ChevronUp className="size-5" />
            </button>

            <div className="flex flex-col gap-2">
              {visibleThumbnails.map((img, idx) => (
                <div
                  key={img.id}
                  className={`size-16 cursor-pointer overflow-hidden border ${
                    currentImageIndex === startIndex + idx
                      ? 'border-black'
                      : 'border-gray-200'
                  }`}
                  onClick={() => setCurrentImageIndex(startIndex + idx)}
                >
                  <img
                    src={img.src || '/placeholder.svg'}
                    alt={img.alt}
                    className="size-full object-cover"
                  />
                </div>
              ))}
            </div>

            <button
              className={`flex h-6 w-full items-center justify-center ${
                startIndex + 3 >= images.length
                  ? 'text-gray-300'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={handleNextThumbnails}
              disabled={startIndex + 3 >= images.length}
            >
              <ChevronDown className="size-5" />
            </button>
          </div>

          {/* Main Image */}
          <div className="relative flex-1">
            <span className="absolute left-2 top-2 z-10 bg-red-500 px-2 py-0.5 text-xs text-white">
              Sale
            </span>
            <div className="relative aspect-square w-full">
              <img
                src={images[currentImageIndex].src || '/placeholder.svg'}
                alt={images[currentImageIndex].alt}
                className="size-full bg-gray-50 object-contain"
              />
              <div className="absolute bottom-2 right-2 flex gap-2">
                <button
                  onClick={() => setShowImagePreview(true)}
                  className="flex size-8 items-center justify-center rounded-full bg-white/70 transition-colors hover:bg-white/90"
                >
                  <Eye className="size-4" />
                </button>
                <button
                  onClick={() => setShowVideoModal(true)}
                  className="flex size-8 items-center justify-center rounded-full bg-white/70 transition-colors hover:bg-white/90"
                >
                  <Play className="size-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Product Info */}
        <div className="md:w-1/3">
          <div className="mb-3 flex gap-1">
            {[1, 2, 3, 4].map((star) => (
              <svg
                key={star}
                className="size-5 fill-current text-yellow-400"
                viewBox="0 0 24 24"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            ))}
            <svg
              className="size-5 fill-current text-gray-300"
              viewBox="0 0 24 24"
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          </div>

          <h1 className="mb-4 text-3xl font-bold">Golden Easy Spot Chair.</h1>

          <p className="mb-6 leading-relaxed text-gray-600">
            Donec accumsan auctor iaculis. Sed suscipit arcu ligula, at egestas
            magna molestie a. Proin ac ex maximus, ultrices justo eget, sodales
            orci. Aliquam egestas libero ac turpis pharetra, in vehicula lacus
            scelerisque. Vestibulum ut sem laoreet, feugiat tellus at, hendrerit
            arcu.
          </p>

          <div className="mb-6 text-xl font-bold">$200.00 - $400.00</div>

          <div className="space-y-6">
            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="font-medium">Size:</span>
                {selectedSize && (
                  <button
                    onClick={clearSize}
                    className="flex items-center text-sm text-gray-500 hover:text-gray-700"
                  >
                    Clear <X className="ml-1 size-4" />
                  </button>
                )}
              </div>
              <div className="flex gap-2">
                {['S', 'M', 'L', 'XL'].map((size) => (
                  <button
                    key={size}
                    className={`size-12 border ${
                      selectedSize === size
                        ? 'border-black bg-gray-100'
                        : 'border-gray-200 hover:border-gray-300'
                    } transition-colors`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div>
                <label className="mb-2 block font-medium">Quantity:</label>
                <div className="flex items-center rounded border border-gray-200">
                  <button
                    className="px-3 py-2 hover:bg-gray-100"
                    onClick={() => handleQuantityChange(-1)}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={handleDirectQuantityInput}
                    className="w-12 border-x border-gray-200 py-2 text-center"
                  />
                  <button
                    className="px-3 py-2 hover:bg-gray-100"
                    onClick={() => handleQuantityChange(1)}
                  >
                    +
                  </button>
                </div>
              </div>
              <button className="mt-8 rounded bg-red-500 px-6 py-2 text-white transition-colors hover:bg-red-600">
                ADD TO CART
              </button>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <span className="text-gray-600">Category: </span>
              <span className="text-gray-800">
                Full Sweater, SweatShirt, Jacket, Blazer
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mt-12">
        <div className="flex border-b border-gray-200">
          {['description', 'additional', 'reviews'].map((tab) => (
            <button
              key={tab}
              className={`px-6 py-3 ${
                activeTab === tab
                  ? 'border-b-2 border-black font-medium'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              {tab === 'reviews' && ' (1)'}
            </button>
          ))}
        </div>

        <div className="py-6">
          {activeTab === 'description' && (
            <div className="space-y-4">
              <p className="leading-relaxed text-gray-600">
                Lorem ipsum dolor sit amet, consec do eiusmod tincididunt ut
                labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat.
              </p>
              <div className="mt-6">
                <h3 className="mb-3 font-medium">Characteristics:</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-gray-600">
                    <span className="text-gray-400">→</span>
                    Sed amet, consectetur adipisicing elit sed do eiusmod tempor
                    inc.
                  </li>
                  <li className="flex items-center gap-2 text-gray-600">
                    <span className="text-gray-400">→</span>
                    Sunt in culpa qui officia deserunt mollit anim id est
                    laborum.
                  </li>
                  <li className="flex items-center gap-2 text-gray-600">
                    <span className="text-gray-400">→</span>
                    Lorem ipsum dolor sit amet, consec do eiusmod tincididunt.
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Modals */}
      {showImagePreview && (
        <ImagePreviewModal
          image={images[currentImageIndex].src}
          onClose={() => setShowImagePreview(false)}
        />
      )}

      {showVideoModal && (
        <VideoModal onClose={() => setShowVideoModal(false)} />
      )}
    </div>
  );
};

export default ProductDetail;
