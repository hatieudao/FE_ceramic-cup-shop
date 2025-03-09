import { Heart, ShoppingCart, Eye, Plus } from 'lucide-react';
import { useState } from 'react';

import { SERVER_IMAGE_URL } from '../../../types/product';
import { useCart } from '../../cart/api/use-cart';

import ProductDetailDialog from './product-detail-dialog';

const ProductCardItem = ({ product, viewMode }) => {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const handleAddToCart = () => {
    addToCart.mutate({
      id: product.id,
      name: product.name,
      price: product.minPrice,
      quantity: 1,
    });
  };
  if (viewMode === 'list') {
    return (
      <div className="flex overflow-hidden rounded-md border border-gray-200">
        <div className="relative w-1/3">
          <img
            src={
              product?.imageUrls[0] &&
              product?.imageUrls[0].startsWith('/uploads')
                ? SERVER_IMAGE_URL + product?.imageUrls[0]
                : product?.imageUrls[0]
            }
            alt={product.name}
            className="size-full object-cover"
          />
        </div>
        <div className="w-2/3 p-4">
          <div className="mb-1 text-sm text-gray-500">{product.category}</div>
          <h3 className="mb-2 text-lg font-medium">{product.name}</h3>
          <p className="mb-2 font-medium text-red-500">
            ${product.minPrice ? product.minPrice : 'N/A'} - $
            {product.maxPrice ? product.maxPrice : 'N/A'}
          </p>
          <p className="mb-4 text-gray-600">{product.description}</p>
          <div className="flex space-x-2">
            <ProductDetailDialog
              productId={product.id}
              trigger={
                <button
                  className="bg-black px-4 py-2 text-white hover:bg-gray-800"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>
              }
            />

            <button className="border border-gray-300 p-2 hover:bg-gray-100">
              <Heart size={16} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="group relative bg-gray-50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={
            product?.imageUrls[0] &&
            product?.imageUrls[0].startsWith('/uploads')
              ? SERVER_IMAGE_URL + product?.imageUrls[0]
              : product?.imageUrls[0]
          }
          alt={product.name}
          className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        <div className="absolute left-2 top-1/2 flex -translate-y-1/2 flex-col space-y-2 opacity-0 transition-opacity group-hover:opacity-100">
          <button
            className="rounded-full bg-white p-2 transition-colors hover:bg-gray-100"
            onClick={handleAddToCart}
          >
            <ShoppingCart size={16} />
          </button>
          <ProductDetailDialog
            productId={product.id}
            trigger={
              <button className="rounded-full bg-white p-2 shadow hover:bg-gray-100">
                <Eye size={16} />
              </button>
            }
          />
          <button className="rounded-full bg-white p-2 shadow hover:bg-gray-100">
            <Heart size={16} />
          </button>
        </div>
      </div>
      <div className="p-4 text-center">
        <div className="mb-1 text-sm text-gray-500">{product.category}</div>
        <h3 className="font-medium">{product.name}</h3>
        <div className="mt-2 flex items-center justify-between">
          <p className="font-medium text-red-500">
            {product.minPrice ? `$${product.minPrice}` : ''}
            {product.maxPrice ? `- $${product.maxPrice}` : ''}
          </p>
          {/* Add to Cart button only shows on hover */}
          <ProductDetailDialog
            productId={product.id}
            trigger={
              <button
                className={`flex items-center text-sm font-medium text-red-500 transition-opacity duration-200 hover:text-red-700 ${
                  isHovered ? 'opacity-100' : 'opacity-0'
                }`}
                onClick={handleAddToCart}
              >
                <Plus size={14} className="mr-1" /> Add To Cart
              </button>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCardItem;
