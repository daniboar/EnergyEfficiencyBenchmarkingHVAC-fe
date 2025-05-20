import React from 'react';
import { Box, Typography } from '@mui/material';
import { buildingTypeExplanations, buildingTypeEfficiencyTips, getBuildingType } from '../utils/DashboardUtils';

interface BuildingInfoProps {
    selectedBuilding: string;
}

const BuildingInfo: React.FC<BuildingInfoProps> = ({ selectedBuilding }) => {
    if (!selectedBuilding) return null;

    const buildingType = getBuildingType(selectedBuilding);

    return (
        <Box className="building-info-section">
            <Typography variant="h5" className="building-info-section-title">
                Informații despre tipul de clădire: <b>{buildingType}</b>
            </Typography>
            <Box className="building-info-content">
                <Typography variant="body1" className="building-info-description">
                    {buildingTypeExplanations[buildingType]}
                </Typography>

                <Typography variant="h6" className="building-info-tips-title">
                    Sfaturi pentru îmbunătățirea eficienței energetice:
                </Typography>
                <ul className="building-info-tips-list">
                    {buildingTypeEfficiencyTips[buildingType] &&
                        buildingTypeEfficiencyTips[buildingType].map((tip, index) => (
                            <li key={index} className="building-info-tip-item">
                                {tip}
                            </li>
                        ))}
                </ul>
            </Box>
        </Box>
    );
};

export default BuildingInfo; 