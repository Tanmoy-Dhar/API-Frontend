import React, { useState, useEffect } from 'react';
import { postsAPI } from '../services/api';
import PostForm from './PostForm';
import PostCard from './PostCard';
import Header from './Header';
import LoadingSpinner from './LoadingSpinner';
import Notification from './Notification';

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
      // console.log('Starting to fetch posts...');
      const response = await postsAPI.getAllPosts();
      // console.log('Received response:', response);
      
      // Handle different response structures
      let postsData = [];
      if (response.data) {
        postsData = Array.isArray(response.data) ? response.data : [];
      } else if (Array.isArray(response)) {
        postsData = response;
      }
      
      // console.log('Setting posts data:', postsData);
      setPosts(postsData);
      setError(null);
    } catch (err) {
      console.error('Error in fetchPosts:', err);
      // Handle authentication error differently
      if (err.status === 401) {
        setError('Authentication required. Please check if the API routes are protected.');
      } else {
        setError(err.message || 'Failed to fetch posts. Please ensure the Laravel server is running.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle create post
  const handleCreatePost = async (postData) => {
    try {
      await postsAPI.createPost(postData);
      setShowForm(false);
      setNotification({ type: 'success', message: 'Post created successfully!' });
      fetchPosts();
    } catch (err) {
      setError(err.message || 'Failed to create post');
    }
  };

  // Handle update post
  const handleUpdatePost = async (id, postData) => {
    try {
      console.log('Starting update for post ID:', id, 'with data:', postData);
      const result = await postsAPI.updatePost(id, postData);
      console.log('Update API call successful:', result);
      
      setEditingPost(null);
      setNotification({ type: 'success', message: 'Post updated successfully!' });
      
      console.log('Calling fetchPosts to refresh data...');
      await fetchPosts();
      console.log('Posts refreshed after update');
    } catch (err) {
      console.error('Update failed:', err);
      setError(err.message || 'Failed to update post');
    }
  };

  // Handle delete post
  const handleDeletePost = async (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await postsAPI.deletePost(id);
        setNotification({ type: 'success', message: 'Post deleted successfully!' });
        fetchPosts();
      } catch (err) {
        setError(err.message || 'Failed to delete post');
      }
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh' }}>
        <Header onCreatePost={() => {}} postsCount={0} />
        <div className="loading">
          <LoadingSpinner size="large" message="Loading your posts..." />
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Header */}
      <Header onCreatePost={() => setShowForm(true)} postsCount={posts.length} />

      {/* Main Content */}
      <div className="container">
        {/* Error Message */}
        {error && (
          <div className="error-message">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ marginRight: '8px' }}>❌</span>
              <span>{error}</span>
            </div>
            <button onClick={() => setError(null)} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}>
              ✕
            </button>
          </div>
        )}

        {/* Posts Grid */}
        {posts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{ fontSize: '64px', marginBottom: '20px' }}>📝</div>
            <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#2d3748', marginBottom: '12px' }}>
              No posts yet
            </h2>
            <p style={{ color: '#718096', marginBottom: '32px', fontSize: '16px' }}>
              Create your first post to get started!
            </p>
            <button 
              onClick={() => setShowForm(true)}
              className="btn btn-primary"
              style={{ fontSize: '16px', padding: '16px 32px' }}
            >
              <span>✨</span>
              <span>Create Your First Post</span>
            </button>
          </div>
        ) : (
          <div className="posts-grid">
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
        <div className="modal-overlay">
          <div className="modal">
            <PostForm
              onSubmit={handleCreatePost}
              onCancel={() => setShowForm(false)}
            />
          </div>
        </div>
      )}

      {/* Edit Post Modal */}
      {editingPost && (
        <div className="modal-overlay">
          <div className="modal">
            <PostForm
              post={editingPost}
              onSubmit={(data) => handleUpdatePost(editingPost.id, data)}
              onCancel={() => setEditingPost(null)}
              isEditing={true}
            />
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
