import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Plus, Trash } from 'lucide-react';
import type React from 'react';
import { useState, useRef } from 'react';

import { useUploadImage } from '../../file-upload/upload-image';
import { useCreateProduct } from '../api/create-product';

import ImageCropper from './image-cropper';

interface ProductType {
  id?: string;
  name: string;
  description: string;
  price: string;
  stock: number;
  imageUrl: string;
  file?: File;
  imageBlob?: Blob;
  uploadProgress?: number;
  filePath?: string;
}

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { mutate: uploadImage, data, isLoading, error } = useUploadImage();
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productTypes, setProductTypes] = useState<ProductType[]>([
    { name: '', description: '', price: '', stock: 0, imageUrl: '' },
  ]);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cropImage, setCropImage] = useState<{
    index: number;
    imageUrl: string;
  } | null>(null);
  const [uploadStatus, setUploadStatus] = useState<{
    [key: number]: { progress: number; error?: string };
  }>({});
  const createMutation = useCreateProduct();

  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.2 },
    },
  };

  const handleProductTypeChange = (
    index: number,
    field: keyof ProductType,
    value: string | number,
  ) => {
    const updatedProductTypes = [...productTypes];
    updatedProductTypes[index] = {
      ...updatedProductTypes[index],
      [field]: value,
    };
    setProductTypes(updatedProductTypes);
  };

  const handleAddProductType = () => {
    setProductTypes([
      ...productTypes,
      { name: '', description: '', price: '', stock: 0, imageUrl: '' },
    ]);
  };

  const handleRemoveProductType = (index: number) => {
    if (productTypes.length > 1) {
      const updatedProductTypes = productTypes.filter((_, i) => i !== index);
      setProductTypes(updatedProductTypes);
    }
  };

  const handleFileChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setCropImage({ index, imageUrl });

      // Store the file for later upload
      const updatedProductTypes = [...productTypes];
      updatedProductTypes[index] = { ...updatedProductTypes[index], file };
      setProductTypes(updatedProductTypes);
    }
  };

  const handleCropComplete = async (
    croppedImageUrl: string,
    croppedBlob: Blob,
  ) => {
    if (cropImage) {
      const { index } = cropImage;

      try {
        // Create a File object from the Blob
        const file = new File([croppedBlob], 'cropped-image.jpg', {
          type: 'image/jpeg',
        });

        // Upload the file using the uploadImage mutation
        uploadImage(file, {
          onSuccess: (response) => {
            // Update product types with the returned file path
            const updatedProductTypes = [...productTypes];
            updatedProductTypes[index] = {
              ...updatedProductTypes[index],
              imageUrl: croppedImageUrl, // Keep the local preview URL
              imageBlob: croppedBlob, // Keep the blob for form state
              file: file, // Keep the file reference
              filePath: response.path, // Store the server file path
            };
            setProductTypes(updatedProductTypes);
          },
          onError: (error) => {
            console.error('Error uploading image:', error);
            alert('Failed to upload image. Please try again.');
          },
        });
      } catch (error) {
        console.error('Error processing image:', error);
        alert('Failed to process image. Please try again.');
      }

      setCropImage(null);
    }
  };

  const handleSubmit = async () => {
    if (!productName.trim()) {
      alert('Please enter a product name');
      return;
    }

    if (productTypes.some((type) => !type.name.trim())) {
      alert('Please enter a name for each product type');
      return;
    }

    setIsSubmitting(true);

    try {
      // Create the product object - exclude temporary form state properties
      const newProduct = {
        name: productName,
        description: productDescription,
        productTypes: productTypes.map(
          ({ file, imageBlob, uploadProgress, filePath, ...rest }) => ({
            ...rest,
            imageUrl: filePath || rest.imageUrl, // Use server file path if available
          }),
        ),
      };

      // Submit the product
      const product = await createMutation.mutateAsync(newProduct);
      if (product) {
        // Reset form and close modal
        setProductName('');
        setProductDescription('');
        setProductTypes([
          { name: '', description: '', price: '', stock: 0, imageUrl: '' },
        ]);
        setCurrentStep(1);
        setUploadStatus({});
        onClose();
      } else {
        toast.error('Failed to add product. Please try again.');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (currentStep === 1) {
      if (!productName.trim()) {
        alert('Please enter a product name');
        return;
      }
      setCurrentStep(2);
    }
  };

  const prevStep = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50">
      <AnimatePresence>
        <motion.div
          className="mx-4 my-8 max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-lg bg-white shadow-xl"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="p-6">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-xl font-semibold">Add New Product</h3>
              <button
                onClick={onClose}
                className="text-gray-400 transition-colors hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            {/* Image Cropper Modal */}
            {cropImage && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
                <div className="max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-lg bg-white">
                  <ImageCropper
                    image={cropImage.imageUrl}
                    onCropComplete={handleCropComplete}
                    onCancel={() => setCropImage(null)}
                  />
                </div>
              </div>
            )}

            <div className="mb-6">
              <div className="mb-6 flex">
                <div
                  className={`flex-1 border-b-2 pb-2 ${currentStep === 1 ? 'border-indigo-600 text-indigo-600' : 'border-gray-200'}`}
                >
                  <span className="font-medium">1. Basic Information</span>
                </div>
                <div
                  className={`flex-1 border-b-2 pb-2 ${currentStep === 2 ? 'border-indigo-600 text-indigo-600' : 'border-gray-200'}`}
                >
                  <span className="font-medium">2. Product Types</span>
                </div>
              </div>

              {currentStep === 1 && (
                <div>
                  <div className="mb-4">
                    <label className="mb-2 block text-gray-700">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      className="w-full rounded border p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Enter product name"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="mb-2 block text-gray-700">
                      Description
                    </label>
                    <textarea
                      value={productDescription}
                      onChange={(e) => setProductDescription(e.target.value)}
                      className="h-32 w-full rounded border p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Enter product description"
                    ></textarea>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <h4 className="text-lg font-medium">Product Types</h4>
                    <button
                      onClick={handleAddProductType}
                      className="flex items-center text-indigo-600 hover:text-indigo-800"
                    >
                      <Plus size={16} className="mr-1" />
                      Add Type
                    </button>
                  </div>

                  {productTypes.map((type, index) => (
                    <div key={index} className="mb-6 rounded-lg border p-4">
                      <div className="mb-4 flex items-center justify-between">
                        <h5 className="font-medium">Type #{index + 1}</h5>
                        {productTypes.length > 1 && (
                          <button
                            onClick={() => handleRemoveProductType(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash size={16} />
                          </button>
                        )}
                      </div>

                      <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                          <label className="mb-2 block text-gray-700">
                            Name *
                          </label>
                          <input
                            type="text"
                            value={type.name}
                            onChange={(e) =>
                              handleProductTypeChange(
                                index,
                                'name',
                                e.target.value,
                              )
                            }
                            className="w-full rounded border p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="e.g., Small, Red, etc."
                          />
                        </div>

                        <div>
                          <label className="mb-2 block text-gray-700">
                            Description
                          </label>
                          <input
                            type="text"
                            value={type.description}
                            onChange={(e) =>
                              handleProductTypeChange(
                                index,
                                'description',
                                e.target.value,
                              )
                            }
                            className="w-full rounded border p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Type description"
                          />
                        </div>
                      </div>

                      <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                          <label className="mb-2 block text-gray-700">
                            Price *
                          </label>
                          <input
                            type="number"
                            value={type.price}
                            onChange={(e) =>
                              handleProductTypeChange(
                                index,
                                'price',
                                e.target.value,
                              )
                            }
                            className="w-full rounded border p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="0.00"
                            min="0"
                            step="0.01"
                          />
                        </div>

                        <div>
                          <label className="mb-2 block text-gray-700">
                            Stock *
                          </label>
                          <input
                            type="number"
                            value={type.stock}
                            onChange={(e) =>
                              handleProductTypeChange(
                                index,
                                'stock',
                                Number.parseInt(e.target.value),
                              )
                            }
                            className="w-full rounded border p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="0"
                            min="0"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="mb-2 block text-gray-700">
                          Product Image
                        </label>
                        <div className="flex items-center space-x-4">
                          <div
                            className="relative flex size-24 cursor-pointer items-center justify-center overflow-hidden border-2 border-dashed border-gray-300 hover:border-indigo-500"
                            onClick={() =>
                              fileInputRefs.current[index]?.click()
                            }
                          >
                            {type.imageUrl ? (
                              <>
                                <img
                                  src={type.imageUrl || '/placeholder.svg'}
                                  alt="Product"
                                  className="size-full object-cover"
                                />
                                {uploadStatus[index] &&
                                  uploadStatus[index].progress < 100 &&
                                  uploadStatus[index].progress > 0 && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                      <div className="text-sm font-medium text-white">
                                        {Math.round(
                                          uploadStatus[index].progress,
                                        )}
                                        %
                                      </div>
                                    </div>
                                  )}
                              </>
                            ) : (
                              <Upload size={24} className="text-gray-400" />
                            )}
                            <input
                              type="file"
                              ref={(el) => (fileInputRefs.current[index] = el)}
                              onChange={(e) => handleFileChange(index, e)}
                              className="hidden"
                              accept="image/*"
                            />
                          </div>
                          <div className="text-sm text-gray-500">
                            {type.imageUrl ? (
                              <button
                                onClick={() =>
                                  handleProductTypeChange(index, 'imageUrl', '')
                                }
                                className="text-red-500 hover:text-red-700"
                              >
                                Remove image
                              </button>
                            ) : (
                              'Click to upload an image'
                            )}
                          </div>
                        </div>
                        {uploadStatus[index]?.error && (
                          <p className="mt-1 text-sm text-red-500">
                            Error: {uploadStatus[index].error}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-between">
              {currentStep === 1 ? (
                <div></div>
              ) : (
                <button
                  onClick={prevStep}
                  className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
                >
                  Back
                </button>
              )}

              {currentStep === 1 ? (
                <button
                  onClick={nextStep}
                  className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 ${isSubmitting ? 'cursor-not-allowed opacity-50' : ''}`}
                >
                  {isSubmitting ? 'Adding Product...' : 'Add Product'}
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AddProductModal;
