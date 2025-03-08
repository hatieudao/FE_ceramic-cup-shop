import { Search, ShoppingCart, LogIn, UserCircle } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';

import { Link } from '@/components/ui/link';
import { TextLogo } from '@/components/ui/logo/text-logo';
import { useUser } from '@/lib/auth';

import { useCart } from '../../features/cart/api/get-cart';

export const Header = () => {
  const { data: cart } = useCart();
  const navigate = useNavigate();
  const user = useUser();
  const handleLogin = () => {
    navigate('/auth/login');
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
        {user?.data && (
          <Link
            to="/order-history"
            className="text-gray-800 hover:text-gray-600"
          >
            Order History
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
        {user?.data ? (
          <Link
            to="/profile"
            aria-label="Profile"
            className="flex items-center space-x-1 text-gray-800 hover:text-gray-600"
          >
            <UserCircle size={20} />
            <span className="text-sm">Profile</span>
          </Link>
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
