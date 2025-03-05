import { motion } from 'framer-motion';
import type React from 'react';
import { useState } from 'react';

// Sample product data
const products = [
  {
    id: 1,
    name: 'Ceramic Coffee Cup',
    price: 150,
    image: 'assets/images/cup_demo_1.webp',
  },
  {
    id: 2,
    name: 'Classic White Porcelain Cup',
    price: 150,
    image: 'assets/images/cup_demo_8.webp',
  },
  {
    id: 3,
    name: 'Speckled Handmade Ceramic Mug',
    price: 150,
    image: 'assets/images/cup_demo_3.webp',
  },
  {
    id: 4,
    name: 'Matte Black Minimalist Mug',
    price: 150,
    image: 'assets/images/cup_demo_4.webp',
  },
  {
    id: 5,
    name: 'Glazed Gradient Mug',
    price: 150,
    originalPrice: 200,
    image: 'assets/images/cup_demo_5.webp',
  },
  {
    id: 6,
    name: 'Textured Geometric Ceramic Cup',
    price: 150,
    image: 'assets/images/cup_demo_6.webp',
  },
  {
    id: 7,
    name: 'Double-Walled Ceramic Espresso Cup',
    price: 150,
    image: 'assets/images/cup_demo_7.webp',
  },
];

const categories = ['All', 'Wooden', 'Furnished', 'Table'];

const ProductSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProducts =
    activeCategory === 'All'
      ? products
      : products.filter((product) => product.category === activeCategory);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Category filters */}
        <div className="mb-10 flex flex-wrap justify-center">
          {categories.map((category, index) => (
            <motion.button
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`mx-2 mb-2 px-4 py-2 ${activeCategory === category ? 'border-b-2 border-gray-900 font-bold text-gray-900' : 'text-gray-600 hover:text-gray-900'}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <div className="relative mb-4 overflow-hidden">
                <img
                  src={product.image || '/placeholder.svg'}
                  alt={product.name}
                  className="h-64 w-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 opacity-0 transition-opacity group-hover:opacity-100">
                  <button className="-translate-y-10 bg-white px-4 py-2 font-medium text-gray-900 transition-transform group-hover:translate-y-0">
                    Add to Cart
                  </button>
                </div>
              </div>
              <div>
                <p className="mb-1 text-sm text-gray-500">{product.category}</p>
                <h3 className="mb-2 font-medium">{product.name}</h3>
                <div className="flex items-center">
                  <span className="font-bold text-gray-900">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="ml-2 text-gray-500 line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
