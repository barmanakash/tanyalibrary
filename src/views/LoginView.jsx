import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Alert } from '@mui/material';
import { COLORS } from '../styles/theme';
import TanyaImage from '../assets/library.png';

export default function LoginView({ onLogin }) {
  // Static credentials
  const STATIC_USERNAME = 'admin';
  const STATIC_PASSWORD = 'Tanya@1997';

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (
      username === STATIC_USERNAME &&
      password === STATIC_PASSWORD
    ) {
      setError('');
      onLogin(); // Redirect to next page
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        bgcolor: COLORS.bgDark,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          width: '900px',
          height: '500px',
          borderRadius: '4px',
          overflow: 'hidden',
        }}
      >
        {/* Left Side Graphic Section */}
        <Box
          sx={{
            width: '45%',
            bgcolor: COLORS.tealMain,
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: '#ffffff',
              fontWeight: 'bold',
              letterSpacing: '0.05em',
              mt: 2,
            }}
          >
            TANYA LIBRARY
          </Typography>

          <img src={TanyaImage} alt ="tanyalibrary"
          style={{height:"400px", width:"400px"}}
          />

          <Typography
            variant="caption"
            sx={{
              color: '#a7f3d0',
              fontStyle: 'italic',
              mb: 2,
            }}
          >
            Study Zone Management v2.0
          </Typography>
        </Box>

        {/* Right Side Input Controls Entry Form */}
        <Box
          sx={{
            width: '55%',
            bgcolor: '#ffffff',
            p: 6,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: '#0f172a',
              fontWeight: 'bold',
              mb: 1,
            }}
          >
            Welcome Back
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: COLORS.textGray,
              mb: 4,
            }}
          >
            Sign in to manage your library assets
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Typography
            variant="body2"
            sx={{
              fontWeight: 'bold',
              color: '#334155',
              mb: 1,
            }}
          >
            Username
          </Typography>

          <TextField
            fullWidth
            size="small"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{
              mb: 3,
              '& .MuiOutlinedInput-root': {
                borderRadius: '0px',
                '& fieldset': { borderColor: '#000000' },
              },
            }}
          />

          <Typography
            variant="body2"
            sx={{
              fontWeight: 'bold',
              color: '#334155',
              mb: 1,
            }}
          >
            Password
          </Typography>

          <TextField
            fullWidth
            size="small"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              mb: 4,
              '& .MuiOutlinedInput-root': {
                borderRadius: '0px',
                '& fieldset': { borderColor: '#000000' },
              },
            }}
          />

          <Button
            variant="contained"
            fullWidth
            onClick={handleLogin}
            sx={{
              bgcolor: COLORS.tealMain,
              '&:hover': { bgcolor: COLORS.tealHover },
              borderRadius: '0px',
              py: 1.2,
              fontWeight: 'bold',
              textTransform: 'none',
              fontSize: '1rem',
            }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Box>
  );
}