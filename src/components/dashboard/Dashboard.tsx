import React, { useState, useEffect } from 'react';
import { Box, Container, Paper } from '@mui/material';
import { SelectChangeEvent } from '@mui/material';
import { getBuildings, getBuildingData } from '../../api/api';
import './Dashboard.css';
import { DataPoint } from './types/DashboardTypes';
import { filterDataByDate } from './utils/DashboardUtils';
import DashboardHeader from './layout/DashboardHeader';
import DashboardControls from './layout/DashboardControls';
import DashboardChart from './charts/DashboardChart';
import BuildingInfo from './info/BuildingInfo';

const Dashboard: React.FC = () => {
    const [buildings, setBuildings] = useState<string[]>([]);
    const [selectedBuilding, setSelectedBuilding] = useState<string>('');
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const [data, setData] = useState<DataPoint[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [minDate, setMinDate] = useState<Date | undefined>(undefined);
    const [maxDate, setMaxDate] = useState<Date | undefined>(undefined);

    useEffect(() => {
        const fetchBuildings = async () => {
            try {
                const buildings = await getBuildings();
                setBuildings(buildings);
            } catch (error) {
                console.error('Eroare la incarcarea cladirilor:', error);
            }
        };
        fetchBuildings();
    }, []);

    useEffect(() => {
        if (!selectedBuilding) return;
        setLoading(true);
        setError(null);
        getBuildingData(selectedBuilding)
            .then((data) => {
                setData(data);
                if (data.length > 0) {
                    setMinDate(new Date(data[0].timestamp));
                    setMaxDate(new Date(data[data.length - 1].timestamp));
                } else {
                    setMinDate(undefined);
                    setMaxDate(undefined);
                }
            })
            .catch(() => {
                setError('Eroare la incarcarea datelor pentru cladire.');
                setData([]);
                setMinDate(undefined);
                setMaxDate(undefined);
            })
            .finally(() => setLoading(false));
    }, [selectedBuilding]);

    const handleBuildingChange = (event: SelectChangeEvent) => {
        setSelectedBuilding(event.target.value);
    };

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date || undefined);
    };

    const handleResetDate = () => {
        setSelectedDate(undefined);
    };

    const filteredData = filterDataByDate(data, selectedDate);
    return (
        <Container
            maxWidth={false}
            disableGutters
            className="dashboard-bg"
            sx={{
                minHeight: '100vh',
                width: '100vw',
                padding: { xs: '16px', sm: '24px', md: '32px', lg: '40px' },
                overflow: 'auto'
            }}
        >
            <Box className="dashboard-box" sx={{ height: 'auto', width: '100%' }}>
                <Paper
                    elevation={6}
                    className="dashboard-paper"
                    sx={{
                        height: 'auto',
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: { xs: '16px', md: '20px', lg: '24px' },
                        overflow: 'hidden',
                        padding: { xs: '20px', sm: '30px', md: '40px', lg: '48px' },
                        maxWidth: 'none'
                    }}
                >
                    <DashboardHeader />

                    <DashboardControls
                        buildings={buildings}
                        selectedBuilding={selectedBuilding}
                        selectedDate={selectedDate}
                        minDate={minDate}
                        maxDate={maxDate}
                        onBuildingChange={handleBuildingChange}
                        onDateChange={handleDateChange}
                        onResetDate={handleResetDate}
                    />

                    <DashboardChart
                        loading={loading}
                        error={error}
                        selectedBuilding={selectedBuilding}
                        selectedDate={selectedDate}
                        filteredData={filteredData}
                    />

                    {selectedBuilding && <BuildingInfo selectedBuilding={selectedBuilding} />}

                </Paper>
            </Box>
        </Container>
    );
};

export default Dashboard; 