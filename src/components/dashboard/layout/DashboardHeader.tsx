import React from 'react';
import { Typography } from '@mui/material';

const DashboardHeader: React.FC = () => {
    return (
        <>
            <Typography variant="h4" component="h1" gutterBottom className="dashboard-title">
                Dashboard Eficiență Energetică la Nivel de Clădire
            </Typography>
            <Typography variant="subtitle1" className="dashboard-subtitle" style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                Selectează o clădire pentru a vedea consumul pe toată perioada și selectează o dată din calendar pentru a vedea consumul pentru o zi.
            </Typography>
        </>
    );
};

export default DashboardHeader; 