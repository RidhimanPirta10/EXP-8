import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardContent, Typography } from '@mui/material';

function Dashboard() {
  const [data, setData] = useState('');
  const [error, setError] = useState('');
  const token = sessionStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/');
    }
  }, [token, navigate]);

  const getData = async () => {
    setError('');
    try {
      const res = await axios.get('http://localhost:3000/protected', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(res.data.message);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to fetch protected data');
    }
  };

  const logout = () => {
    sessionStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <Card className="dashboard-card p-3" sx={{ minWidth: 320, maxWidth: 640, width: '100%' }}>
        <CardContent>
          <Typography variant="h4" component="h1" className="mb-4 text-center">
            Dashboard
          </Typography>
          <div className="d-flex flex-column flex-md-row justify-content-center gap-2 mb-4">
            <Button variant="contained" color="success" onClick={getData}>
              Fetch Protected Data
            </Button>
            <Button variant="contained" color="error" onClick={logout}>
              Logout
            </Button>
          </div>
          {data && (
            <Typography variant="body1" className="mb-3">
              {data}
            </Typography>
          )}
          {error && (
            <Typography color="error" variant="body1">
              {error}
            </Typography>
          )}
          {!data && !error && (
            <Typography variant="body2" color="textSecondary">
              Click “Fetch Protected Data” to call the protected API with your JWT.
            </Typography>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default Dashboard;
