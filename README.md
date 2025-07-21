# Posts Management Frontend

A modern React frontend application for managing posts with full authentication and CRUD operations, built with Vite, Tailwind CSS, and designed to work with a Laravel API backend.

## 🚀 Features

- ✅ **Complete Authentication System**: User registration, login, logout with JWT tokens
- ✅ **Protected Routes**: Posts are only accessible to authenticated users
- ✅ **Full CRUD Operations**: Create, Read, Update, Delete posts
- ✅ **Image Upload & Management**: Drag & drop image upload with preview
- ✅ **Responsive Design**: Mobile-first design that works on all devices
- ✅ **Modern UI**: Built with Tailwind CSS v4 and Lucide React icons
- ✅ **Error Handling**: Comprehensive error handling and notifications
- ✅ **Loading States**: Visual feedback during API operations
- ✅ **User Experience**: Smooth animations and transitions

## 🛠️ Technologies Used

- **React 18** - Frontend framework with hooks and context
- **Vite 7** - Ultra-fast build tool and development server
- **Tailwind CSS v4** - Utility-first CSS framework
- **Lucide React** - Beautiful and consistent icons
- **Axios** - HTTP client for API calls
- **React Router** - Client-side routing
- **Context API** - State management for authentication
- **PostCSS** - CSS processing

## 📋 Prerequisites

Before running this application, make sure you have:

1. **Node.js** (version 18 or higher)
2. **npm** (version 8 or higher)
3. **Laravel API Backend** running on `http://localhost:8000`
   - The backend should have authentication endpoints (Sanctum)
   - Posts API endpoints with authentication middleware
   - CORS properly configured for frontend requests

## 🚀 Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   
4. **Open your browser** and navigate to `http://localhost:5173`

## 🔐 Authentication Flow

1. **Registration**: Users can create new accounts with name, email, and password
2. **Login**: Existing users can login with email and password
3. **Protected Access**: Posts are only viewable after authentication
4. **Token Management**: JWT tokens are stored in localStorage and managed automatically
5. **Logout**: Users can securely logout, clearing all session data

## 🎨 UI/UX Features

- **Modern Design**: Clean, professional interface with Tailwind CSS v4
- **Lucide Icons**: Beautiful, consistent icons throughout the application
- **Responsive Layout**: Works seamlessly on mobile, tablet, and desktop
- **Dark Mode Ready**: CSS custom properties for future dark mode support
- **Smooth Animations**: CSS transitions and hover effects
- **Accessibility**: Proper ARIA labels and keyboard navigation

## 📡 API Configuration

The application connects to a Laravel API running on `http://localhost:8000/api`.

To configure a different API URL, update the base URL in `src/services/api.js`:

```javascript
const API_BASE_URL = 'http://your-api-url/api';
```

## 🔗 API Endpoints Required

The frontend requires the following API endpoints from your Laravel backend:

### Authentication Endpoints
- `POST /api/register` - User registration
- `POST /api/login` - User login
- `POST /api/logout` - User logout (requires authentication)
- `GET /api/user` - Get authenticated user data

### Posts Endpoints (All require authentication)
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create a new post
- `GET /api/posts/{id}` - Get a specific post
- `PUT /api/posts/{id}` - Update a post
- `DELETE /api/posts/{id}` - Delete a post

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.jsx           # Navigation header with user menu
│   ├── PostCard.jsx         # Individual post display component
│   ├── PostForm.jsx         # Form for creating/editing posts
│   ├── PostList.jsx         # Main posts listing component
│   ├── LoadingSpinner.jsx   # Reusable loading component
│   ├── Notification.jsx     # Toast notification component
│   ├── LogoutButton.jsx     # Standalone logout button
│   ├── Login.jsx           # Login form component
│   ├── Register.jsx        # Registration form component
│   └── ProtectedRoute.jsx  # Route protection wrapper
├── contexts/
│   └── AuthContext.jsx     # Authentication context provider
├── services/
│   └── api.js              # Axios configuration and API calls
├── utils/                  # Utility functions
├── App.jsx                 # Main application with routing
├── main.jsx               # Application entry point
└── index.css              # Global styles with Tailwind
```

## 🏗️ Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment.

## ✨ Key Features Overview

### 🔐 Authentication System
- Secure user registration and login
- JWT token-based authentication
- Persistent login sessions
- Protected route access
- User profile display
- Secure logout functionality

### 📝 Posts Management
- View all posts in a responsive grid layout
- Create new posts with title, description, and images
- Edit existing posts with pre-filled form data
- Delete posts with confirmation
- Image upload with drag & drop support
- Real-time form validation

### 🎨 User Interface
- Modern, clean design with Tailwind CSS v4
- Lucide React icons for consistency
- Responsive layout (mobile, tablet, desktop)
- Loading states and error handling
- Toast notifications for user feedback
- Smooth animations and transitions

### 📱 Mobile Experience
- Touch-friendly interface
- Optimized for mobile screens
- Responsive image handling
- Mobile-specific UI adaptations

## 🔧 Development Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🛠️ Configuration Files

- `vite.config.js` - Vite configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `postcss.config.js` - PostCSS configuration
- `eslint.config.js` - ESLint configuration

## 🚨 Troubleshooting

### Common Issues

1. **CORS Issues**
   - Ensure Laravel backend has CORS properly configured
   - Check `config/cors.php` includes your frontend URL

2. **Authentication Errors**
   - Verify Laravel Sanctum is properly configured
   - Check API endpoints are protected with `auth:sanctum` middleware

3. **API Connection**
   - Confirm Laravel API is running on expected URL
   - Test API endpoints with tools like Postman

4. **Image Upload Issues**
   - Ensure Laravel backend accepts `multipart/form-data`
   - Check file upload permissions and storage configuration

5. **Tailwind CSS Issues**
   - Ensure PostCSS is properly configured
   - Check Tailwind v4 compatibility

## 🌟 Environment Variables

Create a `.env` file in the project root (optional):

```env
VITE_API_BASE_URL=http://localhost:8000/api
VITE_APP_NAME=Posts Manager
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

If you encounter any issues or have questions:

1. Check the troubleshooting section above
2. Review the API documentation
3. Create an issue in the repository
4. Contact the development team

---

**Built with ❤️ using React, Vite, and Tailwind CSS**

