import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Search } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface NavbarProps {
  onCartClick: () => void;
  onLoginClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onCartClick, onLoginClick }) => {
  const { state } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const isActive = (path: string) => location.pathname === path;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-800">LUXE</Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/new-arrivals"
              className={`${isActive('/new-arrivals') ? 'text-indigo-600' : 'text-gray-600'} hover:text-gray-900`}
            >
              New Arrivals
            </Link>
            <Link 
              to="/women"
              className={`${isActive('/women') ? 'text-indigo-600' : 'text-gray-600'} hover:text-gray-900`}
            >
              Women
            </Link>
            <Link 
              to="/men"
              className={`${isActive('/men') ? 'text-indigo-600' : 'text-gray-600'} hover:text-gray-900`}
            >
              Men
            </Link>
            <Link 
              to="/accessories"
              className={`${isActive('/accessories') ? 'text-indigo-600' : 'text-gray-600'} hover:text-gray-900`}
            >
              Accessories
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-sm mx-4">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </form>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={onLoginClick}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <User className="h-6 w-6 text-gray-600" />
            </button>
            <button
              onClick={onCartClick}
              className="p-2 rounded-full hover:bg-gray-100 relative"
            >
              <ShoppingCart className="h-6 w-6 text-gray-600" />
              {state.items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {state.items.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          {/* Mobile Search */}
          <div className="px-4 py-2">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </form>
          </div>

          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/new-arrivals"
              className={`block px-3 py-2 rounded-md ${
                isActive('/new-arrivals') ? 'bg-gray-100 text-gray-900' : 'text-gray-600'
              } hover:text-gray-900 hover:bg-gray-100`}
              onClick={() => setIsMenuOpen(false)}
            >
              New Arrivals
            </Link>
            <Link
              to="/women"
              className={`block px-3 py-2 rounded-md ${
                isActive('/women') ? 'bg-gray-100 text-gray-900' : 'text-gray-600'
              } hover:text-gray-900 hover:bg-gray-100`}
              onClick={() => setIsMenuOpen(false)}
            >
              Women
            </Link>
            <Link
              to="/men"
              className={`block px-3 py-2 rounded-md ${
                isActive('/men') ? 'bg-gray-100 text-gray-900' : 'text-gray-600'
              } hover:text-gray-900 hover:bg-gray-100`}
              onClick={() => setIsMenuOpen(false)}
            >
              Men
            </Link>
            <Link
              to="/accessories"
              className={`block px-3 py-2 rounded-md ${
                isActive('/accessories') ? 'bg-gray-100 text-gray-900' : 'text-gray-600'
              } hover:text-gray-900 hover:bg-gray-100`}
              onClick={() => setIsMenuOpen(false)}
            >
              Accessories
            </Link>
            <div className="flex space-x-4 px-3 py-2">
              <button
                onClick={() => {
                  onLoginClick();
                  setIsMenuOpen(false);
                }}
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <User className="h-6 w-6 mr-2" />
                Login
              </button>
              <button
                onClick={() => {
                  onCartClick();
                  setIsMenuOpen(false);
                }}
                className="flex items-center text-gray-600 hover:text-gray-900 relative"
              >
                <ShoppingCart className="h-6 w-6 mr-2" />
                Cart
                {state.items.length > 0 && (
                  <span className="absolute -top-1 left-4 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {state.items.reduce((acc, item) => acc + item.quantity, 0)}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};