import React from 'react';

const LoadingSpinner = ({ size = 'medium', message = 'Loading...' }) => {
  return (
    <div className="loading">
      <div className="spinner"></div>
      {message && (
        <p style={{ marginTop: '16px', color: '#718096', fontSize: '16px', textAlign: 'center' }}>
          {message}
        </p>
      )}
    </div>
  );
};
export default LoadingSpinner;
