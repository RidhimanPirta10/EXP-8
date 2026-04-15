import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardContent, TextField, Typography } from '@mui/material';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const login = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const res = await axios.post('http://localhost:3000/login', {
        username,
        password,
      });

      if (res.data.token) {
        sessionStorage.setItem('token', res.data.token);
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <Card className="login-card p-3" sx={{ minWidth: 320, maxWidth: 420, width: '100%' }}>
        <CardContent>
          <Typography variant="h4" component="h1" className="mb-4 text-center">
            Login
          </Typography>
          <form onSubmit={login}>
            <TextField
              fullWidth
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
            />
            {error && <Typography color="error" className="mt-2">{error}</Typography>}
            <Button type="submit" variant="contained" color="primary" fullWidth className="mt-3">
              Login
            </Button>
          </form>
          <Typography variant="body2" className="mt-3 text-secondary">
            Use <strong>testuser / password123</strong>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;
