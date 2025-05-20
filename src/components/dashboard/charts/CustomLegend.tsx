import React from 'react';
import { getBuildingType, getDayName } from '../utils/DashboardUtils';

interface CustomLegendProps {
    selectedBuilding: string;
    selectedDate: Date | undefined;
}

const CustomLegend: React.FC<CustomLegendProps> = ({ selectedBuilding, selectedDate }) => {
    return (
        <div className="dashboard-legend">
            <span className="legend-box legend-real"></span> Consum Real
            <span className="legend-box legend-baseline"></span> Baseline
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