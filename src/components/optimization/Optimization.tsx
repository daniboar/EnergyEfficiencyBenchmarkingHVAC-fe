import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container, Paper, Tabs, Tab } from '@mui/material';
import './Optimization.css';
import OptimizationHeader from './layout/OptimizationHeader';
import TabPanel from './ui/TabPanel';
import LoadingView from './views/LoadingView';
import ErrorView from './views/ErrorView';
import GraphTab from './views/GraphTab';
import useOptimizationData from './hooks/useOptimizationData';

const Optimization: React.FC = () => {
    const { buildingName = '', targetDate = '' } = useParams<{ buildingName: string, targetDate: string }>();
    const { data: optimizationData, loading, error } = useOptimizationData(buildingName, targetDate);
    const [activeTab, setActiveTab] = useState<number>(0);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
    };

    if (loading) {
        return <LoadingView />;
    }

    return (
        <Container
            maxWidth={false}
            disableGutters
            className="optimization-bg"
            sx={{
                minHeight: '100vh',
                width: '100vw',
                padding: { xs: '16px', sm: '24px', md: '32px', lg: '40px' },
                overflow: 'auto'
            }}
        >
            <Box className="optimization-box" sx={{ height: 'auto' }}>
                <Paper
                    elevation={8}
                    className="optimization-paper"
                    sx={{
                        height: 'auto',
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: { xs: '16px', md: '20px', lg: '24px' },
                        overflow: 'hidden',
                        padding: { xs: '20px', sm: '35px', md: '40px', lg: '50px' },
                    }}
                >
                    <OptimizationHeader
                        buildingName={buildingName}
                        targetDate={targetDate}
                    />

                    {error && <ErrorView message={error} />}

                    {optimizationData && (
                        <>
                            <Tabs
                                value={activeTab}
                                onChange={handleTabChange}
                                centered
                                textColor="secondary"
                                indicatorColor="secondary"
                                className="optimization-tabs"
                                sx={{
                                    mt: 3,
                                    mb: 4,
                                    '& .MuiTab-root': {
                                        fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                                        transition: 'all 0.3s ease'
                                    },
                                    '& .MuiTabs-indicator': {
                                        height: '3px',
                                        borderRadius: '1.5px'
                                    }
                                }}
                            >
                                <Tab
                                    label="Grafice Comparative"
                                    className={`optimization-tab ${activeTab === 0 ? 'selected-tab' : ''}`}
                                />
                            </Tabs>

                            <TabPanel value={activeTab} index={0}>
                                <GraphTab data={optimizationData.values} />
                            </TabPanel>
                        </>
                    )}
                </Paper>
            </Box>
        </Container>
    );
};

export default Optimization; 