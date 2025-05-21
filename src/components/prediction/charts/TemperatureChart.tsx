import React from 'react';
import { Box, Paper, Typography, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { HourData } from '../../../api/api';
import { formatTempChartData } from '../utils/PredictionUtils';
import TemperatureTooltip from '../layout/TemperatureTooltip';

interface TemperatureChartProps {
    data: HourData[];
    visibleTempSeries: {
        airTemp: boolean;
        dewTemp: boolean;
    };
    onTempSeriesToggle: (series: 'airTemp' | 'dewTemp') => void;
}

const TemperatureChart: React.FC<TemperatureChartProps> = ({
    data,
    visibleTempSeries,
    onTempSeriesToggle
}) => {
    const chartData = formatTempChartData(data);

    return (
        <Paper
            sx={{
                p: 3,
                mt: 6,
                borderRadius: '12px',
                background: 'linear-gradient(to bottom,rgb(220, 240, 245),rgb(250, 224, 224))',
                boxShadow: '0 4px 20px rgba(0, 99, 64, 0.08)',
                border: '1px solid rgba(76, 175, 80, 0.08)'
            }}
            elevation={2}
            className="chart-container"
        >
            <Typography variant="h5" gutterBottom className="chart-header temperature-header" sx={{ fontWeight: 'bold' }}>
                Temperaturi pe ore (°C)
            </Typography>

            <FormGroup row sx={{ mb: 3, gap: 2, justifyContent: 'center' }}>
                <FormControlLabel
                    control={<Checkbox
                        checked={visibleTempSeries.airTemp}
                        onChange={() => onTempSeriesToggle('airTemp')}
                        sx={{ '&.Mui-checked': { color: '#2196f3' } }}
                    />}
                    label="Temperatura aerului"
                    sx={{ '& .MuiFormControlLabel-label': { color: '#2196f3', fontWeight: 600 } }}
                />
                <FormControlLabel
                    control={<Checkbox
                        checked={visibleTempSeries.dewTemp}
                        onChange={() => onTempSeriesToggle('dewTemp')}
                        sx={{ '&.Mui-checked': { color: '#4caf50' } }}
                    />}
                    label="Temperatura punctului de rouă"
                    sx={{ '& .MuiFormControlLabel-label': { color: '#4caf50', fontWeight: 600 } }}
                />
            </FormGroup>

            {chartData.length > 0 ? (
                <Box sx={{ width: '100%', height: '400px' }} className="chart-wrapper">
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
                                    value: 'Temperatura (°C)',
                                    angle: -90,
                                    position: 'center',
                                    dx: -20,
                                    style: { fontWeight: 600 }
                                }}
                                tick={{ fontSize: 12 }}
                            />
                            <Tooltip
                                content={<TemperatureTooltip />}
                            />
                            <Legend
                                verticalAlign="bottom"
                                height={50}
                                wrapperStyle={{ paddingTop: '20px' }}
                            />
                            {visibleTempSeries.airTemp && (
                                <Line
                                    type="monotone"
                                    dataKey="Temperatura aerului"
                                    stroke="#2196f3"
                                    strokeWidth={3}
                                    dot={{ r: 5, strokeWidth: 1 }}
                                    activeDot={{ r: 8, stroke: '#2196f3', strokeWidth: 2 }}
                                    isAnimationActive={true}
                                    animationDuration={1000}
                                />
                            )}
                            {visibleTempSeries.dewTemp && (
                                <Line
                                    type="monotone"
                                    dataKey="Temperatura rouă"
                                    stroke="#4caf50"
                                    strokeWidth={3}
                                    dot={{ r: 5, strokeWidth: 1 }}
                                    activeDot={{ r: 8, stroke: '#4caf50', strokeWidth: 2 }}
                                    isAnimationActive={true}
                                    animationDuration={1000}
                                    animationBegin={400}
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

            {/* Explicații despre tipurile de temperatură */}
            <Box className="temp-explanation-section" sx={{
                mt: 4,
                pt: 3,
                borderTop: '1px dashed rgba(0, 0, 0, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                gap: 2
            }}>
                <Typography variant="h6" sx={{
                    fontWeight: 'bold',
                    color: '#1e293b',
                    fontSize: '1.1rem',
                    mb: 1
                }}>
                    Ce reprezintă aceste temperaturi?
                </Typography>

                <Box className="temp-explanation-card" sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    gap: 3
                }}>
                    <Paper elevation={1} sx={{
                        flex: 1,
                        p: 2.5,
                        borderRadius: '10px',
                        borderLeft: '4px solid #2196f3',
                        backgroundColor: 'rgba(33, 150, 243, 0.05)'
                    }}>
                        <Typography variant="subtitle1" sx={{
                            fontWeight: 'bold',
                            color: '#2196f3',
                            mb: 1,
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                            <Box sx={{
                                width: 12,
                                height: 12,
                                borderRadius: '50%',
                                backgroundColor: '#2196f3',
                                mr: 1
                            }}></Box>
                            Temperatura aerului
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#333' }}>
                            Reprezintă temperatura aerului măsurată la exterior, exprimată în grade Celsius.
                            Este temperatura ambientală obișnuită și are un impact direct asupra cererii de încălzire sau răcire a clădirilor HVAC.
                        </Typography>
                    </Paper>

                    <Paper elevation={1} sx={{
                        flex: 1,
                        p: 2.5,
                        borderRadius: '10px',
                        borderLeft: '4px solid #4caf50',
                        backgroundColor: 'rgba(76, 175, 80, 0.05)'
                    }}>
                        <Typography variant="subtitle1" sx={{
                            fontWeight: 'bold',
                            color: '#4caf50',
                            mb: 1,
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                            <Box sx={{
                                width: 12,
                                height: 12,
                                borderRadius: '50%',
                                backgroundColor: '#4caf50',
                                mr: 1
                            }}></Box>
                            Temperatura punctului de rouă
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#333' }}>
                            Reprezintă temperatura la care aerul trebuie răcit (fără schimbare de presiune) pentru ca vaporii de apă din aer să se condenseze în picături.
                            Este tot în grade Celsius și are legătură cu umiditatea: cu cât temperatura punctului de rouă este mai apropiată de temperatura aerului, cu atât umiditatea este mai mare.
                        </Typography>
                    </Paper>
                </Box>

                <Paper elevation={1} sx={{
                    p: 2.5,
                    mt: 1,
                    borderRadius: '10px',
                    backgroundColor: 'rgba(0, 0, 0, 0.02)',
                    border: '1px solid rgba(0, 0, 0, 0.05)'
                }}>
                    <Typography variant="subtitle1" sx={{
                        fontWeight: 'bold',
                        mb: 1,
                        color: '#1e293b'
                    }}>
                        Importanța în modelul LSTM
                    </Typography>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1
                    }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Box sx={{
                                minWidth: 6,
                                minHeight: 6,
                                borderRadius: '50%',
                                backgroundColor: '#1e293b'
                            }}></Box>
                            <Typography variant="body2">
                                <strong>Temperatura aerului</strong> afectează direct cererea energetică a sistemului HVAC (mai rece = nevoie de încălzire; mai cald = nevoie de răcire).
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Box sx={{
                                minWidth: 6,
                                minHeight: 6,
                                borderRadius: '50%',
                                backgroundColor: '#1e293b'
                            }}></Box>
                            <Typography variant="body2">
                                <strong>Temperatura rouă</strong> oferă context despre nivelul de umiditate relativă, ceea ce influențează și ventilația și performanța echipamentelor HVAC (de ex., dezumidificatoare, schimbătoare de căldură).
                            </Typography>
                        </Box>
                    </Box>
                </Paper>
            </Box>
        </Paper>
    );
};

export default TemperatureChart; 