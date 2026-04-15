# Experiment 8 - JWT Frontend Integration

## Backend
- Start from `authentication/Experiment-8`
- Install dependencies: `npm install`
- Start server: `npm start`
- Backend runs on `http://localhost:3000`
- Login endpoint: `POST /login`
- Protected endpoint: `GET /protected`

## Frontend
- Navigate to `authentication/Experiment-8/frontend`
- Install dependencies: `npm install`
- Start frontend: `npm start`
- React app runs on `http://localhost:3000` by default, but `react-scripts` will choose another free port if needed.

## Login credentials
- Username: `testuser`
- Password: `password123`

## Features
- Login page stores JWT in `sessionStorage`
- Dashboard is only accessible with an active token
- Protected API call uses `Authorization: Bearer <token>` header
- Logout clears the JWT and redirects to login
