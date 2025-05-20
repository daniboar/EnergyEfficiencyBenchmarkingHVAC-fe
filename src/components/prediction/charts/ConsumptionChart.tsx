import React from 'react';
import { Box, Paper, Typography, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { HourData } from '../../../api/api';
import { formatChartData } from '../utils/PredictionUtils';
import CustomTooltip from '../layout/CustomTooltip';

interface ConsumptionChartProps {
    data: HourData[];
    visibleSeries: {
        real: boolean;
        baseline: boolean;
        prediction: boolean;
    };
    onSeriesToggle: (series: 'real' | 'baseline' | 'prediction') => void;
}

const ConsumptionChart: React.FC<ConsumptionChartProps> = ({
    data,
    visibleSeries,
    onSeriesToggle
}) => {
    const chartData = formatChartData(data);

    return (
        <Paper
            sx={{
                p: 3,
                borderRadius: '12px',
                background: 'linear-gradient(to bottom, #f9fafe,rgb(221, 250, 224))',
                boxShadow: '0 4px 20px rgba(0, 41, 99, 0.1)',
                border: '1px solid rgba(25, 118, 210, 0.08)'
            }}
            elevation={2}
            className="chart-container"
        >
            <Typography variant="h5" gutterBottom className="chart-header consumption-header" sx={{ fontWeight: 'bold' }}>
                Consum energetic pe ore (kWh)
            </Typography>

            <FormGroup row sx={{ mb: 3, gap: 2, justifyContent: 'center' }}>
                <Typography variant="subtitle1" sx={{ mr: 2, alignSelf: 'center', fontWeight: 'bold' }}>
                </Typography>
                <FormControlLabel
                    control={<Checkbox
                        checked={visibleSeries.real}
                        onChange={() => onSeriesToggle('real')}
                        sx={{ '&.Mui-checked': { color: '#1976d2' } }}
                    />}
                    label="Consum Real"
                    sx={{ '& .MuiFormControlLabel-label': { color: '#1976d2', fontWeight: 600 } }}
                />
                <FormControlLabel
                    control={<Checkbox
                        checked={visibleSeries.baseline}
                        onChange={() => onSeriesToggle('baseline')}
                        sx={{ '&.Mui-checked': { color: '#ffa726' } }}
                    />}
                    label="Baseline"
                    sx={{ '& .MuiFormControlLabel-label': { color: '#ffa726', fontWeight: 600 } }}
                />
                <FormControlLabel
                    control={<Checkbox
                        checked={visibleSeries.prediction}
                        onChange={() => onSeriesToggle('prediction')}
                        sx={{ '&.Mui-checked': { color: '#8e24aa' } }}
                    />}
                    label="Predicție LSTM"
                    sx={{ '& .MuiFormControlLabel-label': { color: '#8e24aa', fontWeight: 600 } }}
                />
            </FormGroup>

            {chartData.length > 0 ? (
                <Box sx={{ width: '100%', height: '450px' }} className="chart-wrapper">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            data={chartData}
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
                                    value: 'Consum energetic (kWh)',
                                    angle: -90,
                                    position: 'center',
                                    dx: -20,
                                    style: { fontWeight: 600 }
                                }}
                                tick={{ fontSize: 12 }}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend
                                verticalAlign="bottom"
                                height={50}
                                wrapperStyle={{ paddingTop: '20px' }}
                            />
                            {visibleSeries.real && (
                                <Line
                                    type="monotone"
                                    dataKey="Real"
                                    stroke="#1976d2"
                                    strokeWidth={3}
                                    dot={{ r: 5, strokeWidth: 1 }}
                                    activeDot={{ r: 8, stroke: '#1976d2', strokeWidth: 2 }}
                                    name="Consum Real"
                                    isAnimationActive={true}
                                    animationDuration={1000}
                                />
                            )}
                            {visibleSeries.baseline && (
                                <Line
                                    type="monotone"
                                    dataKey="Baseline"
                                    stroke="#ffa726"
                                    strokeWidth={3}
                                    strokeDasharray="5 5"
                                    dot={{ r: 5, strokeWidth: 1 }}
                                    activeDot={{ r: 8, stroke: '#ffa726', strokeWidth: 2 }}
                                    name="Baseline"
                                    isAnimationActive={true}
                                    animationDuration={1000}
                                    animationBegin={300}
                                />
                            )}
                            {visibleSeries.prediction && (
                                <Line
                                    type="monotone"
                                    dataKey="Predicție"
                                    stroke="#8e24aa"
                                    strokeWidth={3}
                                    dot={{ r: 5, strokeWidth: 1 }}
                                    activeDot={{ r: 8, stroke: '#8e24aa', strokeWidth: 2 }}
                                    name="Predicție LSTM"
                                    isAnimationActive={true}
                                    animationDuration={1000}
                                    animationBegin={600}
                                />
                            )}
                        </LineChart>
                    </ResponsiveContainer>
                </Box>
            ) : (
                <Typography color="textSecondary" sx={{ textAlign: 'center', py: 5 }}>
                    Nu există date pentru grafic
                </Typography>
            )}
        </Paper>
    );
};

export default ConsumptionChart; 