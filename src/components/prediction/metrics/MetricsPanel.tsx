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
        <>
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
                    <Typography variant="subtitle1" sx={{ fontSize: '1rem', mb: 1, fontWeight: 'bold' }}>R²</Typography>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1976d2' }}>{formatNumber(normalizedR2)}</Typography>
                </Paper>
            </Box>

            <Paper sx={{
                mx: 3,
                mb: 4,
                p: 3,
                borderRadius: '12px',
                backgroundColor: '#f8f9fa',
                border: '1px solid #e9ecef'
            }}>
                <Typography variant="h6" sx={{
                    fontWeight: 'bold',
                    mb: 3,
                    color: '#495057',
                    textAlign: 'center',
                    fontSize: '1.2rem'
                }}>
                    📊 Explicația Metricilor de Evaluare
                </Typography>

                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                    gap: 3
                }}>
                    <Box sx={{
                        p: 2.5,
                        borderRadius: '8px',
                        backgroundColor: '#fff',
                        border: '1px solid #dee2e6',
                        borderLeft: '4px solid #1976d2'
                    }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#1976d2', mb: 1 }}>
                            MSE (Mean Squared Error)
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#6c757d', lineHeight: 1.5 }}>
                            <strong>Eroarea Pătratică Medie</strong> - Măsoară diferența medie pătratică între valorile reale și cele prezise.
                            Valorile mai mici indică o precizie mai bună. Penalizează mai mult erorile mari datorită ridicării la pătrat.
                        </Typography>
                    </Box>

                    <Box sx={{
                        p: 2.5,
                        borderRadius: '8px',
                        backgroundColor: '#fff',
                        border: '1px solid #dee2e6',
                        borderLeft: '4px solid #1976d2'
                    }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#1976d2', mb: 1 }}>
                            MAE (Mean Absolute Error)
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#6c757d', lineHeight: 1.5 }}>
                            <strong>Eroarea Absolută Medie</strong> - Măsoară diferența medie absolută între valorile reale și cele prezise.
                            Este mai robustă la valorile extreme și oferă o interpretare directă a erorii medii.
                        </Typography>
                    </Box>

                    <Box sx={{
                        p: 2.5,
                        borderRadius: '8px',
                        backgroundColor: '#fff',
                        border: '1px solid #dee2e6',
                        borderLeft: '4px solid #1976d2'
                    }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#1976d2', mb: 1 }}>
                            SMAPE (Symmetric Mean Absolute Percentage Error)
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#6c757d', lineHeight: 1.5 }}>
                            <strong>Eroarea Procentuală Absolută Medie Simetrică</strong> - Exprimă eroarea ca procent,
                            fiind simetrică față de supraevaluare și subevaluare. Valorile mai mici (sub 10%) indică predicții foarte bune.
                        </Typography>
                    </Box>

                    <Box sx={{
                        p: 2.5,
                        borderRadius: '8px',
                        backgroundColor: '#fff',
                        border: '1px solid #dee2e6',
                        borderLeft: '4px solid #1976d2'
                    }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#1976d2', mb: 1 }}>
                            R² (R squared)
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#6c757d', lineHeight: 1.5 }}>
                            <strong>Coeficientul de Determinare</strong> - Indică cât de bine explică modelul variația datelor.
                            Valorile apropiate de 1.0 (100%) indică o potrivire excelentă, iar valorile negative indică o performanță slabă.
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{
                    mt: 3,
                    p: 2,
                    borderRadius: '8px',
                    backgroundColor: '#e3f2fd',
                    border: '1px solid #bbdefb'
                }}>
                    <Typography variant="body2" sx={{
                        color: '#1565c0',
                        textAlign: 'center',
                        fontWeight: 500,
                        lineHeight: 1.4
                    }}>
                        💡 <strong>Interpretare:</strong> Pentru ca o predicție să fie bună, MSE, MAE și SMAPE trebuie să fie să aibă valori mici,
                        iar R² trebuie să fie apropiat de 1.0. Aceste metrici vă ajută să evaluați cât de precise sunt predicțiile modelului LSTM.
                    </Typography>
                </Box>
            </Paper>
        </>
    );
};

export default MetricsPanel; 