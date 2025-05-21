import React from 'react';
import { Box } from '@mui/material';
import AlgorithmInfo from '../info/AlgorithmInfo';

// Tablul cu detalii despre algoritmi
const AlgorithmTab: React.FC = () => {
    return (
        <Box sx={{ p: 2 }}>
            <AlgorithmInfo />
        </Box>
    );
};

export default AlgorithmTab; 