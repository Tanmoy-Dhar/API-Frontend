import axios from 'axios';

// Base URL for your Laravel API
const API_BASE_URL = 'http://localhost:8000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  timeout: 10000, // 10 second timeout
});

// Posts API service
export const postsAPI = {
  // Get all posts
  getAllPosts: async () => {
    try {
      console.log('Fetching posts from:', `${API_BASE_URL}/posts`);
      const response = await api.get('/posts');
      console.log('Posts response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching posts:', error);
      
      if (error.response) {
        // Server responded with error status
        console.error('Response status:', error.response.status);
        console.error('Response data:', error.response.data);
        throw {
          status: error.response.status,
          message: error.response.data?.message || `HTTP ${error.response.status} Error`,
          data: error.response.data
        };
      } else if (error.request) {
        // Request was made but no response received
        console.error('No response received:', error.request);
        throw {
          message: 'No response from server. Please check if Laravel server is running on http://localhost:8000'
        };
      } else {
        // Something else happened
        console.error('Request setup error:', error.message);
        throw {
          message: error.message || 'Request failed'
        };
      }
    }
  },

  // Get single post by ID
  getPost: async (id) => {
    try {
      const response = await api.get(`/posts/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Create new post
  createPost: async (postData) => {
    try {
      console.log('Creating post with data:', postData);
      
      // postData is already a FormData object from the component
      const response = await api.post('/posts', postData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Create post response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error creating post:', error);
      
      if (error.response) {
        console.error('Response status:', error.response.status);
        console.error('Response data:', error.response.data);
        throw {
          status: error.response.status,
          message: error.response.data?.message || `HTTP ${error.response.status} Error`,
          data: error.response.data
        };
      } else if (error.request) {
        throw {
          message: 'No response from server. Please check if Laravel server is running.'
        };
      } else {
        throw {
          message: error.message || 'Request failed'
        };
      }
    }
  },

  // Update post
  updatePost: async (id, postData) => {
    try {
      console.log('Updating post with ID:', id, 'Data:', postData);
      
      const formData = new FormData();
      
      // Check if postData is already FormData
      if (postData instanceof FormData) {
        // If it's already FormData, use it directly but add _method
        formData.append('_method', 'PUT');
        
        // Copy all entries from the existing FormData
        for (let [key, value] of postData.entries()) {
          formData.append(key, value);
        }
        
        console.log('FormData entries:');
        for (let [key, value] of formData.entries()) {
          console.log(`${key}:`, value);
        }
      } else {
        // If it's a regular object, build FormData manually
        if (postData.title !== undefined) {
          formData.append('title', postData.title);
        }
        
        if (postData.description !== undefined) {
          formData.append('description', postData.description);
        }
        
        if (postData.image) {
          formData.append('image', postData.image);
        }

        // Laravel requires _method for form data updates
        formData.append('_method', 'PUT');
      }

      const response = await api.post(`/posts/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      console.log('Update response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating post:', error);
      
      if (error.response) {
        console.error('Response status:', error.response.status);
        console.error('Response data:', error.response.data);
        throw {
          status: error.response.status,
          message: error.response.data?.message || `HTTP ${error.response.status} Error`,
          data: error.response.data
        };
      } else if (error.request) {
        throw {
          message: 'No response from server. Please check if Laravel server is running.'
        };
      } else {
        throw {
          message: error.message || 'Request failed'
        };
      }
    }
  },

  // Delete post
  deletePost: async (id) => {
    try {
      const response = await api.delete(`/posts/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default api;
