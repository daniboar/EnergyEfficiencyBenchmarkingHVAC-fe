import React from 'react';
import { Typography } from '@mui/material';
import OptimizationChart from '../charts/OptimizationChart';
import { HourData } from '../../../api/api';

interface GraphTabProps {
    data: HourData[];
}

// Componenta pentru tab-ul cu grafice comparative
const GraphTab: React.FC<GraphTabProps> = ({ data }) => {
    return (
        <>
            <OptimizationChart
                data={data}
                title="Comparație Algoritmi de Optimizare"
            />

            <Typography
                variant="h6"
                sx={{
                    mt: 5,
                    mb: 2,
                    textAlign: 'center',
                    color: '#512da8',
                    fontWeight: 600,
                    position: 'relative'
                }}
            >
                Analiza performanței algoritmilor de optimizare
            </Typography>

            <Typography variant="body1" sx={{
                px: 3,
                mb: 5,
                textAlign: 'justify',
                lineHeight: 1.7,
                position: 'relative',
                paddingLeft: '20px',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    width: '4px',
                    height: '100%',
                    background: 'linear-gradient(180deg, #673ab7, #9c27b0)',
                    left: '5px',
                    top: 0,
                    borderRadius: '2px'
                }
            }}>
                Datele de mai sus reprezintă performanța celor trei algoritmi de optimizare (Ant Colony Optimization,
                Genetic Algorithm și Particle Swarm Optimization) în comparație cu consumul de baseline.
                Se poate observa că toate cele trei metode de optimizare reușesc să reducă consumul energetic
                în diferite momente ale zilei, cu economii variabile.
            </Typography >
        </>
    );
};

export default GraphTab; 