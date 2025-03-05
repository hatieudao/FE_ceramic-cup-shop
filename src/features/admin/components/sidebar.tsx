import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import type React from 'react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  isOpen,
  toggleSidebar,
}) => {
  const sidebarItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <LayoutDashboard size={20} />,
    },
    { id: 'orders', label: 'Orders', icon: <ShoppingCart size={20} /> },
    { id: 'products', label: 'Products', icon: <Package size={20} /> },
    { id: 'customers', label: 'Customers', icon: <Users size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  const sidebarVariants = {
    open: { width: '16rem' },
    closed: { width: '5rem' },
  };

  const textVariants = {
    open: { opacity: 1, display: 'block' },
    closed: { opacity: 0, display: 'none' },
  };

  return (
    <motion.div
      className="fixed left-0 top-0 z-10 h-screen bg-gray-900 text-white shadow-lg"
      initial={isOpen ? 'open' : 'closed'}
      animate={isOpen ? 'open' : 'closed'}
      variants={sidebarVariants}
      transition={{ duration: 0.3 }}
    >
      <div className="flex h-full flex-col">
        {/* Sidebar Header */}
        <div className="flex items-center justify-between border-b border-gray-700 p-4">
          <motion.div className="text-xl font-bold" variants={textVariants}>
            ABOTAR Admin
          </motion.div>
          <button
            onClick={toggleSidebar}
            className="text-gray-400 transition-colors hover:text-white"
          >
            {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>

        {/* Sidebar Menu */}
        <div className="flex-1 overflow-y-auto py-6">
          <ul className="space-y-2 px-2">
            {sidebarItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`flex w-full items-center rounded-md p-3 transition-colors ${
                    activeTab === item.id
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  <motion.span
                    variants={textVariants}
                    className="whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Sidebar Footer */}
        <div className="border-t border-gray-700 p-4">
          <button className="flex w-full items-center rounded-md p-3 text-gray-400 transition-colors hover:bg-gray-800 hover:text-white">
            <span className="mr-3">
              <LogOut size={20} />
            </span>
            <motion.span variants={textVariants}>Logout</motion.span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
