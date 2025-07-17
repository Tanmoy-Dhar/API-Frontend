import React, { useState, useEffect } from 'react';

const PostForm = ({ post, onSubmit, onCancel, isEditing = false }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    if (post && isEditing) {
      setFormData({
        title: post.title || '',
        description: post.description || '',
        image: null,
      });
      
      // Set existing image preview if available
      if (post.image) {
        setImagePreview(`http://localhost:8000/upload/${post.image}`);
      }
    }
  }, [post, isEditing]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (file) => {
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file
      }));

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    handleImageChange(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    handleImageChange(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const removeImage = () => {
    setFormData(prev => ({
      ...prev,
      image: null
    }));
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      
      if (formData.image) {
        data.append('image', formData.image);
      }

      await onSubmit(data);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '32px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#2d3748', margin: '0 0 4px 0' }}>
            {isEditing ? 'Edit Post' : 'Create New Post'}
          </h2>
          <p style={{ color: '#718096', margin: 0 }}>
            {isEditing ? 'Update your post details' : 'Share something amazing with the world'}
          </p>
        </div>
        <button
          onClick={onCancel}
          type="button"
          style={{ 
            background: 'none', 
            border: 'none', 
            fontSize: '24px', 
            cursor: 'pointer',
            padding: '8px',
            borderRadius: '8px',
            color: '#718096'
          }}
        >
          ✕
        </button>
      </div>
      
      <form onSubmit={handleSubmit}>
        {/* Title Field */}
        <div className="form-group">
          <label htmlFor="title">Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            placeholder="Enter an engaging title for your post"
            className="input-field"
          />
        </div>

        {/* Description Field */}
        <div className="form-group">
          <label htmlFor="description">Description *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            rows="4"
            placeholder="Tell us more about your post..."
            className="input-field"
            style={{ resize: 'vertical', minHeight: '100px' }}
          />
        </div>

        {/* Image Upload */}
        <div className="form-group">
          <label>Post Image</label>
          {!imagePreview ? (
            <div
              onDrop={handleDrop}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              style={{
                border: dragActive ? '3px dashed #667eea' : '2px dashed #e2e8f0',
                borderRadius: '12px',
                padding: '40px 20px',
                textAlign: 'center',
                backgroundColor: dragActive ? '#f0f4ff' : '#f7fafc',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                position: 'relative'
              }}
              onClick={() => document.getElementById('file-input').click()}
            >
              <input
                id="file-input"
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                style={{ display: 'none' }}
              />
              <div style={{ fontSize: '48px', marginBottom: '16px', color: '#667eea' }}>
                📸
              </div>
              <p style={{ fontSize: '16px', fontWeight: '600', color: '#4a5568', margin: '0 0 8px 0' }}>
                {dragActive ? 'Drop image here' : 'Click to upload or drag & drop'}
              </p>
              <p style={{ fontSize: '14px', color: '#718096', margin: 0 }}>
                PNG, JPG, GIF up to 10MB
              </p>
            </div>
          ) : (
            <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden' }}>
              <img
                src={imagePreview}
                alt="Preview"
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
              <button
                type="button"
                onClick={removeImage}
                style={{
                  position: 'absolute',
                  top: '8px',
                  right: '8px',
                  background: 'rgba(239, 68, 68, 0.9)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px'
                }}
              >
                ✕
              </button>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '12px', paddingTop: '24px', borderTop: '1px solid #e2e8f0' }}>
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-secondary"
            style={{ flex: 1 }}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
            style={{ flex: 1 }}
          >
            {loading ? (
              <span>⏳ {isEditing ? 'Updating...' : 'Creating...'}</span>
            ) : (
              <span>{isEditing ? '✏️ Update Post' : '🚀 Create Post'}</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
