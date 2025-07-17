import React, { useEffect } from 'react';

const Notification = ({ type = 'success', message, onClose, duration = 5000 }) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const getStyle = () => {
    switch (type) {
      case 'success':
        return {
          backgroundColor: '#c6f6d5',
          color: '#2f855a',
          borderLeft: '4px solid #38a169'
        };
      case 'error':
        return {
          backgroundColor: '#fed7d7',
          color: '#9b2c2c',
          borderLeft: '4px solid #e53e3e'
        };
      case 'warning':
        return {
          backgroundColor: '#fefcbf',
          color: '#975a16',
          borderLeft: '4px solid #d69e2e'
        };
      default:
        return {
          backgroundColor: '#bee3f8',
          color: '#2c5282',
          borderLeft: '4px solid #3182ce'
        };
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      default:
        return 'ℹ️';
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 1000,
        padding: '16px 20px',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        minWidth: '300px',
        maxWidth: '500px',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
        animation: 'slideIn 0.3s ease-out',
        ...getStyle()
      }}
    >
      <span style={{ fontSize: '18px' }}>{getIcon()}</span>
      <span style={{ flex: 1, fontWeight: '500' }}>{message}</span>
      <button
        onClick={onClose}
        style={{
          background: 'none',
          border: 'none',
          color: 'inherit',
          cursor: 'pointer',
          fontSize: '18px',
          padding: '4px',
          borderRadius: '4px',
          opacity: 0.7
        }}
        onMouseOver={(e) => e.target.style.opacity = '1'}
        onMouseOut={(e) => e.target.style.opacity = '0.7'}
      >
        ✕
      </button>
      
      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default Notification;
