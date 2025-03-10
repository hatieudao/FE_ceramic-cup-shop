import { ChevronRight, Minus, Plus, Heart } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';

import { useProduct } from '../api/get-product';

import ProductImages from './product-detail-image';
import ProductTabs from './product-detail-tabs';

// Define types for our product data
interface ProductType {
  id: string;
  createdAt: string;
  name: string;
  description: string;
  price: string;
  stock: number;
  imageUrl: string;
}

interface Product {
  id: string;
  createdAt: string;
  name: string;
  description: string;
  isDeleted: boolean;
  productTypes: ProductType[];
}

const ProductDetailPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const { data: product, isLoading } = useProduct({ productId: productId! });
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [quantity, setQuantity] = useState(1);

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
  };

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const addToCart = () => {
    // In a real app, this would add the product to the cart
    alert(`Added ${quantity} ${product?.name} (Size: ${selectedSize}) to cart`);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto flex justify-center p-8">
        Loading...
      </div>
    );
  }

  if (!product) {
    return <div className="container mx-auto p-8">Product not found</div>;
  }

  const minPrice = Math.min(
    ...product.productTypes.map((type) => Number.parseFloat(type.price)),
  );
  const maxPrice = Math.max(
    ...product.productTypes.map((type) => Number.parseFloat(type.price)),
  );
  const priceRange = `$${minPrice.toFixed(2)} - $${maxPrice.toFixed(2)}`;

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-100 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm">
            <span>Home</span>
            <ChevronRight className="mx-1 size-4" />
            <span>Product Details</span>
          </div>
        </div>
      </div>

      {/* Product Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Product Images */}
          <ProductImages
            images={product.productTypes.map((type) => type.imageUrl)}
          />

          {/* Product Info */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-gray-600">{product.description}</p>

            <div className="text-2xl font-bold">{priceRange}</div>

            {/* Size Selector */}
            <div>
              <div className="mb-2 flex items-center">
                <span className="mr-2 font-medium">Size:</span>
                <div className="flex space-x-2">
                  {['S', 'M', 'L', 'XL'].map((size) => (
                    <button
                      key={size}
                      className={`flex size-8 items-center justify-center border ${
                        selectedSize === size
                          ? 'border-black bg-black text-white'
                          : 'border-gray-300'
                      }`}
                      onClick={() => handleSizeChange(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="flex items-center space-x-4">
              <div className="font-medium">Quantity:</div>
              <div className="flex items-center border border-gray-300">
                <button
                  className="border-r border-gray-300 px-3 py-1"
                  onClick={decrementQuantity}
                >
                  <Minus className="size-4" />
                </button>
                <span className="px-4 py-1">{quantity}</span>
                <button
                  className="border-l border-gray-300 px-3 py-1"
                  onClick={incrementQuantity}
                >
                  <Plus className="size-4" />
                </button>
              </div>

              <button
                className="bg-black px-6 py-2 text-white transition-colors hover:bg-gray-800"
                onClick={addToCart}
              >
                ADD TO CART
              </button>

              <button className="border border-gray-300 p-2">
                <Heart className="size-5" />
              </button>
            </div>

            {/* Categories */}
            <div>
              <p className="text-gray-600">
                <span className="font-medium">Category:</span> Chair, Full
                Sweater, SweatShirt, Jacket, Blazer
              </p>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="mt-12">
          <ProductTabs product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
