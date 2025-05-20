import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DataPoint } from '../types/DashboardTypes';
import { xTickFormatter } from '../utils/DashboardUtils';
import CustomTooltip from './CustomTooltip';
import CustomLegend from './CustomLegend';

interface DashboardChartProps {
    loading: boolean;
    error: string | null;
    selectedBuilding: string;
    selectedDate: Date | undefined;
    filteredData: DataPoint[];
}

const DashboardChart: React.FC<DashboardChartProps> = ({
    loading,
    error,
    selectedBuilding,
    selectedDate,
    filteredData
}) => {
    return (
        <Box className="dashboard-chart-container">
            {loading && (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200 }}>
                    <CircularProgress size={60} thickness={5} color="primary" />
                </div>
            )}
            {error && <Typography color="error">{error}</Typography>}
            {!loading && !error && selectedBuilding && filteredData.length === 0 && (
                <Typography color="text.secondary" style={{ textAlign: 'center', fontSize: 25, fontWeight: 600 }}>
                    Nu există date pentru această zi!
                </Typography>
            )}
            {!loading && !error && filteredData.length > 0 && (
                <ResponsiveContainer width="100%" height={500}>
                    <LineChart data={filteredData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                        <XAxis
                            dataKey="timestamp"
                            tickFormatter={(tick) => xTickFormatter(tick, selectedDate)}
                            interval={Math.ceil(filteredData.length / 8)}
                            label={{
                                value: selectedDate ? 'Ora de consum' : 'Ziua de consum',
                                position: 'insideBottom',
                                offset: -10,
                                style: { textAnchor: 'middle', fontWeight: 600, fontSize: 16, fill: '#1976d2' }
                            }}
                        />
                        <YAxis
                            label={{
                                value: 'Consum energetic (kWh)',
                                angle: -90,
                                position: 'insideLeft',
                                offset: 0,
                                style: { textAnchor: 'middle', fontWeight: 600, fontSize: 16, fill: '#1976d2', dominantBaseline: 'middle' }
                            }}
                        />
                        <Tooltip content={<CustomTooltip selectedDate={selectedDate} />} />
                        <Legend content={<CustomLegend selectedBuilding={selectedBuilding} selectedDate={selectedDate} />} />
                        <Line type="monotone" dataKey="real" stroke="#1976d2" dot={false} name="Consum Real" strokeWidth={2} />
                        <Line type="monotone" dataKey="baseline" stroke="#ffa726" dot={false} name="Baseline" strokeDasharray="5 5" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            )}
        </Box>
    );
};

export default DashboardChart; 