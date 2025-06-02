import React, { useState } from 'react';
import { Box, Typography, Tabs, Tab, FormControlLabel, Checkbox } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { HourData } from '../../../api/api';

interface OptimizationChartProps {
    data: HourData[];
    title: string;
}

const OptimizationChart: React.FC<OptimizationChartProps> = ({ data, title }) => {
    const [selectedTab, setSelectedTab] = useState<number>(0);
    const [visibleSeries, setVisibleSeries] = useState({
        real: true,
        baseline: true,
        prediction: true,
        aco: true,
        ga: true,
        pso: true
    });

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setSelectedTab(newValue);
    };

    const handleSeriesToggle = (series: keyof typeof visibleSeries) => {
        setVisibleSeries((prev) => ({
            ...prev,
            [series]: !prev[series],
        }));
    };

    const formatXAxis = (hour: number) => {
        return `${hour}:00`;
    };

    const processedData = data.map(item => ({
        hour: item.hour,
        real: item.consumption.real,
        baseline: item.consumption.baseline,
        prediction: item.consumption.prediction,
        aco: item.consumption.acoOptimization,
        ga: item.consumption.gaOptimization,
        pso: item.consumption.psoOptimization,
        airTemperature: item.airTemperature,
        dewTemperature: item.dewTemperature
    }));

    // Configurare tooltip personalizat
    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <Box
                    sx={{
                        backgroundColor: 'rgba(255, 255, 255, 0.96)',
                        padding: '10px 14px',
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                        boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
                    }}
                >
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, marginBottom: 1 }}>
                        Ora: {label}:00
                    </Typography>
                    {payload.map((entry: any, index: number) => (
                        <Typography
                            key={`tooltip-${index}`}
                            variant="body2"
                            sx={{
                                color: entry.color,
                                display: 'flex',
                                justifyContent: 'space-between',
                                fontWeight: 500,
                                marginBottom: 0.5
                            }}
                        >
                            <span style={{ marginRight: '12px' }}>{entry.name}:</span>
                            <span style={{ fontWeight: 700 }}>{entry.value.toFixed(2)} kWh</span>
                        </Typography>
                    ))}
                </Box>
            );
        }
        return null;
    };

    // Calculez economiile totale si procentuale pentru fiecare algoritm
    const calculateSavings = () => {
        let totalReal = 0;
        let totalBaseline = 0;
        let totalPrediction = 0;
        let totalAco = 0;
        let totalGa = 0;
        let totalPso = 0;

        data.forEach(hour => {
            totalReal += hour.consumption.real;
            totalBaseline += hour.consumption.baseline;
            totalPrediction += hour.consumption.prediction;
            totalAco += hour.consumption.acoOptimization;
            totalGa += hour.consumption.gaOptimization;
            totalPso += hour.consumption.psoOptimization;
        });

        // Calculez economiile în raport cu baseline-ul, nu cu consumul real
        const acoSavings = totalBaseline - totalAco;
        const gaSavings = totalBaseline - totalGa;
        const psoSavings = totalBaseline - totalPso;

        const acoSavingsPercent = (acoSavings / totalBaseline) * 100;
        const gaSavingsPercent = (gaSavings / totalBaseline) * 100;
        const psoSavingsPercent = (psoSavings / totalBaseline) * 100;

        // Creez un array cu algoritmii si economiile lor pentru sortare
        const algorithms = [
            {
                name: 'Ant Colony Optimization',
                shortName: 'ACO',
                savings: acoSavings,
                savingsPercent: acoSavingsPercent,
                totalConsumption: totalAco
            },
            {
                name: 'Genetic Algorithm',
                shortName: 'GA',
                savings: gaSavings,
                savingsPercent: gaSavingsPercent,
                totalConsumption: totalGa
            },
            {
                name: 'Particle Swarm Optimization',
                shortName: 'PSO',
                savings: psoSavings,
                savingsPercent: psoSavingsPercent,
                totalConsumption: totalPso
            }
        ];

        // Sortez algoritmii după economii (cel mai mic la cel mai mare)
        algorithms.sort((a, b) => a.savingsPercent - b.savingsPercent);

        return {
            totalReal,
            totalBaseline,
            totalPrediction,
            totalAco,
            totalGa,
            totalPso,
            acoSavings,
            gaSavings,
            psoSavings,
            acoSavingsPercent,
            gaSavingsPercent,
            psoSavingsPercent,
            sortedAlgorithms: algorithms
        };
    };

    const savings = calculateSavings();

    // Functie pentru a obține culoarea bazata pe pozitia in ranking
    const getAlgorithmColor = (index: number) => {
        const colors = [
            { bg: '#ffebee', text: '#d32f2f', main: '#f44336' }, // Rosu pentru cel mai rau
            { bg: '#fff8e1', text: '#f57c00', main: '#ff9800' }, // Galben pentru mediu
            { bg: '#e8f5e9', text: '#2e7d32', main: '#4caf50' }  // Verde pentru cel mai bun
        ];
        return colors[index] || colors[2];
    };

    return (
        <Box className="optimization-chart-container">
            <Typography variant="h5" sx={{ fontWeight: 700, marginBottom: 3, color: '#512da8', textAlign: 'center' }}>
                {title}
            </Typography>

            <Tabs
                value={selectedTab}
                onChange={handleTabChange}
                centered
                className="optimization-tabs"
                textColor="secondary"
                indicatorColor="secondary"
                sx={{ marginBottom: 3, borderBottom: '1px solid #e0e0e0' }}
            >
                <Tab label="Grafic Comparativ" className="optimization-tab" />
                <Tab label="Economii Estimate" className="optimization-tab" />
            </Tabs>

            {selectedTab === 0 && (
                <>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, marginBottom: 2, justifyContent: 'center' }}>
                        <FormControlLabel
                            control={<Checkbox checked={visibleSeries.real} onChange={() => handleSeriesToggle('real')} />}
                            label="Consum Real"
                            sx={{ '& .MuiCheckbox-root': { color: '#1976d2' } }}
                        />
                        <FormControlLabel
                            control={<Checkbox checked={visibleSeries.baseline} onChange={() => handleSeriesToggle('baseline')} />}
                            label="Baseline"
                            sx={{ '& .MuiCheckbox-root': { color: '#ffa726' } }}
                        />
                        <FormControlLabel
                            control={<Checkbox checked={visibleSeries.prediction} onChange={() => handleSeriesToggle('prediction')} />}
                            label="Predicție LSTM"
                            sx={{ '& .MuiCheckbox-root': { color: '#000000' } }}
                        />
                        <FormControlLabel
                            control={<Checkbox checked={visibleSeries.aco} onChange={() => handleSeriesToggle('aco')} />}
                            label="Optimizare ACO"
                            sx={{ '& .MuiCheckbox-root': { color: '#673ab7' } }}
                        />
                        <FormControlLabel
                            control={<Checkbox checked={visibleSeries.ga} onChange={() => handleSeriesToggle('ga')} />}
                            label="Optimizare GA"
                            sx={{ '& .MuiCheckbox-root': { color: '#4caf50' } }}
                        />
                        <FormControlLabel
                            control={<Checkbox checked={visibleSeries.pso} onChange={() => handleSeriesToggle('pso')} />}
                            label="Optimizare PSO"
                            sx={{ '& .MuiCheckbox-root': { color: '#f74a8a' } }}
                        />
                    </Box>

                    <ResponsiveContainer width="100%" height={500}>
                        <LineChart
                            data={processedData}
                            margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                            <XAxis
                                dataKey="hour"
                                tickFormatter={formatXAxis}
                                label={{
                                    value: 'Ora zilei',
                                    position: 'insideBottom',
                                    offset: -20,
                                    style: { textAnchor: 'middle', fontWeight: 600, fontSize: 16, fill: '#512da8' }
                                }}
                            />
                            <YAxis
                                label={{
                                    value: 'Consum energetic (kWh)',
                                    angle: -90,
                                    position: 'insideLeft',
                                    offset: 0,
                                    style: { textAnchor: 'middle', fontWeight: 600, fontSize: 16, fill: '#512da8', dominantBaseline: 'middle' }
                                }}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend
                                verticalAlign="bottom"
                                height={30}
                                wrapperStyle={{
                                    marginTop: '10px',
                                    paddingTop: '1px',
                                    bottom: 25
                                }}
                            />

                            {visibleSeries.real && (
                                <Line
                                    type="monotone"
                                    dataKey="real"
                                    stroke="#1976d2"
                                    name="Consum Real"
                                    strokeWidth={2}
                                    dot={{ r: 0 }}
                                    activeDot={{ r: 6 }}
                                />
                            )}

                            {visibleSeries.baseline && (
                                <Line
                                    type="monotone"
                                    dataKey="baseline"
                                    stroke="#ffa726"
                                    name="Baseline"
                                    strokeWidth={2}
                                    strokeDasharray="5 5"
                                    dot={{ r: 0 }}
                                    activeDot={{ r: 6 }}
                                />
                            )}

                            {visibleSeries.prediction && (
                                <Line
                                    type="monotone"
                                    dataKey="prediction"
                                    stroke="#000000"
                                    name="Predicție LSTM"
                                    strokeWidth={2}
                                    dot={{ r: 0 }}
                                    activeDot={{ r: 6 }}
                                />
                            )}

                            {visibleSeries.aco && (
                                <Line
                                    type="monotone"
                                    dataKey="aco"
                                    stroke="#673ab7"
                                    name="Optimizare ACO"
                                    strokeWidth={2}
                                    dot={{ r: 0 }}
                                    activeDot={{ r: 6 }}
                                />
                            )}

                            {visibleSeries.ga && (
                                <Line
                                    type="monotone"
                                    dataKey="ga"
                                    stroke="#4caf50"
                                    name="Optimizare GA"
                                    strokeWidth={2}
                                    dot={{ r: 0 }}
                                    activeDot={{ r: 6 }}
                                />
                            )}

                            {visibleSeries.pso && (
                                <Line
                                    type="monotone"
                                    dataKey="pso"
                                    stroke="#f74a8a"
                                    name="Optimizare PSO"
                                    strokeWidth={2}
                                    dot={{ r: 0 }}
                                    activeDot={{ r: 6 }}
                                />
                            )}
                        </LineChart>
                    </ResponsiveContainer>
                </>
            )}

            {selectedTab === 1 && (
                <Box sx={{ padding: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, marginBottom: 2, color: '#512da8' }}>
                        Estimarea Economisirii Energiei
                    </Typography>

                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, marginBottom: 4, justifyContent: 'center' }}>
                        {savings.sortedAlgorithms.map((algorithm, index) => {
                            const colors = getAlgorithmColor(index);
                            return (
                                <Box key={algorithm.shortName} sx={{
                                    padding: 3,
                                    borderRadius: 2,
                                    backgroundColor: colors.bg,
                                    minWidth: 200,
                                    textAlign: 'center',
                                    boxShadow: '0 3px 10px rgba(0,0,0,0.08)',
                                    border: `2px solid ${colors.main}`,
                                    position: 'relative'
                                }}>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 600, color: colors.text, marginBottom: 1, marginTop: 1 }}>
                                        {algorithm.name}
                                    </Typography>
                                    <Typography variant="h5" sx={{ fontWeight: 700, color: colors.main }}>
                                        {algorithm.savingsPercent.toFixed(2)}%
                                    </Typography>
                                    <Typography variant="body1" sx={{ color: colors.text }}>
                                        {algorithm.savings.toFixed(2)} kWh economisiți
                                    </Typography>
                                </Box>
                            );
                        })}
                    </Box>

                    <Typography variant="h6" sx={{ fontWeight: 600, marginBottom: 2, color: '#512da8' }}>
                        Consumul Total pe 24 de ore
                    </Typography>

                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
                        <Box sx={{
                            padding: 2,
                            borderRadius: 2,
                            backgroundColor: '#f5f5f5',
                            minWidth: 180,
                            textAlign: 'center',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                        }}>
                            <Typography variant="subtitle2" sx={{ color: '#616161' }}>
                                Consum Real
                            </Typography>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: '#1976d2' }}>
                                {savings.totalReal.toFixed(2)} kWh
                            </Typography>
                        </Box>

                        <Box sx={{
                            padding: 2,
                            borderRadius: 2,
                            backgroundColor: '#f5f5f5',
                            minWidth: 180,
                            textAlign: 'center',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                        }}>
                            <Typography variant="subtitle2" sx={{ color: '#616161' }}>
                                Baseline
                            </Typography>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: '#ffa726' }}>
                                {savings.totalBaseline.toFixed(2)} kWh
                            </Typography>
                        </Box>

                        <Box sx={{
                            padding: 2,
                            borderRadius: 2,
                            backgroundColor: '#f5f5f5',
                            minWidth: 180,
                            textAlign: 'center',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                        }}>
                            <Typography variant="subtitle2" sx={{ color: '#616161' }}>
                                Predicție
                            </Typography>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: '#000000' }}>
                                {savings.totalPrediction.toFixed(2)} kWh
                            </Typography>
                        </Box>

                        {savings.sortedAlgorithms.map((algorithm, index) => {
                            const colors = getAlgorithmColor(index);
                            return (
                                <Box key={`total-${algorithm.shortName}`} sx={{
                                    padding: 2,
                                    borderRadius: 2,
                                    backgroundColor: '#f5f5f5',
                                    minWidth: 180,
                                    textAlign: 'center',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                                }}>
                                    <Typography variant="subtitle2" sx={{ color: '#616161' }}>
                                        {algorithm.shortName}
                                    </Typography>
                                    <Typography variant="h6" sx={{ fontWeight: 700, color: colors.main }}>
                                        {algorithm.totalConsumption.toFixed(2)} kWh
                                    </Typography>
                                </Box>
                            );
                        })}
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default OptimizationChart; 