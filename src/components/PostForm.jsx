import React, { useState, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';
import { Camera, X, Save } from 'lucide-react';

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

  const handleFileInputChange = (e) => {
    e.stopPropagation();
    const file = e.target.files[0];
    handleImageChange(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleImageChange(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleUploadAreaClick = () => {
    const fileInput = document.getElementById('file-upload');
    if (fileInput) {
      fileInput.click();
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
    e.stopPropagation();
    setLoading(true);

    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 max-h-screen overflow-y-auto">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
            {isEditing ? 'Edit Post' : 'Create New Post'}
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            {isEditing ? 'Update your post details' : 'Share something amazing with the world'}
          </p>
        </div>
        <button
          onClick={onCancel}
          type="button"
          className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-100 rounded-lg transition-colors duration-200"
        >
          <X size={20} />
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title Field */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            placeholder="Enter an engaging title for your post"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
          />
        </div>

        {/* Description Field */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            rows={4}
            placeholder="Write a detailed description of your post..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base resize-vertical"
          />
        </div>

        {/* Image Upload Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Image (Optional)
          </label>
          
          {/* Image Preview */}
          {imagePreview && (
            <div className="mb-4 relative inline-block">
              <img
                src={imagePreview}
                alt="Preview"
                className="max-w-full h-32 sm:h-40 object-cover rounded-lg shadow-md"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors duration-200"
              >
                <X size={14} />
              </button>
            </div>
          )}

          {/* Drop Zone */}
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={handleUploadAreaClick}
            className={`relative border-2 border-dashed rounded-lg p-4 sm:p-6 text-center transition-colors duration-200 cursor-pointer ${
              dragActive
                ? 'border-indigo-500 bg-indigo-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <div className="space-y-2">
              <div className="text-indigo-500">
                <Camera size={32} className="mx-auto" />
              </div>
              <div className="text-sm sm:text-base text-gray-600">
                <span className="font-medium">Click to upload</span> or drag and drop
              </div>
              <div className="text-xs sm:text-sm text-gray-500">
                PNG, JPG, GIF up to 2MB
              </div>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileInputChange}
              className="hidden"
              id="file-upload"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center"
          >
            {loading ? (
              <>
                <LoadingSpinner size="small" color="white" />
                <span className="ml-2">
                  {isEditing ? 'Updating...' : 'Creating...'}
                </span>
              </>
            ) : (
              <span>
                {isEditing ? 'Update Post' : 'Create Post'}
              </span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
