# Posts Management Frontend

A React frontend application for managing posts with CRUD operations, built with Vite and designed to work with a Laravel API backend.

## Features

- ✅ **Full CRUD Operations**: Create, Read, Update, Delete posts
- ✅ **Image Upload**: Support for image uploads with preview
- ✅ **Responsive Design**: Mobile-friendly interface
- ✅ **Error Handling**: Comprehensive error handling and user feedback
- ✅ **Loading States**: Visual feedback during API operations
- ✅ **Modern React**: Built with React 18 and hooks

## Technologies Used

- **React 18** - Frontend framework
- **Vite** - Build tool and development server
- **Axios** - HTTP client for API calls
- **CSS3** - Styling and responsive design

## Prerequisites

Before running this application, make sure you have:

1. **Node.js** (version 16 or higher)
2. **Laravel API Backend** running on `http://localhost:8000`
   - The backend should have the posts API endpoints configured
   - CORS should be enabled for frontend requests

## Installation

1. **Clone or download the project**
2. **Install dependencies**:
   ```bash
   npm install
   ```

## Development

1. **Start the development server**:
   ```bash
   npm run dev
   ```
   
2. **Open your browser** and navigate to `http://localhost:5173`

## API Configuration

The application is configured to connect to a Laravel API running on `http://localhost:8000/api`.

If your Laravel API is running on a different URL, update the `API_BASE_URL` in `src/services/api.js`:

```javascript
const API_BASE_URL = 'http://your-api-url/api';
```

## API Endpoints Expected

The frontend expects the following API endpoints from your Laravel backend:

- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create a new post
- `GET /api/posts/{id}` - Get a specific post
- `PUT /api/posts/{id}` - Update a post
- `DELETE /api/posts/{id}` - Delete a post

## Project Structure

```
src/
├── components/
│   ├── PostCard.jsx       # Individual post display component
│   ├── PostForm.jsx       # Form for creating/editing posts
│   ├── PostList.jsx       # Main component listing all posts
│   ├── PostCard.css       # Styles for PostCard
│   ├── PostForm.css       # Styles for PostForm
│   └── PostList.css       # Styles for PostList
├── services/
│   └── api.js            # Axios configuration and API calls
├── App.jsx               # Main application component
└── App.css              # Global styles
```

## Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Features Overview

### Posts Management
- View all posts in a responsive grid layout
- Create new posts with title, description, and optional image
- Edit existing posts with pre-filled form data
- Delete posts with confirmation dialog

### Image Handling
- Upload images during post creation/editing
- Image preview before submission
- Remove uploaded images
- Automatic image display in post cards

### User Experience
- Loading indicators during API operations
- Error messages with dismiss functionality
- Responsive design for mobile and desktop
- Clean, modern interface

## Troubleshooting

1. **CORS Issues**: Make sure your Laravel backend has CORS properly configured
2. **API Connection**: Verify the Laravel API is running on the expected URL
3. **Image Upload**: Ensure the Laravel backend accepts multipart/form-data for image uploads

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request
