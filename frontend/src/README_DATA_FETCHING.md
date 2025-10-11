# Data Fetching Guide for EchoHeart Frontend

This guide explains how to fetch data from the backend API in your React components.

## Overview

The data fetching system consists of:
- **API Service** (`/src/services/api.js`) - Centralized axios instance with authentication
- **Context** (`/src/context/route.js`) - User authentication and profile management
- **Custom Hooks** (`/src/hooks/`) - Reusable hooks for different data types
- **Error Handling** - Components for loading states and error boundaries

## Quick Start

### 1. Using User Data
```jsx
import { useUser } from '../context/route';

function MyComponent() {
  const { user, loading, error, login, logout, updateUser } = useUser();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Welcome, {user?.fullname}</h1>
      <p>Village: {user?.village}</p>
    </div>
  );
}
```

### 2. Using Posts Data
```jsx
import { usePosts } from '../hooks/usePosts';

function PostsComponent() {
  const { posts, loading, error, createPost } = usePosts();

  const handleCreatePost = async () => {
    const result = await createPost({
      title: 'My Post',
      description: 'Post description',
      category: 'general',
      hasBusiness: false
    });

    if (result.success) {
      console.log('Post created!');
    } else {
      console.error('Error:', result.error);
    }
  };

  return (
    <div>
      {loading && <div>Loading posts...</div>}
      {error && <div>Error: {error}</div>}
      {posts.map(post => (
        <div key={post._id}>
          <h3>{post.title}</h3>
          <p>{post.description}</p>
        </div>
      ))}
    </div>
  );
}
```

## Available Hooks

### useUser()
- **Purpose**: User authentication and profile management
- **Returns**: `{ user, loading, error, login, logout, updateUser }`
- **Usage**: Access user data, handle authentication

### usePosts()
- **Purpose**: Posts data management
- **Returns**: `{ posts, loading, error, fetchPosts, createPost }`
- **Usage**: Display posts, create new posts

### useBusiness()
- **Purpose**: Business listings
- **Returns**: `{ businesses, loading, error, fetchBusinesses, createBusiness }`
- **Usage**: Display businesses, add new businesses

### useSOS()
- **Purpose**: Emergency SOS requests
- **Returns**: `{ sosRequests, loading, error, fetchSOSRequests, createSOSRequest }`
- **Usage**: Display and create emergency requests

### useNotifications()
- **Purpose**: User notifications
- **Returns**: `{ notifications, loading, error, fetchNotifications, markAsRead }`
- **Usage**: Display notifications, mark as read

## API Endpoints

The system automatically handles these backend endpoints:

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Posts
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create new post (with image upload)

### Users
- `GET /api/users/me` - Get current user profile
- `PUT /api/users/me` - Update user profile

### Business
- `GET /api/business` - Get all businesses
- `POST /api/business` - Create new business

### SOS
- `GET /api/sos` - Get all SOS requests
- `POST /api/sos` - Create SOS request

### Notifications
- `GET /api/notifications` - Get all notifications
- `PUT /api/notifications/:id/read` - Mark notification as read

## Error Handling

### Loading States
```jsx
import { LoadingSpinner, LoadingCard, LoadingPage } from '../components/LoadingSpinner';

// Full page loading
if (loading) return <LoadingPage message="Loading data..." />;

// Card loading
if (loading) return <LoadingCard message="Loading posts..." />;

// Inline loading
<div className="flex items-center">
  <LoadingSpinner size="sm" />
  <span className="ml-2">Loading...</span>
</div>
```

### Error Handling
```jsx
import ErrorBoundary from '../components/ErrorBoundary';

// Wrap your app
<ErrorBoundary>
  <YourApp />
</ErrorBoundary>

// Handle API errors
const { error } = usePosts();
if (error) {
  return (
    <div className="bg-red-50 p-4 rounded">
      <p className="text-red-600">Error: {error}</p>
      <button onClick={() => window.location.reload()}>
        Retry
      </button>
    </div>
  );
}
```

## Authentication

### Login
```jsx
const { login } = useUser();

const handleLogin = async () => {
  const result = await login({
    email: 'user@example.com',
    password: 'password'
  });

  if (result.success) {
    // User logged in successfully
    console.log('User:', result.data.user);
  } else {
    // Handle login error
    console.error('Login failed:', result.error);
  }
};
```

### Logout
```jsx
const { logout } = useUser();

const handleLogout = () => {
  logout();
  // User is now logged out
};
```

## Best Practices

1. **Always check loading states** before rendering data
2. **Handle errors gracefully** with user-friendly messages
3. **Use the provided hooks** instead of direct API calls
4. **Wrap components in ErrorBoundary** for production apps
5. **Update the baseURL** in `api.js` to match your backend URL

## Configuration

### Update Backend URL
Edit `/src/services/api.js`:
```javascript
const api = axios.create({
  baseURL: 'https://your-backend-url.com/api', // Update this
  // ... rest of config
});
```

### Environment Variables
For different environments, you can use environment variables:
```javascript
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
  // ... rest of config
});
```

## Example Implementation

See `/src/components/ExampleDataUsage.jsx` for a complete example showing how to use all the hooks together.

## Troubleshooting

### Common Issues

1. **CORS Errors**: Make sure your backend has CORS enabled
2. **401 Unauthorized**: Check if the token is being sent correctly
3. **Network Errors**: Verify the backend URL is correct
4. **Loading Forever**: Check if the backend is running and accessible

### Debug Mode
Add this to see API calls in the browser console:
```javascript
// In api.js, add this interceptor
api.interceptors.request.use(request => {
  console.log('API Request:', request);
  return request;
});
```
