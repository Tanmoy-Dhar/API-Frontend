import React from 'react';

const PostCard = ({ post, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="card post-card">
      {/* Image Section */}
      {post.image ? (
        <div className="post-image">
          <img 
            src={`http://localhost:8000/upload/${post.image}`} 
            alt={post.title}
            onError={(e) => {
              console.log('Image failed to load:', `http://localhost:8000/upload/${post.image}`);
              e.target.parentElement.innerHTML = `
                <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: #f7fafc; color: #a0aec0; font-size: 48px;">
                  🖼️
                </div>
              `;
            }}
          />
        </div>
      ) : (
        <div className="post-image">
          🖼️
        </div>
      )}
      
      {/* Content Section */}
      <div className="post-content">
        <h3 className="post-title">
          {post.title}
        </h3>
        
        <p className="post-description">
          {post.description}
        </p>
        
        {/* Meta Information */}
        <div className="post-meta">
          <div>📅 Created: {formatDate(post.created_at)}</div>
          {post.updated_at !== post.created_at && (
            <div>🔄 Updated: {formatDate(post.updated_at)}</div>
          )}
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="post-actions">
        <button 
          onClick={onEdit}
          className="btn btn-success"
          title="Edit post"
        >
          <span>✏️</span>
          <span>Edit</span>
        </button>
        <button 
          onClick={onDelete}
          className="btn btn-danger"
          title="Delete post"
        >
          <span>🗑️</span>
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
};

export default PostCard;
