import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  Eye,
  Edit,
  Trash,
  Plus,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import type React from 'react';
import { useState, useEffect } from 'react';

import { Product } from '@/types/product';

import { getImageUrl } from '../../../utils/get-image-url';
import { useProductList } from '../api/get-product-list';

import AddProductModal from './add-product-modal';

const ProductsTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof Product>('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  const { data, isLoading, error } = useProductList({
    page: currentPage,
    perPage: productsPerPage,
  });

  const products = data?.data || [];
  const totalPages = data?.meta?.totalPages || 1;

  // Filter and sort products
  const filteredProducts = products
    .filter((product: Product) => {
      if (!searchTerm) return true;
      return (
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    })
    .sort((a: Product, b: Product) => {
      if (sortField === 'createdAt') {
        return sortDirection === 'asc'
          ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else {
        const aValue = String(a[sortField]).toLowerCase();
        const bValue = String(b[sortField]).toLowerCase();
        return sortDirection === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
    });

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Reset to first page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  if (isLoading)
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-center">
          <div className="mb-4 size-12 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-center text-red-600">
          <p>Error loading products.</p>
          <p className="text-sm">Please try again later.</p>
        </div>
      </div>
    );

  const handleSort = (field: keyof Product) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleAddProduct = (product: any) => {
    // For demo purposes, we'll just log the product
    console.log('Adding product:', product);
  };

  const tableVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: 'beforeChildren',
        staggerChildren: 0.05,
      },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

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

  return (
    <motion.div
      variants={tableVariants}
      initial="hidden"
      animate="visible"
      className="overflow-hidden rounded-lg bg-white shadow-md"
    >
      <div className="p-6">
        <div className="mb-6 flex flex-col items-start justify-between md:flex-row md:items-center">
          <h2 className="mb-4 text-xl font-semibold md:mb-0">
            Products Management
          </h2>

          <button
            className="flex items-center rounded-md bg-indigo-600 px-4 py-2 text-white transition-colors hover:bg-indigo-700"
            onClick={() => setShowAddModal(true)}
          >
            <Plus size={18} className="mr-2" />
            Add Product
          </button>
        </div>

        {/* Filters and Search */}
        <div className="mb-6 flex flex-col justify-between space-y-4 md:flex-row md:space-y-0">
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-md border py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={18}
            />
          </div>

          <div className="flex space-x-4">
            <div className="relative">
              <select className="appearance-none rounded-md border py-2 pl-10 pr-8 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option value="all">All Categories</option>
                <option value="cups">Cups</option>
                <option value="furniture">Furniture</option>
                <option value="lighting">Lighting</option>
              </select>
              <Filter
                className="absolute left-3 top-2.5 text-gray-400"
                size={18}
              />
              <ChevronDown
                className="absolute right-3 top-2.5 text-gray-400"
                size={18}
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="cursor-pointer px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  onClick={() => handleSort('id')}
                >
                  <div className="flex items-center">
                    ID
                    {sortField === 'id' &&
                      (sortDirection === 'asc' ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      ))}
                  </div>
                </th>
                <th
                  scope="col"
                  className="cursor-pointer px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  Image
                </th>
                <th
                  scope="col"
                  className="cursor-pointer px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center">
                    Name
                    {sortField === 'name' &&
                      (sortDirection === 'asc' ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      ))}
                  </div>
                </th>
                <th
                  scope="col"
                  className="cursor-pointer px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  onClick={() => handleSort('createdAt')}
                >
                  <div className="flex items-center">
                    Created At
                    {sortField === 'createdAt' &&
                      (sortDirection === 'asc' ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      ))}
                  </div>
                </th>
                <th
                  scope="col"
                  className="cursor-pointer px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  <div className="flex items-center">Price</div>
                </th>
                <th
                  scope="col"
                  className="cursor-pointer px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  <div className="flex items-center">Stock</div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {currentProducts.length > 0 ? (
                currentProducts.map((product) => (
                  <motion.tr
                    key={product.id}
                    variants={rowVariants}
                    whileHover={{ backgroundColor: '#f9fafb' }}
                  >
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                      {product.id.substring(0, 8)}...
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="size-12 overflow-hidden rounded-md bg-gray-100">
                        {product.productTypes &&
                        product.productTypes.length > 0 &&
                        product.productTypes[0].imageUrl ? (
                          <img
                            src={getImageUrl(product.productTypes[0].imageUrl)}
                            alt={product.name}
                            className="size-full object-cover"
                          />
                        ) : (
                          <div className="flex size-full items-center justify-center bg-gray-200 text-gray-500">
                            No img
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {product.name}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {new Date(product.createdAt).toLocaleDateString()}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {product.productTypes && product.productTypes.length > 0
                        ? `$${product.productTypes[0].price}`
                        : 'N/A'}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {product.productTypes && product.productTypes.length > 0
                        ? product.productTypes[0].stock
                        : 'N/A'}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => setSelectedProduct(product)}
                          className="text-indigo-600 hover:text-indigo-900"
                          title="View details"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          className="text-blue-600 hover:text-blue-900"
                          title="Edit product"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-900"
                          title="Delete product"
                        >
                          <Trash size={18} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredProducts.length > 0 && (
          <div className="mt-4 flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6">
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing{' '}
                  <span className="font-medium">{indexOfFirstProduct + 1}</span>{' '}
                  to{' '}
                  <span className="font-medium">
                    {indexOfLastProduct > filteredProducts.length
                      ? filteredProducts.length
                      : indexOfLastProduct}
                  </span>{' '}
                  of{' '}
                  <span className="font-medium">{filteredProducts.length}</span>{' '}
                  results
                </p>
              </div>
              <div>
                <nav
                  className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                  aria-label="Pagination"
                >
                  <button
                    onClick={() => paginate(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className={`relative inline-flex items-center rounded-l-md p-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                      currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''
                    }`}
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronLeft className="size-5" aria-hidden="true" />
                  </button>

                  {/* Page numbers */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (number) => (
                      <button
                        key={number}
                        onClick={() => paginate(number)}
                        className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                          currentPage === number
                            ? 'bg-indigo-600 text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                            : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                        }`}
                      >
                        {number}
                      </button>
                    ),
                  )}

                  <button
                    onClick={() =>
                      paginate(Math.min(totalPages, currentPage + 1))
                    }
                    disabled={currentPage === totalPages}
                    className={`relative inline-flex items-center rounded-r-md p-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                      currentPage === totalPages
                        ? 'cursor-not-allowed opacity-50'
                        : ''
                    }`}
                  >
                    <span className="sr-only">Next</span>
                    <ChevronRight className="size-5" aria-hidden="true" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Product Details Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <motion.div
              className="mx-4 w-full max-w-3xl rounded-lg bg-white shadow-xl"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Product Details</h3>
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    &times;
                  </button>
                </div>

                <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    {selectedProduct.productTypes &&
                    selectedProduct.productTypes.length > 0 &&
                    selectedProduct.productTypes[0].imageUrl ? (
                      <img
                        src={getImageUrl(
                          selectedProduct.productTypes[0].imageUrl,
                        )}
                        alt={selectedProduct.name}
                        className="h-64 w-full rounded-md bg-gray-100 object-contain"
                      />
                    ) : (
                      <div className="flex h-64 w-full items-center justify-center rounded-md bg-gray-200">
                        No image available
                      </div>
                    )}
                  </div>

                  <div>
                    <h4 className="mb-2 text-xl font-semibold">
                      {selectedProduct.name}
                    </h4>
                    <p className="mb-4 text-gray-600">
                      {selectedProduct.description}
                    </p>

                    <div className="mb-4 grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">ID</p>
                        <p className="font-medium">{selectedProduct.id}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Created At</p>
                        <p className="font-medium">
                          {new Date(selectedProduct.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Total Types</p>
                        <p className="font-medium">
                          {selectedProduct.productTypes.length}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="mb-2 font-medium">Product Types</h4>
                  <div className="overflow-hidden rounded-md border">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                          >
                            Type
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                          >
                            Description
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                          >
                            Price
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                          >
                            Stock
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {selectedProduct.productTypes &&
                          selectedProduct.productTypes.map((type) => (
                            <tr key={type.id}>
                              <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                                {type.name}
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-500">
                                {type.description}
                              </td>
                              <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-500">
                                ${type.price}
                              </td>
                              <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-500">
                                {type.stock}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <button
                    className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
                    onClick={() => setSelectedProduct(null)}
                  >
                    Close
                  </button>
                  <button className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">
                    Edit Product
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add Product Modal */}
      <AddProductModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
      />
    </motion.div>
  );
};

export default ProductsTable;
