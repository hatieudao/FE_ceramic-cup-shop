import { Eye, Heart, Share } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/utils/cn';

import { useCart } from '../../../features/cart/api/use-cart';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  imageSrc: string;
  isTopSale?: boolean;
}

const ProductCard = ({
  id,
  name,
  price,
  imageSrc,
  isTopSale = false,
}: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();

  return (
    <div
      className="group relative overflow-hidden rounded-md bg-white transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isTopSale && (
        <div className="absolute left-3 top-3 z-10 rounded bg-red-500 px-2 py-1 text-xs font-medium text-white">
          Top Sale
        </div>
      )}

      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={imageSrc || '/placeholder.svg'}
          alt={name}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Action Icons - Only visible on hover */}
        <div
          className={cn(
            'absolute left-3 top-1/2 -translate-y-1/2 flex flex-col gap-2 transition-opacity duration-300',
            isHovered ? 'opacity-100' : 'opacity-0',
          )}
        >
          <Button
            size="icon"
            variant="secondary"
            className="size-9 rounded-full bg-white shadow-sm hover:bg-gray-100"
          >
            <Eye className="size-4 text-gray-700" />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="size-9 rounded-full bg-white shadow-sm hover:bg-gray-100"
          >
            <Heart className="size-4 text-gray-700" />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="size-9 rounded-full bg-white shadow-sm hover:bg-gray-100"
          >
            <Share className="size-4 text-gray-700" />
          </Button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="mb-1 font-medium text-gray-900">{name}</h3>
        <div className="flex items-center justify-between">
          <p className="font-semibold text-red-500">${price}</p>

          {/* Add to Cart - Only visible on hover */}
          <Button
            variant="ghost"
            className={cn(
              'text-red-500 hover:text-red-600 hover:bg-transparent p-0 transition-opacity duration-300',
              isHovered ? 'opacity-100' : 'opacity-0',
            )}
            onClick={() => addToCart.mutate({ id, name, price, quantity: 1 })}
          >
            + Add To Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export { ProductCard };
