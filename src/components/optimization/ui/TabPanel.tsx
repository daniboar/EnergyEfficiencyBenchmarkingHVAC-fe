import React from 'react';
import { Box, Fade } from '@mui/material';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

// Componenta reutilizabila pentru panoul de tab
const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`optimization-tabpanel-${index}`}
            aria-labelledby={`optimization-tab-${index}`}
        >
            {value === index && (
                <Fade in={true} timeout={1000}>
                    <Box sx={{ width: '100%' }}>
                        {children}
                    </Box>
                </Fade>
            )}
        </div>
    );
};

export default TabPanel; 