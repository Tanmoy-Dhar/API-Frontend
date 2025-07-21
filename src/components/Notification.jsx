import React, { useEffect } from 'react';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';

const Notification = ({ type = 'success', message, onClose, duration = 5000 }) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const getClasses = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 text-green-800 border-l-green-500';
      case 'error':
        return 'bg-red-50 text-red-800 border-l-red-500';
      case 'warning':
        return 'bg-yellow-50 text-yellow-800 border-l-yellow-500';
      default:
        return 'bg-blue-50 text-blue-800 border-l-blue-500';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle size={20} />;
      case 'error':
        return <XCircle size={20} />;
      case 'warning':
        return <AlertTriangle size={20} />;
      default:
        return <Info size={20} />;
    }
  };

  return (
    <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg border-l-4 flex items-center gap-3 min-w-72 max-w-sm sm:max-w-md md:max-w-lg animate-slide-in ${getClasses()}`}>
      <span>{getIcon()}</span>
      <span className="flex-1 font-medium text-sm sm:text-base">{message}</span>
      <button
        onClick={onClose}
        className="text-current opacity-70 hover:opacity-100 transition-opacity duration-200 p-1 rounded"
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default Notification;
