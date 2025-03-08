'use client';

import { motion } from 'framer-motion';
import type React from 'react';
import { useState } from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import { OrderStatus } from '../types/order';
import type { FilterOptions } from '../types/order';

interface FilterBarProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ filters, onFilterChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as 'all' | OrderStatus;
    onFilterChange({ ...filters, status: value });
  };

  const handleStartDateChange = (date: Date | null) => {
    onFilterChange({
      ...filters,
      dateRange: { ...filters.dateRange, startDate: date },
    });
  };

  const handleEndDateChange = (date: Date | null) => {
    onFilterChange({
      ...filters,
      dateRange: { ...filters.dateRange, endDate: date },
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, searchTerm: e.target.value });
  };

  const clearFilters = () => {
    onFilterChange({
      status: 'all',
      dateRange: { startDate: null, endDate: null },
      searchTerm: '',
    });
  };

  return (
    <motion.div
      className="mb-6 overflow-hidden rounded-lg bg-white shadow-md"
      initial={{ height: 'auto' }}
      animate={{ height: isExpanded ? 'auto' : '64px' }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between p-4">
        <h2 className="text-lg font-medium text-gray-900">Filters</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="rounded bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
          >
            {isExpanded ? 'Collapse' : 'Expand'}
          </button>
          {(filters.status !== 'all' ||
            filters.dateRange.startDate !== null ||
            filters.dateRange.endDate !== null ||
            filters.searchTerm !== '') && (
            <button
              onClick={clearFilters}
              className="rounded bg-red-100 px-3 py-1 text-sm font-medium text-red-700 transition-colors hover:bg-red-200"
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      <motion.div
        className="grid grid-cols-1 gap-4 px-4 pb-4 md:grid-cols-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: isExpanded ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <div>
          <label
            htmlFor="status"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Order Status
          </label>
          <select
            id="status"
            value={filters.status}
            onChange={handleStatusChange}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="canceled">Canceled</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="startDate"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Start Date
          </label>
          <DatePicker
            id="startDate"
            selected={filters.dateRange.startDate}
            onChange={handleStartDateChange}
            selectsStart
            startDate={filters.dateRange.startDate}
            endDate={filters.dateRange.endDate}
            className="w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholderText="Select start date"
          />
        </div>

        <div>
          <label
            htmlFor="endDate"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            End Date
          </label>
          <DatePicker
            id="endDate"
            selected={filters.dateRange.endDate}
            onChange={handleEndDateChange}
            selectsEnd
            startDate={filters.dateRange.startDate}
            endDate={filters.dateRange.endDate}
            minDate={filters.dateRange.startDate}
            className="w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholderText="Select end date"
          />
        </div>

        <div>
          <label
            htmlFor="search"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Search
          </label>
          <input
            type="text"
            id="search"
            value={filters.searchTerm}
            onChange={handleSearchChange}
            placeholder="Search by order ID or notes"
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FilterBar;
