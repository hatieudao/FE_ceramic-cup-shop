import { Minus, Plus, Star } from 'lucide-react';
import { useState } from 'react';

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

import { SERVER_IMAGE_URL } from '../../../types/product';
import { useAddToCart } from '../../cart/api/add-cart-item';
import { useCart } from '../../cart/api/use-cart';
import { useProduct } from '../api/get-product';

import ProductImageGallery from './product-image-gallery';

interface ProductDetailDialogProps {
  productId: string;
  trigger: React.ReactNode;
}

const ProductDetailDialog = ({
  productId,
  trigger,
}: ProductDetailDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading, isError } = useProduct({
    productId,
    queryConfig: {
      enabled: isOpen,
    },
  });
  const addToCartMutation = useAddToCart();
  const [selectedColor, setSelectedColor] = useState<string>('red');
  const [selectedType, setSelectedType] = useState<any | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [shouldFetch, setShouldFetch] = useState(false); // Prevent API call until needed
  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open) setShouldFetch(true); // Trigger API only when opening
  };
  const handleAddToCart = () => {
    if (!selectedType) return;
    addToCartMutation.mutate({
      data: {
        quantity,
        productTypeId: selectedType.id,
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      {isOpen && shouldFetch && (
        <DialogContent className="max-w-4xl gap-0 p-0">
          {isLoading ? (
            <div className="p-6 text-center">Loading product details...</div>
          ) : isError || !data ? (
            <div className="p-6 text-center text-red-500">
              Error loading product.
            </div>
          ) : (
            <ProductDetailContent
              product={data}
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
              selectedType={selectedType}
              setSelectedType={setSelectedType}
              quantity={quantity}
              setQuantity={setQuantity}
              addToCart={handleAddToCart}
            />
          )}
        </DialogContent>
      )}
    </Dialog>
  );
};

interface ProductDetailContentProps {
  product: any;
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  selectedType: any | null;
  setSelectedType: (type: any) => void;
  quantity: number;
  setQuantity: (value: number) => void;
  addToCart: any;
}

const ProductDetailContent = ({
  product,
  selectedColor,
  setSelectedColor,
  selectedType,
  setSelectedType,
  quantity,
  setQuantity,
  addToCart,
}: ProductDetailContentProps) => {
  const productImages =
    product?.productTypes?.map((pt: any) => pt.imageUrl) || [];
  const colors = [
    { name: 'red', class: 'bg-red-500' },
    { name: 'black', class: 'bg-black' },
    { name: 'pink', class: 'bg-pink-400' },
    { name: 'blue', class: 'bg-blue-600' },
  ];

  const handleQuantityChange = (type: 'increase' | 'decrease') => {
    setQuantity((prev) =>
      type === 'increase' ? prev + 1 : Math.max(1, prev - 1),
    );
  };

  const handleAddToCart = () => {
    if (!selectedType) return;
    addToCart({ ...product, quantity, selectedColor, selectedType });
  };

  return (
    <div className="grid gap-0 md:grid-cols-2">
      {/* Product Image Section */}
      <div className="relative bg-gray-100">
        {selectedType?.imageUrl ? (
          <img
            src={
              selectedType.imageUrl &&
              selectedType.imageUrl.startsWith('/uploads')
                ? SERVER_IMAGE_URL + selectedType.imageUrl
                : selectedType.imageUrl
            }
            alt={selectedType.name || 'Product'}
            className="h-auto w-full"
          />
        ) : (
          <ProductImageGallery
            images={
              productImages.length > 0 ? productImages : ['fallback-image.jpg']
            }
            useAdvanced={true}
            effect="fade"
          />
        )}
      </div>

      {/* Product Details Section */}
      <div className="p-6">
        {/* Rating (Static for now) */}
        <div className="mb-4 flex gap-1">
          {[1, 2, 3].map((i) => (
            <Star key={i} className="size-5 fill-yellow-400 text-yellow-400" />
          ))}
          {[4, 5].map((i) => (
            <Star key={i} className="size-5 fill-gray-200 text-gray-200" />
          ))}
        </div>

        {/* Product Title */}
        <h2 className="mb-4 text-2xl font-bold">
          {selectedType?.name || product?.name || 'Unknown Product'}
        </h2>

        {/* Product Description */}
        <p className="mb-6 text-gray-600">
          {product?.description || 'No description available.'}
        </p>

        {/* Price */}
        <div className="mb-6 text-xl font-bold">
          {selectedType?.price
            ? `$${parseFloat(selectedType.price).toFixed(2)}`
            : 'Select a type'}
        </div>

        {/* Product Type Selection */}
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium">
            Select Product Type:
          </label>
          <div className="flex flex-wrap gap-2">
            {product?.productTypes?.length ? (
              product.productTypes.map((type: any) => (
                <button
                  key={type.id}
                  className={`rounded border px-4 py-2 ${
                    selectedType?.id === type.id
                      ? 'bg-black text-white'
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedType(type)}
                >
                  {type.name} (${parseFloat(type.price).toFixed(2)})
                </button>
              ))
            ) : (
              <p className="text-gray-500">No product types available.</p>
            )}
          </div>
        </div>

        {/* Color Selection */}
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium">Color:</label>
          <div className="flex gap-2">
            {colors.map((color) => (
              <button
                key={color.name}
                className={`size-8 rounded-full ${color.class} ${
                  selectedColor === color.name
                    ? 'ring-2 ring-black ring-offset-2'
                    : ''
                }`}
                onClick={() => setSelectedColor(color.name)}
              />
            ))}
          </div>
        </div>

        {/* Quantity & Add to Cart */}
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <span className="mr-4">Quantity:</span>
            <button
              className="rounded-l border p-2 hover:bg-gray-50"
              onClick={() => handleQuantityChange('decrease')}
            >
              <Minus size={16} />
            </button>
            <span className="border-y px-4 py-2">{quantity}</span>
            <button
              className="rounded-r border p-2 hover:bg-gray-50"
              onClick={() => handleQuantityChange('increase')}
            >
              <Plus size={16} />
            </button>
          </div>
          <button
            className="rounded bg-red-500 px-6 py-2 text-white hover:bg-red-600"
            onClick={handleAddToCart}
            disabled={!selectedType} // Disable if no type is selected
          >
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailDialog;
