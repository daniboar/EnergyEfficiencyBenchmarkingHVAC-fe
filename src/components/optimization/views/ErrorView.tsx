import React from 'react';
import { Box, Typography, Fade } from '@mui/material';

interface ErrorViewProps {
    message: string;
}

/**
 * Componenta pentru afișarea mesajelor de eroare
 */
const ErrorView: React.FC<ErrorViewProps> = ({ message }) => {
    return (
        <Fade in={true} timeout={800}>
            <Box sx={{
                p: 3,
                m: 3,
                bgcolor: '#ffebee',
                borderRadius: '12px',
                border: '1px solid #ffcdd2',
                animation: 'pulse 2s infinite ease-in-out',
                '@keyframes pulse': {
                    '0%': { boxShadow: '0 0 0 0 rgba(229, 115, 115, 0.4)' },
                    '70%': { boxShadow: '0 0 0 10px rgba(229, 115, 115, 0)' },
                    '100%': { boxShadow: '0 0 0 0 rgba(229, 115, 115, 0)' },
                }
            }}>
                <Typography color="error" variant="h6">{message}</Typography>
            </Box>
        </Fade>
    );
};

export default ErrorView; 