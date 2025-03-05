import { LayoutGrid, List } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';

import { useProducts } from '../api/get-products';

// import FilterSort from './filter-sort';
import FilterSort from './filter-sort';
import Pagination from './pagination';
import ProductCardItem from './product-card-item';

interface Filters {
  search: string;
  priceRange: {
    min: string;
    max: string;
  };
  dateRange: {
    from: string;
    to: string;
  };
}
const ShopList = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  // Filter & Sorting States
  // Filter and Sort states
  const [filters, setFilters] = useState<Filters>({
    search: '',
    priceRange: {
      min: '',
      max: '',
    },
    dateRange: {
      from: '',
      to: '',
    },
  });
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [sortOption, setSortOption] = useState('name-asc');
  const handleFilterChange = (
    type: 'search' | 'priceRange' | 'dateRange',
    value: any,
  ) => {
    setFilters((prev) => ({
      ...prev,
      [type]: value,
    }));
  };
  // Fetch Products from API
  const { data, isLoading, error } = useProducts({
    page: currentPage,
    filters: {
      name: filters.search,
      minPrice: filters.priceRange.min
        ? Number(filters.priceRange.min)
        : undefined,
      maxPrice: filters.priceRange.max
        ? Number(filters.priceRange.max)
        : undefined,
    },
  });

  const products = data?.data || [];
  const totalPages = data?.meta?.totalPages || 10;

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, priceRange, sortOption]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  const handleAddToCart = (product: any) => {
    setCartItems((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      return existingItem
        ? prevCart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          )
        : [...prevCart, { ...product, quantity: 1 }];
    });
  };

  if (isLoading) return <p>Loading products...</p>;
  if (error) return <p>Error loading products.</p>;

  return (
    <div>
      {/* Hero Banner */}
      <div
        className="relative flex h-64 items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: 'url(assets/images/page_title_bg.webp)' }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 text-center text-white">
          <h1 className="mb-2 text-4xl font-bold">Shop</h1>
          <div className="flex items-center justify-center space-x-2">
            <Link to="/" className="hover:underline">
              Home
            </Link>
            <span>/</span>
            <span>Shop</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Filter & Sort Component */}
        <FilterSort
          filters={filters}
          sortOption={sortOption}
          onFilterChange={handleFilterChange}
          onSortChange={setSortOption}
        />

        {/* Results Count & View Toggle */}
        <div className="mb-8 flex flex-col items-center justify-between md:flex-row">
          <div className="text-sm text-gray-600">
            Showing {products.length} products
          </div>
          <div className="ml-4 flex items-center space-x-2">
            <button
              className={`p-1 ${viewMode === 'grid' ? 'text-black' : 'text-gray-400'}`}
              onClick={() => setViewMode('grid')}
            >
              <LayoutGrid size={20} />
            </button>
            <button
              className={`p-1 ${viewMode === 'list' ? 'text-black' : 'text-gray-400'}`}
              onClick={() => setViewMode('list')}
            >
              <List size={20} />
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div
          className={`grid ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' : 'grid-cols-1'} gap-6`}
        >
          {products.map((product) => (
            <ProductCardItem
              key={product.id}
              product={product}
              viewMode={viewMode}
            />
          ))}
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default ShopList;
