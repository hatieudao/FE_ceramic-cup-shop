import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  Eye,
  Mail,
  Phone,
  Calendar,
  DollarSign,
  ShoppingBag,
  ChevronLeft,
  ChevronRight,
  User,
  MapPin,
  Clock,
} from 'lucide-react';
import type React from 'react';
import { useState } from 'react';

import type { Customer, CustomerStatus } from '../types/customer';

interface CustomersTableProps {
  customers: Customer[];
}

const CustomersTable: React.FC<CustomersTableProps> = ({ customers }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof Customer>('registeredAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [statusFilter, setStatusFilter] = useState<CustomerStatus | 'all'>(
    'all',
  );
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null,
  );

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const customersPerPage = 8;

  // Filter and sort customers
  const filteredCustomers = customers
    .filter((customer) => {
      const matchesSearch =
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone.includes(searchTerm);
      const matchesStatus =
        statusFilter === 'all' || customer.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortField === 'totalOrders' || sortField === 'totalSpent') {
        return sortDirection === 'asc'
          ? a[sortField] - b[sortField]
          : b[sortField] - a[sortField];
      } else if (sortField === 'registeredAt') {
        return sortDirection === 'asc'
          ? new Date(a.registeredAt).getTime() -
              new Date(b.registeredAt).getTime()
          : new Date(b.registeredAt).getTime() -
              new Date(a.registeredAt).getTime();
      } else {
        const aValue = String(a[sortField]).toLowerCase();
        const bValue = String(b[sortField]).toLowerCase();
        return sortDirection === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
    });

  // Pagination logic
  const totalPages = Math.ceil(filteredCustomers.length / customersPerPage);
  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = filteredCustomers.slice(
    indexOfFirstCustomer,
    indexOfLastCustomer,
  );

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleSort = (field: keyof Customer) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getStatusColor = (status: CustomerStatus) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-yellow-100 text-yellow-800';
      case 'blocked':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
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
        <h2 className="mb-6 text-xl font-semibold">Customer Management</h2>

        {/* Filters and Search */}
        <div className="mb-6 flex flex-col justify-between space-y-4 md:flex-row md:space-y-0">
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search customers..."
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
              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value as CustomerStatus | 'all')
                }
                className="appearance-none rounded-md border py-2 pl-10 pr-8 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="blocked">Blocked</option>
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

        {/* Stats Cards */}
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex items-center">
              <div className="mr-3 rounded-md bg-indigo-100 p-2">
                <User size={20} className="text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Customers</p>
                <p className="text-xl font-bold">{customers.length}</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex items-center">
              <div className="mr-3 rounded-md bg-green-100 p-2">
                <ShoppingBag size={20} className="text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Orders</p>
                <p className="text-xl font-bold">
                  {customers.reduce(
                    (sum, customer) => sum + customer.totalOrders,
                    0,
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex items-center">
              <div className="mr-3 rounded-md bg-purple-100 p-2">
                <DollarSign size={20} className="text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Revenue</p>
                <p className="text-xl font-bold">
                  {formatCurrency(
                    customers.reduce(
                      (sum, customer) => sum + customer.totalSpent,
                      0,
                    ),
                  )}
                </p>
              </div>
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
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center">
                    Customer
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
                  onClick={() => handleSort('email')}
                >
                  <div className="flex items-center">
                    Email
                    {sortField === 'email' &&
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
                  onClick={() => handleSort('registeredAt')}
                >
                  <div className="flex items-center">
                    Registered
                    {sortField === 'registeredAt' &&
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
                  onClick={() => handleSort('totalOrders')}
                >
                  <div className="flex items-center">
                    Orders
                    {sortField === 'totalOrders' &&
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
                  onClick={() => handleSort('totalSpent')}
                >
                  <div className="flex items-center">
                    Spent
                    {sortField === 'totalSpent' &&
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
                  onClick={() => handleSort('status')}
                >
                  <div className="flex items-center">
                    Status
                    {sortField === 'status' &&
                      (sortDirection === 'asc' ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      ))}
                  </div>
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
              {currentCustomers.length > 0 ? (
                currentCustomers.map((customer) => (
                  <motion.tr
                    key={customer.id}
                    variants={rowVariants}
                    whileHover={{ backgroundColor: '#f9fafb' }}
                  >
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center">
                        <div className="size-10 shrink-0">
                          {customer.avatar ? (
                            <img
                              className="size-10 rounded-full object-cover"
                              src={customer.avatar || '/placeholder.svg'}
                              alt={customer.name}
                            />
                          ) : (
                            <div className="flex size-10 items-center justify-center rounded-full bg-gray-200 text-gray-500">
                              {customer.name.charAt(0).toUpperCase()}
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {customer.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {customer.phone}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {customer.email}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {formatDate(customer.registeredAt)}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {customer.totalOrders}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {formatCurrency(customer.totalSpent)}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getStatusColor(
                          customer.status,
                        )}`}
                      >
                        {customer.status.charAt(0).toUpperCase() +
                          customer.status.slice(1)}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                      <button
                        onClick={() => setSelectedCustomer(customer)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        <Eye size={18} />
                      </button>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    No customers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredCustomers.length > 0 && (
          <div className="mt-4 flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6">
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing{' '}
                  <span className="font-medium">
                    {indexOfFirstCustomer + 1}
                  </span>{' '}
                  to{' '}
                  <span className="font-medium">
                    {indexOfLastCustomer > filteredCustomers.length
                      ? filteredCustomers.length
                      : indexOfLastCustomer}
                  </span>{' '}
                  of{' '}
                  <span className="font-medium">
                    {filteredCustomers.length}
                  </span>{' '}
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

      {/* Customer Details Modal */}
      <AnimatePresence>
        {selectedCustomer && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <motion.div
              className="mx-4 w-full max-w-2xl rounded-lg bg-white shadow-xl"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Customer Details</h3>
                  <button
                    onClick={() => setSelectedCustomer(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    &times;
                  </button>
                </div>

                <div className="mb-6 flex items-center">
                  <div className="mr-4">
                    {selectedCustomer.avatar ? (
                      <img
                        className="size-16 rounded-full object-cover"
                        src={selectedCustomer.avatar || '/placeholder.svg'}
                        alt={selectedCustomer.name}
                      />
                    ) : (
                      <div className="flex size-16 items-center justify-center rounded-full bg-gray-200 text-xl text-gray-500">
                        {selectedCustomer.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold">
                      {selectedCustomer.name}
                    </h4>
                    <span
                      className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getStatusColor(
                        selectedCustomer.status,
                      )}`}
                    >
                      {selectedCustomer.status.charAt(0).toUpperCase() +
                        selectedCustomer.status.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="flex items-start">
                    <Mail className="mr-2 text-gray-400" size={18} />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{selectedCustomer.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Phone className="mr-2 text-gray-400" size={18} />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium">{selectedCustomer.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Calendar className="mr-2 text-gray-400" size={18} />
                    <div>
                      <p className="text-sm text-gray-500">Registered</p>
                      <p className="font-medium">
                        {formatDate(selectedCustomer.registeredAt)}
                      </p>
                    </div>
                  </div>
                  {selectedCustomer.lastOrderDate && (
                    <div className="flex items-start">
                      <Clock className="mr-2 text-gray-400" size={18} />
                      <div>
                        <p className="text-sm text-gray-500">Last Order</p>
                        <p className="font-medium">
                          {formatDate(selectedCustomer.lastOrderDate)}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {selectedCustomer.address && (
                  <div className="mb-6">
                    <div className="mb-2 flex items-start">
                      <MapPin className="mr-2 text-gray-400" size={18} />
                      <h5 className="font-medium">Address</h5>
                    </div>
                    <div className="pl-6">
                      <p className="text-sm text-gray-700">
                        {selectedCustomer.address.street}
                      </p>
                      <p className="text-sm text-gray-700">
                        {selectedCustomer.address.city},{' '}
                        {selectedCustomer.address.state}{' '}
                        {selectedCustomer.address.zipCode}
                      </p>
                      <p className="text-sm text-gray-700">
                        {selectedCustomer.address.country}
                      </p>
                    </div>
                  </div>
                )}

                <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="rounded-lg bg-gray-50 p-4">
                    <div className="mb-2 flex items-center">
                      <ShoppingBag className="mr-2 text-indigo-500" size={18} />
                      <h5 className="font-medium">Total Orders</h5>
                    </div>
                    <p className="text-2xl font-bold">
                      {selectedCustomer.totalOrders}
                    </p>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-4">
                    <div className="mb-2 flex items-center">
                      <DollarSign className="mr-2 text-green-500" size={18} />
                      <h5 className="font-medium">Total Spent</h5>
                    </div>
                    <p className="text-2xl font-bold">
                      {formatCurrency(selectedCustomer.totalSpent)}
                    </p>
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setSelectedCustomer(null)}
                    className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
                  >
                    Close
                  </button>
                  <button className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">
                    Edit Customer
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CustomersTable;
