import React from 'react';

const Header = ({ onCreatePost, postsCount = 0 }) => {
  return (
    <header className="header">
      <div className="header-content">
        {/* Logo and Title */}
        <div className="logo">
          <div className="logo-icon">
            📝
          </div>
          <div>
            <h1>Posts Manager</h1>
            <p style={{ color: '#718096', fontSize: '14px', margin: '4px 0 0 0' }}>
              {postsCount > 0 ? `${postsCount} posts` : 'No posts yet'}
            </p>
          </div>
        </div>

        {/* Action Button */}
        <button 
          onClick={onCreatePost}
          className="btn btn-primary"
        >
          <span>➕</span>
          <span>Create New Post</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
