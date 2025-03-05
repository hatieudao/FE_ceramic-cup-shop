import { Search } from 'lucide-react';
import type React from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectItem } from '@/components/ui/select';

export interface FilterSortProps {
  filters: {
    search: string;
    priceRange: {
      min: string;
      max: string;
    };
    dateRange: {
      from: string;
      to: string;
    };
  };
  sortOption: string;
  onFilterChange: (
    type: 'search' | 'priceRange' | 'dateRange',
    value: any,
  ) => void;
  onSortChange: (value: string) => void;
}

export const sortOptions = [
  { value: 'name-asc', label: 'Name (A-Z)' },
  { value: 'name-desc', label: 'Name (Z-A)' },
  { value: 'price-asc', label: 'Price (Low to High)' },
  { value: 'price-desc', label: 'Price (High to Low)' },
  { value: 'date-desc', label: 'Newest First' },
  { value: 'date-asc', label: 'Oldest First' },
] as const;

const FilterSort: React.FC<FilterSortProps> = ({
  filters,
  sortOption,
  onFilterChange,
  onSortChange,
}) => {
  const handlePriceRangeChange = (type: 'min' | 'max', value: string) => {
    onFilterChange('priceRange', {
      ...filters.priceRange,
      [type]: value,
    });
  };

  const handleDateRangeChange = (type: 'from' | 'to', value: string) => {
    onFilterChange('dateRange', {
      ...filters.dateRange,
      [type]: value,
    });
  };

  return (
    <div className="grid grid-cols-1 gap-6 rounded-lg bg-white p-6 shadow-sm md:grid-cols-2 lg:grid-cols-4">
      {/* Search */}
      <div className="space-y-2">
        <Label>Search</Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search products..."
            value={filters.search}
            onChange={(e) => onFilterChange('search', e.target.value)}
            className="w-full pl-9"
          />
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-2">
        <Label>Price Range</Label>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            placeholder="Min"
            value={filters.priceRange.min}
            onChange={(e) => handlePriceRangeChange('min', e.target.value)}
            className="w-full"
          />
          <span className="text-gray-400">-</span>
          <Input
            type="number"
            placeholder="Max"
            value={filters.priceRange.max}
            onChange={(e) => handlePriceRangeChange('max', e.target.value)}
            className="w-full"
          />
        </div>
      </div>

      {/* Date Range */}
      <div className="space-y-2">
        <Label>Date Range</Label>
        <div className="flex items-center gap-2">
          <Input
            type="date"
            value={filters.dateRange.from}
            onChange={(e) => handleDateRangeChange('from', e.target.value)}
            className="w-full"
          />
          <span className="text-gray-400">-</span>
          <Input
            type="date"
            value={filters.dateRange.to}
            onChange={(e) => handleDateRangeChange('to', e.target.value)}
            className="w-full"
          />
        </div>
      </div>

      {/* Sort By */}
      <div className="ml-auto space-y-2">
        <Label>Sort By</Label>
        <div className="relative w-auto min-w-[150px]">
          <Select
            value={sortOption}
            onValueChange={onSortChange}
            className="w-auto min-w-[150px]"
          >
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>
    </div>
  );
};

export default FilterSort;
