import React from 'react';
import { getBuildingType, getDayName } from '../utils/DashboardUtils';
import { Typography } from '@mui/material';

interface CustomLegendProps {
    selectedBuilding: string;
    selectedDate: Date | undefined;
}

const CustomLegend: React.FC<CustomLegendProps> = ({ selectedBuilding, selectedDate }) => {
    return (
        <div className="dashboard-legend">
            <span className="legend-box legend-real"></span>
            <Typography component="span" sx={{ fontSize: '1.1rem', fontWeight: 600 }}>Consum Real</Typography>

            <span className="legend-box legend-baseline"></span>
            <Typography component="span" sx={{ fontSize: '1.1rem', fontWeight: 600 }}>Baseline</Typography>

            {selectedBuilding && (
                <>
                    <span className="legend-type-badge">Tipul clădirii: <b>{getBuildingType(selectedBuilding)}</b></span>
                    {selectedDate && (
                        <span className="legend-day-badge">Ziua selectată: <b>{getDayName(selectedDate)}</b></span>
                    )}
                </>
            )}
        </div>
    );
};

export default CustomLegend; 