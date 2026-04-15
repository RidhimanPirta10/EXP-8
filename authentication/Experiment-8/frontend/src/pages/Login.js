import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardContent, TextField, Typography, Container, Alert } from '@mui/material';
import '../styles/Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:3000/login', {
        username,
        password,
      }, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.data.token) {
        sessionStorage.setItem('token', response.data.token);
        console.log('✅ Token stored in sessionStorage:', response.data.token);
        navigate('/dashboard');
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Login failed. Please try again.';
      setError(errorMsg);
      console.error('❌ Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <div className="login-container">
        <Card className="login-card">
          <CardContent>
            <Typography variant="h3" component="h1" className="login-title">
              🔐 Login
            </Typography>
            
            {error && (
              <Alert severity="error" className="mt-3 mb-3">
                {error}
              </Alert>
            )}

            <form onSubmit={handleLogin}>
              <TextField
                fullWidth
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                margin="normal"
                required
                disabled={loading}
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                required
                disabled={loading}
              />
              <Button 
                type="submit" 
                variant="contained" 
                color="primary" 
                fullWidth 
                className="mt-4 login-button"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </form>

            <Typography variant="body2" className="mt-4 credentials-info">
              <strong>Demo Credentials:</strong><br />
              📧 Username: <code>testuser</code><br />
              🔑 Password: <code>password123</code>
            </Typography>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
}

export default Login;
