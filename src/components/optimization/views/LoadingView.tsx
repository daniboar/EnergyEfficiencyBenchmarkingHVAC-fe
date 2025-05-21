import React from 'react';
import { Box, Container, CircularProgress, Typography } from '@mui/material';

const LoadingView: React.FC = () => {
    return (
        <Container maxWidth={false} disableGutters className="optimization-bg" sx={{ height: '100vh', width: '100vw', padding: 0 }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh'
            }}>
                <CircularProgress
                    size={70}
                    thickness={5}
                    color="secondary"
                    sx={{
                        animation: 'pulse 1.5s infinite ease-in-out',
                        '@keyframes pulse': {
                            '0%': { opacity: 0.7, transform: 'scale(0.95)' },
                            '50%': { opacity: 1, transform: 'scale(1.05)' },
                            '100%': { opacity: 0.7, transform: 'scale(0.95)' },
                        }
                    }}
                />
                <Typography
                    variant="h6"
                    sx={{
                        mt: 3,
                        fontWeight: 500,
                        background: 'linear-gradient(45deg, #512da8, #673ab7, #9c27b0)',
                        backgroundClip: 'text',
                        textFillColor: 'transparent',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        animation: 'fadeInOut 2s infinite ease-in-out',
                        '@keyframes fadeInOut': {
                            '0%': { opacity: 0.7 },
                            '50%': { opacity: 1 },
                            '100%': { opacity: 0.7 },
                        }
                    }}
                >
                    Se încarcă datele de optimizare, vă rugăm să așteptați...
                </Typography>
            </Box>
        </Container>
    );
};

export default LoadingView; 