import React, { useState, useEffect } from 'react';
import { postsAPI } from '../services/api';
import PostForm from './PostForm';
import PostCard from './PostCard';
import Header from './Header';
import LoadingSpinner from './LoadingSpinner';
import Notification from './Notification';
import { XCircle, FileText, Sparkles, X } from 'lucide-react';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [notification, setNotification] = useState(null);

  // Fetch all posts
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await postsAPI.getAllPosts();
      
      // Handle different response structures
      let postsData = [];
      if (response.data) {
        postsData = Array.isArray(response.data) ? response.data : [];
      } else if (Array.isArray(response)) {
        postsData = response;
      }
      
      setPosts(postsData);
      setError(null);
    } catch (err) {
      console.error('Error in fetchPosts:', err);
      if (err.status === 401) {
        setError('Authentication required. Please log in to view posts.');
      } else {
        setError(err.message || 'Failed to fetch posts. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle create post
  const handleCreatePost = async (postData) => {
    try {
      const response = await postsAPI.createPost(postData);
      setPosts([response.data, ...posts]);
      setShowForm(false);
      setNotification({
        type: 'success',
        message: 'Post created successfully!'
      });
    } catch (error) {
      console.error('Error creating post:', error);
      setNotification({
        type: 'error',
        message: 'Failed to create post. Please try again.'
      });
    }
  };

  // Handle update post
  const handleUpdatePost = async (id, postData) => {
    try {
      const response = await postsAPI.updatePost(id, postData);
      setPosts(posts.map(post => 
        post.id === id ? response.data : post
      ));
      setEditingPost(null);
      setNotification({
        type: 'success',
        message: 'Post updated successfully!'
      });
    } catch (error) {
      console.error('Error updating post:', error);
      setNotification({
        type: 'error',
        message: 'Failed to update post. Please try again.'
      });
    }
  };

  // Handle delete post
  const handleDeletePost = async (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await postsAPI.deletePost(id);
        setPosts(posts.filter(post => post.id !== id));
        setNotification({
          type: 'success',
          message: 'Post deleted successfully!'
        });
      } catch (error) {
        console.error('Error deleting post:', error);
        setNotification({
          type: 'error',
          message: 'Failed to delete post. Please try again.'
        });
      }
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header onCreatePost={() => {}} postsCount={0} />
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <LoadingSpinner size="large" />
            <p className="mt-4 text-gray-600">Loading your posts...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onCreatePost={() => setShowForm(true)} postsCount={posts.length} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-start">
              <div className="flex">
                <div className="text-red-400 mr-3">
                  <XCircle size={20} />
                </div>
                <div>
                  <h3 className="text-red-800 font-medium">Error loading posts</h3>
                  <p className="text-red-700 mt-1">{error}</p>
                  <button
                    onClick={fetchPosts}
                    className="mt-3 text-sm bg-red-100 hover:bg-red-200 text-red-800 px-3 py-1 rounded transition-colors duration-200"
                  >
                    Try Again
                  </button>
                </div>
              </div>
              <button 
                onClick={() => setError(null)}
                className="text-red-400 hover:text-red-600 transition-colors duration-200"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Empty State */}
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-indigo-400 mb-4 flex justify-center">
              <FileText size={64} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">No posts yet</h2>
            <p className="text-gray-500 mb-8 text-lg">Create your first post to get started!</p>
            <button 
              onClick={() => setShowForm(true)}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
            >
              <Sparkles size={20} className="mr-2" />
              <span>Create Your First Post</span>
            </button>
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {posts.map(post => (
              <PostCard
                key={post.id}
                post={post}
                onEdit={() => setEditingPost(post)}
                onDelete={() => handleDeletePost(post.id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Create Post Modal */}
      {showForm && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowForm(false);
            }
          }}
        >
          <div className="relative min-h-screen flex items-center justify-center">
            <div 
              className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <PostForm
                onSubmit={handleCreatePost}
                onCancel={() => setShowForm(false)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Edit Post Modal */}
      {editingPost && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setEditingPost(null);
            }
          }}
        >
          <div className="relative min-h-screen flex items-center justify-center">
            <div 
              className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <PostForm
                post={editingPost}
                onSubmit={(data) => handleUpdatePost(editingPost.id, data)}
                onCancel={() => setEditingPost(null)}
                isEditing={true}
              />
            </div>
          </div>
        </div>
      )}

      {/* Notification */}
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
};

export default PostList;
