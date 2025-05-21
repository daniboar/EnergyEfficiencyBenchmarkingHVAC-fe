import React from 'react';
import { Box, Paper, Typography, Divider } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, ReferenceLine } from 'recharts';
import { HourData } from '../../../api/api';
import { formatBarChartData, getBarColor, getMinMaxConsumption } from '../utils/PredictionUtils';

interface ConsumptionBarChartProps {
    data: HourData[];
}

const ConsumptionBarChart: React.FC<ConsumptionBarChartProps> = ({ data }) => {
    const barData = formatBarChartData(data);
    const { min: minConsumption, max: maxConsumption, avg: avgConsumption } = getMinMaxConsumption(data);

    return (
        <Paper
            sx={{
                p: 3,
                mt: 6,
                borderRadius: '12px',
                background: 'linear-gradient(to bottom,rgb(234, 228, 248),rgb(251, 251, 233))',
                boxShadow: '0 4px 20px rgba(99, 0, 99, 0.08)',
                border: '1px solid rgba(142, 36, 170, 0.08)'
            }}
            elevation={2}
            className="chart-container"
        >
            <Typography variant="h5" gutterBottom className="chart-header consumption-bar-header" sx={{ fontWeight: 'bold' }}>
                Profil de consum de energie - Analiză vizuală
            </Typography>

            <Box sx={{
                mb: 3,
                p: 2,
                backgroundColor: 'rgba(0,0,0,0.02)',
                borderRadius: '8px',
                border: '1px solid rgba(0,0,0,0.05)'
            }}>
                <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold' }}>
                    Legendă culori:
                </Typography>
                <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ width: 20, height: 20, backgroundColor: '#2ecc71', borderRadius: 1 }} />
                        <Typography>Consum mic</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ width: 20, height: 20, backgroundColor: '#f39c12', borderRadius: 1 }} />
                        <Typography>Consum mediu-mic</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ width: 20, height: 20, backgroundColor: '#e67e22', borderRadius: 1 }} />
                        <Typography>Consum mediu-mare</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ width: 20, height: 20, backgroundColor: '#e74c3c', borderRadius: 1 }} />
                        <Typography>Consum mare</Typography>
                    </Box>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Typography>
                    Graficul evidențiază orele cu consum maxim (roșu) și minim (verde).
                    <strong> Media consumului: {avgConsumption.toFixed(2)} kWh</strong>
                </Typography>
            </Box>

            {barData.length > 0 ? (
                <Box sx={{ width: '100%', height: '400px' }} className="chart-wrapper">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={barData}
                            margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                            <XAxis
                                dataKey="hour"
                                label={{
                                    value: 'Ora',
                                    position: 'insideBottom',
                                    offset: 0,
                                    dy: 15,
                                    style: { fontWeight: 600 }
                                }}
                                tick={{ fontSize: 12 }}
                            />
                            <YAxis
                                label={{
                                    value: 'Consum (kWh)',
                                    angle: -90,
                                    position: 'center',
                                    dx: -20,
                                    style: { fontWeight: 600 }
                                }}
                                tick={{ fontSize: 12 }}
                            />
                            <Tooltip
                                formatter={(value: number) => [`${value.toFixed(2)} kWh`, 'Consum']}
                                labelFormatter={(label) => `Ora: ${label}`}
                                contentStyle={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                    borderRadius: '8px',
                                    padding: '10px 15px',
                                    boxShadow: '0 3px 10px rgba(0, 0, 0, 0.15)',
                                    border: '1px solid #ddd'
                                }}
                            />
                            <Legend
                                verticalAlign="bottom"
                                height={50}
                                payload={[
                                    { value: 'Media consumului', type: 'line', color: '#607d8b' }
                                ]}
                                wrapperStyle={{ paddingTop: '20px' }}
                            />
                            <ReferenceLine
                                y={avgConsumption}
                                stroke="#607d8b"
                                strokeDasharray="10 10"
                                strokeWidth={2}
                            />
                            <Bar
                                dataKey="consum"
                                name="Consum real"
                                isAnimationActive={true}
                                animationDuration={1500}
                                animationBegin={300}
                            >
                                {barData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={getBarColor(entry.consum, minConsumption, maxConsumption)}
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </Box>
            ) : (
                <Typography color="textSecondary" sx={{ textAlign: 'center', py: 5 }}>
                    Nu există date pentru grafic.
                </Typography>
            )}
        </Paper>
    );
};

export default ConsumptionBarChart; 