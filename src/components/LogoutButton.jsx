import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from './LoadingSpinner';
import { LogOut } from 'lucide-react';

const LogoutButton = ({ 
  variant = 'primary', 
  size = 'medium', 
  className = '',
  showIcon = true,
  children 
}) => {
  const { logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-red-600 hover:bg-red-700 text-white border-transparent';
      case 'secondary':
        return 'bg-gray-200 hover:bg-gray-300 text-gray-900 border-gray-300';
      case 'outline':
        return 'bg-transparent hover:bg-red-50 text-red-600 border-red-300 hover:border-red-400';
      case 'ghost':
        return 'bg-transparent hover:bg-gray-100 text-gray-700 border-transparent';
      default:
        return 'bg-red-600 hover:bg-red-700 text-white border-transparent';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'px-3 py-1.5 text-sm';
      case 'medium':
        return 'px-4 py-2 text-sm';
      case 'large':
        return 'px-6 py-3 text-base';
      default:
        return 'px-4 py-2 text-sm';
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoggingOut}
      className={`
        inline-flex items-center justify-center
        border font-medium rounded-lg
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500
        transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        ${getVariantClasses()}
        ${getSizeClasses()}
        ${className}
      `}
    >
      {isLoggingOut ? (
        <>
          <LoadingSpinner size="small" color="currentColor" />
          <span className="ml-2">Signing out...</span>
        </>
      ) : (
        <>
          {showIcon && <LogOut size={16} className="mr-2" />}
          {children || 'Sign out'}
        </>
      )}
    </button>
  );
};

export default LogoutButton;
