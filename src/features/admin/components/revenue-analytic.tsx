import { motion } from 'framer-motion';
import {
  Calendar,
  TrendingUp,
  DollarSign,
  Users,
  ShoppingCart,
} from 'lucide-react'; // Added ShoppingCart import
import type React from 'react';
import { useState } from 'react';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';

import { Revenue } from '../types/revenue';

import DateRangePicker from './data-range-pick';

interface RevenueAnalyticsProps {
  revenue: Revenue;
}

type TimeRange = 'daily' | 'weekly' | 'monthly' | 'yearly' | 'custom';

const RevenueAnalytics: React.FC<RevenueAnalyticsProps> = ({ revenue }) => {
  const [timeRange, setTimeRange] = useState<TimeRange>('daily');
  const [dateRange, setDateRange] = useState<{ start: Date; end: Date }>({
    start: new Date(new Date().setDate(new Date().getDate() - 7)),
    end: new Date(),
  });
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Calculate revenue for the selected time range
  const getRevenueForTimeRange = () => {
    switch (timeRange) {
      case 'daily':
        return revenue.daily;
      case 'weekly':
        return revenue.weekly;
      case 'monthly':
        return revenue.monthly;
      case 'yearly':
        return revenue.yearly;
      case 'custom':
        // For custom range, we would normally calculate from the API
        // Here we'll just return a percentage of the monthly revenue based on the date range length
        const days = Math.ceil(
          (dateRange.end.getTime() - dateRange.start.getTime()) /
            (1000 * 60 * 60 * 24),
        );
        return (revenue.monthly / 30) * days;
      default:
        return revenue.daily;
    }
  };

  // Filter chart data based on selected time range
  const getFilteredChartData = () => {
    if (timeRange === 'custom') {
      return revenue.chartData.filter((item) => {
        const itemDate = new Date(item.date);
        return itemDate >= dateRange.start && itemDate <= dateRange.end;
      });
    }
    return revenue.chartData;
  };

  const handleTimeRangeChange = (range: TimeRange) => {
    setTimeRange(range);
    if (range === 'custom') {
      setShowDatePicker(true);
    } else {
      setShowDatePicker(false);
    }
  };

  const handleDateRangeChange = (start: Date, end: Date) => {
    setDateRange({ start, end });
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const chartVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delay: 0.3, duration: 0.5 },
    },
  };

  return (
    <div>
      {/* Stats Cards */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <motion.div
          className="rounded-lg bg-white p-6 shadow-md"
          variants={cardVariants}
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm text-gray-500">Total Revenue</h3>
            <div className="rounded-md bg-indigo-100 p-2">
              <DollarSign size={20} className="text-indigo-600" />
            </div>
          </div>
          <p className="text-2xl font-bold">
            ${getRevenueForTimeRange().toFixed(2)}
          </p>
          <p className="mt-2 flex items-center text-sm text-green-500">
            <TrendingUp size={16} className="mr-1" />
            +12.5% from previous period
          </p>
        </motion.div>

        <motion.div
          className="rounded-lg bg-white p-6 shadow-md"
          variants={cardVariants}
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm text-gray-500">Orders</h3>
            <div className="rounded-md bg-green-100 p-2">
              <ShoppingCart size={20} className="text-green-600" />
            </div>
          </div>
          <p className="text-2xl font-bold">142</p>
          <p className="mt-2 flex items-center text-sm text-green-500">
            <TrendingUp size={16} className="mr-1" />
            +8.2% from previous period
          </p>
        </motion.div>

        <motion.div
          className="rounded-lg bg-white p-6 shadow-md"
          variants={cardVariants}
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm text-gray-500">Customers</h3>
            <div className="rounded-md bg-blue-100 p-2">
              <Users size={20} className="text-blue-600" />
            </div>
          </div>
          <p className="text-2xl font-bold">89</p>
          <p className="mt-2 flex items-center text-sm text-green-500">
            <TrendingUp size={16} className="mr-1" />
            +5.7% from previous period
          </p>
        </motion.div>

        <motion.div
          className="rounded-lg bg-white p-6 shadow-md"
          variants={cardVariants}
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm text-gray-500">Avg. Order Value</h3>
            <div className="rounded-md bg-purple-100 p-2">
              <DollarSign size={20} className="text-purple-600" />
            </div>
          </div>
          <p className="text-2xl font-bold">$175.28</p>
          <p className="mt-2 flex items-center text-sm text-green-500">
            <TrendingUp size={16} className="mr-1" />
            +3.1% from previous period
          </p>
        </motion.div>
      </div>

      {/* Revenue Chart */}
      <motion.div
        className="mb-8 rounded-lg bg-white p-6 shadow-md"
        variants={chartVariants}
      >
        <div className="mb-6 flex flex-col items-start justify-between md:flex-row md:items-center">
          <h3 className="mb-4 text-lg font-semibold md:mb-0">
            Revenue Overview
          </h3>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleTimeRangeChange('daily')}
              className={`rounded-md px-3 py-1 text-sm ${
                timeRange === 'daily'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Daily
            </button>
            <button
              onClick={() => handleTimeRangeChange('weekly')}
              className={`rounded-md px-3 py-1 text-sm ${
                timeRange === 'weekly'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Weekly
            </button>
            <button
              onClick={() => handleTimeRangeChange('monthly')}
              className={`rounded-md px-3 py-1 text-sm ${
                timeRange === 'monthly'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => handleTimeRangeChange('yearly')}
              className={`rounded-md px-3 py-1 text-sm ${
                timeRange === 'yearly'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Yearly
            </button>
            <button
              onClick={() => handleTimeRangeChange('custom')}
              className={`flex items-center rounded-md px-3 py-1 text-sm ${
                timeRange === 'custom'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Calendar size={14} className="mr-1" />
              Custom
            </button>
          </div>
        </div>

        {showDatePicker && (
          <div className="mb-6">
            <DateRangePicker
              startDate={dateRange.start}
              endDate={dateRange.end}
              onChange={handleDateRangeChange}
            />
          </div>
        )}

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={getFilteredChartData()}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366F1" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="date"
                tickFormatter={(date) =>
                  new Date(date).toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                  })
                }
              />
              <YAxis tickFormatter={(value) => `$${value}`} />
              <Tooltip
                formatter={(value) => [`$${value}`, 'Revenue']}
                labelFormatter={(label) => new Date(label).toLocaleDateString()}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#6366F1"
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Additional Analytics */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <motion.div
          className="rounded-lg bg-white p-6 shadow-md"
          variants={cardVariants}
        >
          <h3 className="mb-6 text-lg font-semibold">Top Selling Products</h3>
          <div className="space-y-4">
            {[
              { name: 'Leather Sofa', sales: 28, revenue: 9798.6 },
              { name: 'Modern Chair', sales: 25, revenue: 3249.75 },
              { name: 'Wooden Table', sales: 22, revenue: 5719.56 },
              { name: 'Office Chair', sales: 19, revenue: 5699.81 },
              { name: 'Bookshelf', sales: 17, revenue: 3399.83 },
            ].map((product, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-gray-500">{product.sales} sales</p>
                </div>
                <p className="font-medium">${product.revenue.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="rounded-lg bg-white p-6 shadow-md"
          variants={cardVariants}
        >
          <h3 className="mb-6 text-lg font-semibold">Recent Orders</h3>
          <div className="space-y-4">
            {[
              {
                id: '1',
                customer: 'John Doe',
                date: '2023-05-15',
                total: 129.99,
                status: 'pending',
              },
              {
                id: '2',
                customer: 'Jane Smith',
                date: '2023-05-14',
                total: 259.98,
                status: 'in-progress',
              },
              {
                id: '3',
                customer: 'Robert Johnson',
                date: '2023-05-13',
                total: 349.95,
                status: 'completed',
              },
              {
                id: '4',
                customer: 'Emily Davis',
                date: '2023-05-12',
                total: 89.99,
                status: 'cancelled',
              },
              {
                id: '5',
                customer: 'Michael Wilson',
                date: '2023-05-11',
                total: 199.99,
                status: 'pending',
              },
            ].map((order, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{order.customer}</p>
                  <p className="text-sm text-gray-500">Order #{order.id}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">${order.total.toFixed(2)}</p>
                  <p
                    className={`text-sm ${
                      order.status === 'completed'
                        ? 'text-green-600'
                        : order.status === 'cancelled'
                          ? 'text-red-600'
                          : order.status === 'in-progress'
                            ? 'text-blue-600'
                            : 'text-yellow-600'
                    }`}
                  >
                    {order.status.charAt(0).toUpperCase() +
                      order.status.slice(1).replace('-', ' ')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RevenueAnalytics;
