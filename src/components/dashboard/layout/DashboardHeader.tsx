import React from 'react';
import { Typography } from '@mui/material';

const DashboardHeader: React.FC = () => {
    return (
        <>
            <Typography variant="h4" component="h1" gutterBottom className="dashboard-title">
                Dashboard Eficiență Energetică la nivel de clădire
            </Typography>
            <Typography variant="subtitle1" className="dashboard-subtitle">
                Selectează clădirea pentru a vedea consumul pe toată perioada sau selectează o dată din calendar.
            </Typography>
        </>
    );
};

export default DashboardHeader; 