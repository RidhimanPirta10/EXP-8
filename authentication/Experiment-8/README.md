# Experiment 8 - JWT Session-Based Frontend Integration

This project demonstrates a complete JWT (JSON Web Token) authentication system with a React frontend consuming backend APIs.

## 📋 Project Structure

```
├── backend/
│   ├── server.js          # Express backend with JWT endpoints
│   ├── package.json       # Backend dependencies
│   └── README.md          # Backend documentation
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.js       # Login page component
│   │   │   └── Dashboard.js   # Protected dashboard component
│   │   ├── styles/
│   │   │   ├── index.css      # Global styles
│   │   │   ├── Login.css      # Login page styles
│   │   │   ├── App.css        # Dashboard styles
│   │   ├── App.js             # Main routing component
│   │   └── index.js           # React entry point
│   ├── public/
│   │   └── index.html         # HTML template
│   ├── package.json           # Frontend dependencies
│   └── .gitignore             # Git ignore rules
│
└── README.md                  # This file
```

## 🎯 Features Implemented

### 1. **Login Page**
   - User authentication via username & password
   - POST `/login` endpoint call
   - JWT token storage in `sessionStorage`
   - Automatic redirect to dashboard on success
   - Error handling and validation

### 2. **Protected Dashboard**
   - Accessible only with valid JWT
   - Session-based access control
   - Authentication header: `Authorization: Bearer <token>`
   - Display protected API response
   - Token inspection capability

### 3. **Logout Functionality**
   - Clear `sessionStorage` token
   - Redirect to login page
   - Session termination

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Backend Setup

```bash
cd authentication/Experiment-8

# Install dependencies
npm install

# Start the server
npm start
```

The backend server will run on **http://localhost:3000**

#### Backend API Endpoints
- `POST /login` - Authenticate user and receive JWT token
- `GET /protected` - Access protected resource (requires valid JWT)

#### Backend Credentials
- **Username:** `testuser`
- **Password:** `password123`

### Frontend Setup

```bash
cd authentication/Experiment-8/frontend

# Install dependencies
npm install

# Start the development server
npm start
```

The frontend will start on a local port (typically **http://localhost:3000** or **http://localhost:3001**)

## 🧪 Testing Steps

1. **Start Frontend & Backend:**
   - Open two terminals
   - Terminal 1: Start backend (`npm start` in `authentication/Experiment-8`)
   - Terminal 2: Start frontend (`npm start` in `authentication/Experiment-8/frontend`)

2. **Test Login Flow:**
   - Navigate to frontend URL
   - Enter credentials: `testuser` / `password123`
   - Click Login
   - Verify token in browser DevTools → Application → sessionStorage

3. **Test Protected Route:**
   - Click "Fetch Protected Data"
   - Verify API response appears on dashboard
   - Check Network tab for Authorization header

4. **Test Session Restriction:**
   - Open DevTools → Application → sessionStorage
   - Delete the `token` entry manually
   - Refresh page → Should redirect to login

5. **Test Logout:**
   - Click "Logout"
   - Verify redirect to login page
   - Confirm token removed from sessionStorage

## 🔐 Authentication Flow

```
1. User enters credentials on Login page
2. Frontend sends POST /login request
3. Backend validates credentials
4. Backend returns JWT token
5. Frontend stores token in sessionStorage
6. Frontend redirects to Dashboard
7. Dashboard checks for token before rendering
8. User can fetch protected data with Authorization header
9. Backend validates token using JWT
10. Backend returns protected data
```

## 📸 Key Components

### Login.js
- Material UI form for credentials
- Axios POST request to backend
- Token storage and navigation
- Error handling with visual feedback

### Dashboard.js
- Protected route guard
- Fetch Protected Data button
- Token visualization
- Logout functionality
- Responsive design

## 🛠️ Tech Stack

- **Frontend Framework:** React 18.3
- **UI Library:** Material UI (MUI)
- **HTTP Client:** Axios
- **Routing:** React Router v6
- **Styling:** Bootstrap 5 + CSS
- **Backend:** Express.js
- **Authentication:** JWT (jsonwebtoken)

## 📝 Deployment Notes

- Update API endpoint from `http://localhost:3000` to production URL before deployment
- Enable CORS on production backend
- Set secure environment variables for JWT_SECRET
- Use HTTPS for production deployments

## ✅ Testing Checklist

- [ ] Login with correct credentials
- [ ] Token appears in sessionStorage
- [ ] Dashboard loads after login
- [ ] Fetch Protected Data returns API response
- [ ] Logout clears token and redirects
- [ ] Direct /dashboard access (no token) redirects to login
- [ ] Invalid credentials show error message
- [ ] Network requests show Authorization header

## 📚 References

- [JWT Introduction](https://jwt.io/introduction)
- [React Router Documentation](https://reactrouter.com/)
- [Material UI Documentation](https://mui.com/)
- [Axios Documentation](https://axios-http.com/)
- [Express.js Guide](https://expressjs.com/)

## 👨‍💻 Author Notes

This experiment demonstrates:
- Session-based JWT authentication
- Frontend protection based on authentication state
- Proper HTTP header usage for API security
- React component lifecycle and state management
- Error handling and user feedback
