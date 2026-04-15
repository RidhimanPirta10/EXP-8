import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { 
  Button, 
  Card, 
  CardContent, 
  Typography, 
  Container, 
  Alert,
  CircularProgress,
  Box
} from '@mui/material';
import '../styles/Dashboard.css';

function Dashboard() {
  const [data, setData] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [tokenInfo, setTokenInfo] = useState('');
  const token = sessionStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/');
    }
  }, [token, navigate]);

  const handleFetchData = async () => {
    setError('');
    setData('');
    setLoading(true);

    try {
      console.log('🔍 Fetching protected data with token:', token);
      
      const response = await axios.get('http://localhost:3000/protected', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });

      setData(response.data.message);
      console.log('✅ Protected data received:', response.data.message);
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Unable to fetch protected data';
      setError(errorMsg);
      console.error('❌ Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    console.log('🚪 Logging out - removing token from sessionStorage');
    sessionStorage.removeItem('token');
    navigate('/');
  };

  const handleCheckToken = () => {
    setTokenInfo(token);
  };

  return (
    <Container maxWidth="md">
      <div className="dashboard-container">
        <Card className="dashboard-card">
          <CardContent>
            <Typography variant="h3" component="h1" className="dashboard-title">
              📊 Dashboard
            </Typography>

            <Typography variant="body1" className="welcome-message">
              ✅ You are successfully authenticated!
            </Typography>

            <Box className="button-group">
              <Button 
                variant="contained" 
                color="success" 
                onClick={handleFetchData}
                disabled={loading}
                className="action-button"
              >
                {loading ? <CircularProgress size={24} /> : 'Fetch Protected Data'}
              </Button>
              
              <Button 
                variant="outlined" 
                color="info" 
                onClick={handleCheckToken}
                className="action-button"
              >
                View Token in sessionStorage
              </Button>

              <Button 
                variant="contained" 
                color="error" 
                onClick={handleLogout}
                className="action-button"
              >
                Logout
              </Button>
            </Box>

            {error && (
              <Alert severity="error" className="mt-4">
                {error}
              </Alert>
            )}

            {data && (
              <Alert severity="success" className="mt-4">
                <strong>Protected API Response:</strong><br />
                {data}
              </Alert>
            )}

            {tokenInfo && !data && !error && (
              <Alert severity="info" className="mt-4">
                <strong>Token in sessionStorage:</strong><br />
                <code className="token-display">{tokenInfo}</code>
              </Alert>
            )}

            {!data && !error && !tokenInfo && !loading && (
              <Alert severity="info" className="mt-4">
                Click the buttons above to test the JWT authentication flow
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>
    </Container>
  );
}

export default Dashboard;
