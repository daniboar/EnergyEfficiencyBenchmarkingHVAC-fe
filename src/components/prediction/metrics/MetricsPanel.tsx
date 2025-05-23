import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { formatNumber } from '../utils/PredictionUtils';

interface MetricsPanelProps {
    mse: number;
    mae: number;
    smape: number;
    r2: number;
}

const MetricsPanel: React.FC<MetricsPanelProps> = ({ mse, mae, smape, r2 }) => {
    const normalizedR2 = r2 > 1 ? 1 : (r2 < -1 ? -1 : r2);

    return (
        <Box className="prediction-metrics" sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 3,
            justifyContent: 'space-between',
            mb: 4,
            px: 3,
            pt: 3
        }}>
            <Paper className="metric-card" sx={{ flex: '1 1 20%', minWidth: '220px', p: 3, borderRadius: '10px' }}>
                <Typography variant="subtitle1" sx={{ fontSize: '1rem', mb: 1, fontWeight: 'bold' }}>MSE</Typography>
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1976d2' }}>{formatNumber(mse)}</Typography>
            </Paper>
            <Paper className="metric-card" sx={{ flex: '1 1 20%', minWidth: '220px', p: 3, borderRadius: '10px' }}>
                <Typography variant="subtitle1" sx={{ fontSize: '1rem', mb: 1, fontWeight: 'bold' }}>MAE</Typography>
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1976d2' }}>{formatNumber(mae)}</Typography>
            </Paper>
            <Paper className="metric-card" sx={{ flex: '1 1 20%', minWidth: '220px', p: 3, borderRadius: '10px' }}>
                <Typography variant="subtitle1" sx={{ fontSize: '1rem', mb: 1, fontWeight: 'bold' }}>SMAPE</Typography>
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1976d2' }}>{formatNumber(smape)}%</Typography>
            </Paper>
            <Paper className="metric-card" sx={{ flex: '1 1 20%', minWidth: '220px', p: 3, borderRadius: '10px' }}>
                <Typography variant="subtitle1" sx={{ fontSize: 'rem', mb: 1, fontWeight: 'bold' }}>R²</Typography>
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1976d2' }}>{formatNumber(normalizedR2)}</Typography>
            </Paper>
        </Box>
    );
};

export default MetricsPanel; 