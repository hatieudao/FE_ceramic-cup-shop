'use client';

import { useQueryClient } from '@tanstack/react-query';
import {
  LogIn,
  LogOut,
  Search,
  ShoppingCart,
  User,
  UserCircle,
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';

import { Link } from '@/components/ui/link';
import { TextLogo } from '@/components/ui/logo/text-logo';
import { useCart } from '@/features/cart/api/get-cart';
import { useLogout, useUser } from '@/lib/auth';
export const Header = () => {
  const { data: cart } = useCart();
  const navigate = useNavigate();
  const { data: user } = useUser();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { mutate: logout } = useLogout();
  const handleLogin = () => {
    navigate('/auth/login');
  };
  const queryClient = useQueryClient();
  const handleLogout = () => {
    const onSuccess = () => {
      navigate('/auth/login');
      queryClient.invalidateQueries({ queryKey: ['authenticated-user'] });
    };
    logout({ onSuccess });
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Toggle dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="container mx-auto flex items-center justify-between px-4 py-6">
      {/* Logo */}
      <TextLogo />

      {/* Navigation */}
      <nav className="hidden items-center space-x-10 md:flex">
        <Link to="/" className="text-gray-800 hover:text-gray-600">
          Home
        </Link>
        <Link to="/shop" className="text-gray-800 hover:text-gray-600">
          Shop
        </Link>
        <Link to="/contact" className="text-gray-800 hover:text-gray-600">
          Contact Us
        </Link>
        {user && (
          <Link
            to="/order-history"
            className="text-gray-800 hover:text-gray-600"
          >
            Order History
          </Link>
        )}
        {user?.data?.isAdmin && (
          <Link to="/admin" className="text-gray-800 hover:text-gray-600">
            Admin
          </Link>
        )}
      </nav>
      {/* Search and Cart */}
      <div className="flex items-center space-x-6">
        <button
          aria-label="Search"
          className="text-gray-800 hover:text-gray-600"
        >
          <Search size={20} />
        </button>
        <Link to="/cart">
          <div className="relative">
            <button
              aria-label="Cart"
              className="text-gray-800 hover:text-gray-600"
            >
              <ShoppingCart size={20} />
            </button>
            <span className="absolute -right-2 -top-2 bg-white px-1 text-xs font-medium">
              {cart?.totalItem}
            </span>
          </div>
        </Link>
        {user ? (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="flex items-center space-x-2 text-gray-800 hover:text-gray-600 focus:outline-none"
              aria-expanded={isDropdownOpen}
              aria-haspopup="true"
            >
              <UserCircle size={20} />
              <span className="text-sm font-medium">
                {user.data.name || 'Profile'}
              </span>
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 z-10 mt-2 w-56 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="py-1">
                  <div className="border-b px-4 py-2">
                    <p className="text-sm font-medium">
                      {user.data.name || 'User'}
                    </p>
                    <p className="truncate text-xs text-gray-500">
                      {user.email || ''}
                    </p>
                  </div>

                  <Link
                    to="/profile"
                    className="block flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <User className="mr-2 size-4" />
                    <span>Profile</span>
                  </Link>

                  <Link
                    to="/order-history"
                    className="block flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <ShoppingCart className="mr-2 size-4" />
                    <span>Order History</span>
                  </Link>

                  <div className="border-t">
                    <button
                      onClick={handleLogout}
                      className="block flex w-full items-center px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
                    >
                      <LogOut className="mr-2 size-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={handleLogin}
            aria-label="Login"
            className="flex items-center space-x-1 text-gray-800 hover:text-gray-600"
          >
            <LogIn size={20} />
            <span className="text-sm">Login</span>
          </button>
        )}
      </div>
    </header>
  );
};
