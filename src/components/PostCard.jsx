import React from 'react';
import { Edit2, Trash2, Calendar, RotateCcw, Image } from 'lucide-react';

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
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      {/* Image Section */}
      {post.image ? (
        <div className="w-full h-48 sm:h-56 overflow-hidden">
          <img 
            src={`http://localhost:8000/upload/${post.image}`} 
            alt={post.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              console.log('Image failed to load:', `http://localhost:8000/upload/${post.image}`);
              e.target.parentElement.innerHTML = `
                <div class="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                  <div class="flex flex-col items-center">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
                      <circle cx="9" cy="9" r="2"/>
                      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
                    </svg>
                  </div>
                </div>
              `;
            }}
          />
        </div>
      ) : (
        <div className="w-full h-48 sm:h-56 flex items-center justify-center bg-gray-100 text-gray-400">
          <Image size={48} />
        </div>
      )}
      
      {/* Content Section */}
      <div className="p-4 sm:p-5">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-indigo-600 transition-colors duration-200">
          {post.title}
        </h3>
        
        <p className="text-gray-600 text-sm sm:text-base mb-4 line-clamp-3">
          {post.description}
        </p>
        
        {/* Meta Information */}
        <div className="text-xs sm:text-sm text-gray-500 space-y-1 mb-4">
          <div className="flex items-center">
            <Calendar size={14} className="mr-2" />
            <span>Created: {formatDate(post.created_at)}</span>
          </div>
          {post.updated_at !== post.created_at && (
            <div className="flex items-center">
              <RotateCcw size={14} className="mr-2" />
              <span>Updated: {formatDate(post.updated_at)}</span>
            </div>
          )}
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-2">
          <button 
            onClick={onEdit}
            className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm font-medium text-green-700 bg-green-50 border border-green-200 rounded-md hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
            title="Edit post"
          >
            <Edit2 size={16} />
            <span className="hidden sm:inline">Edit</span>
          </button>
          <button 
            onClick={onDelete}
            className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm font-medium text-red-700 bg-red-50 border border-red-200 rounded-md hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
            title="Delete post"
          >
            <Trash2 size={16} />
            <span className="hidden sm:inline">Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
