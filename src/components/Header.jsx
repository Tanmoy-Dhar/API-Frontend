import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Plus, LogOut, ChevronDown, FileText, Loader2 } from 'lucide-react';

const Header = ({ onCreatePost, postsCount = 0 }) => {
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      setShowDropdown(false);
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="text-indigo-600">
              <FileText size={28} />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">Posts Manager</h1>
              <p className="text-xs sm:text-sm text-gray-500">
                {postsCount > 0 ? `${postsCount} posts` : 'No posts yet'}
              </p>
            </div>
          </div>

          {/* Action Button and User Menu */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Create Post Button */}
            <button 
              onClick={onCreatePost}
              className="inline-flex items-center px-3 py-2 sm:px-4 sm:py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <Plus size={16} className="mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Create Post</span>
              <span className="sm:hidden">Create</span>
            </button>

            {/* Quick Logout Button (Mobile) */}
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="sm:hidden inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 disabled:opacity-50"
            >
              {isLoggingOut ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <LogOut size={16} />
              )}
            </button>

            {/* User Dropdown (Desktop) */}
            <div className="hidden sm:block relative" ref={dropdownRef}>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center space-x-2 text-sm rounded-lg p-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-sm">
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div className="hidden md:block text-left">
                  <div className="text-sm font-medium text-gray-900 truncate max-w-32">
                    {user?.name || 'User'}
                  </div>
                  <div className="text-xs text-gray-500 truncate max-w-32">
                    {user?.email || 'user@example.com'}
                  </div>
                </div>
                <ChevronDown 
                  size={16} 
                  className={`text-gray-400 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`} 
                />
              </button>

              {/* Dropdown Menu */}
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 animate-slide-in">
                  {/* User Info */}
                  <div className="px-4 py-3 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900 truncate">
                          {user?.name || 'User'}
                        </div>
                        <div className="text-xs text-gray-500 truncate">
                          {user?.email || 'user@example.com'}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-1">
                    <button
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 focus:outline-none focus:bg-red-50 transition-colors duration-200 disabled:opacity-50 flex items-center space-x-2"
                    >
                      {isLoggingOut ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          <span>Signing out...</span>
                        </>
                      ) : (
                        <>
                          <LogOut size={16} />
                          <span>Sign out</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
