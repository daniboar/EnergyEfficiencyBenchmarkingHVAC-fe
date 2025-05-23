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
                    position: 'relative',
                    '&::after': {
                        content: '""',
                        position: 'absolute',
                        width: '60px',
                        height: '3px',
                        background: 'linear-gradient(90deg, #673ab7, #9c27b0)',
                        bottom: '-8px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        borderRadius: '2px'
                    }
                }}
            >
                Analiza performanței algoritmilor de optimizare
            </Typography>

            <Typography variant="body1" sx={{ px: 3, mt: 4, mb: 3, textAlign: 'justify', lineHeight: 1.7 }}>
                Datele de mai sus reprezintă performanța celor trei algoritmi de optimizare (Ant Colony Optimization,
                Genetic Algorithm și Particle Swarm Optimization) în comparație cu consumul real și baseline-ul.
                Se poate observa că toate cele trei metode de optimizare reușesc să reducă consumul energetic
                în diferite momente ale zilei, cu economii variabile.
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
                Pentru a vedea mai multe detalii despre fiecare algoritm, inclusiv principiile de funcționare
                și avantajele/dezavantajele fiecăruia, puteți accesa tab-ul <b>"Detalii Algoritmi"</b>.
            </Typography>
        </>
    );
};

export default GraphTab; 