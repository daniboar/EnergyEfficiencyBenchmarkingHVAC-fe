import React, { useState } from 'react';
import { Box, Paper, Typography, FormGroup, FormControlLabel, Checkbox, IconButton, Collapse } from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { HourData } from '../../../api/api';
import { formatTempChartData } from '../utils/PredictionUtils';
import TemperatureTooltip from '../layout/TemperatureTooltip';

interface TemperatureChartProps {
    data: HourData[];
    visibleTempSeries: {
        airTemp: boolean;
        dewTemp: boolean;
        windSpeed: boolean;
        windDirection: boolean;
        precipDepth1HR: boolean;
    };
    onTempSeriesToggle: (series: 'airTemp' | 'dewTemp' | 'windSpeed' | 'windDirection' | 'precipDepth1HR') => void;
}

const TemperatureChart: React.FC<TemperatureChartProps> = ({
    data,
    visibleTempSeries,
    onTempSeriesToggle
}) => {
    const chartData = formatTempChartData(data);
    const [expanded, setExpanded] = useState(false);

    const handleExpand = () => {
        setExpanded(!expanded);
    };

    const calculateTotalPrecipitation = () => {
        if (!data || data.length === 0) return 0;
        return data.reduce((total, item) => {
            const precipValue = item.precipDepth1HR || 0;
            return total + (precipValue < 0 ? 0 : precipValue);
        }, 0);
    };

    const totalPrecipitation = calculateTotalPrecipitation();

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
                Date meteorologice pe ore
            </Typography>

            <FormGroup row sx={{ mb: 3, gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
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
                <FormControlLabel
                    control={<Checkbox
                        checked={visibleTempSeries.windSpeed}
                        onChange={() => onTempSeriesToggle('windSpeed')}
                        sx={{ '&.Mui-checked': { color: '#ff9800' } }}
                    />}
                    label="Viteza vântului"
                    sx={{ '& .MuiFormControlLabel-label': { color: '#ff9800', fontWeight: 600 } }}
                />
                <FormControlLabel
                    control={<Checkbox
                        checked={visibleTempSeries.windDirection}
                        onChange={() => onTempSeriesToggle('windDirection')}
                        sx={{ '&.Mui-checked': { color: '#9c27b0' } }}
                    />}
                    label="Direcția vântului"
                    sx={{ '& .MuiFormControlLabel-label': { color: '#9c27b0', fontWeight: 600 } }}
                />
                <FormControlLabel
                    control={<Checkbox
                        checked={visibleTempSeries.precipDepth1HR}
                        onChange={() => onTempSeriesToggle('precipDepth1HR')}
                        sx={{ '&.Mui-checked': { color: '#00bcd4' } }}
                    />}
                    label="Precipitații"
                    sx={{ '& .MuiFormControlLabel-label': { color: '#00bcd4', fontWeight: 600 } }}
                />
            </FormGroup>

            {chartData.length > 0 ? (
                <>
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
                                        value: 'Valori meteorologice',
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
                                {visibleTempSeries.windSpeed && (
                                    <Line
                                        type="monotone"
                                        dataKey="Viteza vântului"
                                        stroke="#ff9800"
                                        strokeWidth={3}
                                        dot={{ r: 5, strokeWidth: 1 }}
                                        activeDot={{ r: 8, stroke: '#ff9800', strokeWidth: 2 }}
                                        isAnimationActive={true}
                                        animationDuration={1000}
                                        animationBegin={600}
                                    />
                                )}
                                {visibleTempSeries.windDirection && (
                                    <Line
                                        type="monotone"
                                        dataKey="Direcția vântului"
                                        stroke="#9c27b0"
                                        strokeWidth={3}
                                        dot={{ r: 5, strokeWidth: 1 }}
                                        activeDot={{ r: 8, stroke: '#9c27b0', strokeWidth: 2 }}
                                        isAnimationActive={true}
                                        animationDuration={1000}
                                        animationBegin={800}
                                    />
                                )}
                                {visibleTempSeries.precipDepth1HR && (
                                    <Line
                                        type="monotone"
                                        dataKey="Precipitații"
                                        stroke="#00bcd4"
                                        strokeWidth={3}
                                        dot={{ r: 5, strokeWidth: 1 }}
                                        activeDot={{ r: 8, stroke: '#00bcd4', strokeWidth: 2 }}
                                        isAnimationActive={true}
                                        animationDuration={1000}
                                        animationBegin={1000}
                                    />
                                )}
                            </LineChart>
                        </ResponsiveContainer>
                    </Box>

                    {/* box pentru totalul precipitatiilor */}
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'flex-end',
                        justifyContent: 'flex-end',
                        mt: -13
                    }}>
                        <Paper elevation={2} sx={{
                            p: 1,
                            borderRadius: '10px',
                            backgroundColor: 'rgba(0, 188, 212, 0.1)',
                            border: '1px solid rgba(0, 188, 212, 0.3)',
                            minWidth: '160px',
                            textAlign: 'center'
                        }}>
                            <Typography variant="subtitle2" sx={{
                                fontWeight: 'bold',
                                color: '#00bcd4',
                                fontSize: '0.9rem',
                                mb: 0.5
                            }}>
                                💧 Cantitatea de precipitații în această zi
                            </Typography>
                            <Typography variant="h5" sx={{
                                fontWeight: 'bold',
                                color: '#00bcd4',
                                fontSize: '1rem'
                            }}>
                                {totalPrecipitation.toFixed(1)} mm
                            </Typography>
                        </Paper>
                    </Box>
                </>
            ) : (
                <Typography color="textSecondary" sx={{ textAlign: 'center', py: 5 }}>
                    Nu există date pentru grafic
                </Typography>
            )}

            <Box className="temp-explanation-section" sx={{
                mt: 4,
                pt: 3,
                borderTop: '1px dashed rgba(0, 0, 0, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                gap: 2
            }}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer'
                }} onClick={handleExpand}>
                    <Typography variant="h6" sx={{
                        fontWeight: 'bold',
                        color: '#1e293b',
                        fontSize: '1.1rem',
                        mb: 1
                    }}>
                        Ce reprezintă aceste date meteorologice?
                    </Typography>
                    <IconButton
                        onClick={handleExpand}
                        sx={{
                            color: '#1e293b',
                            '&:hover': { backgroundColor: 'rgba(30, 41, 59, 0.1)' }
                        }}
                    >
                        {expanded ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                </Box>

                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <Box className="temp-explanation-card" sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                        gap: 3,
                        mt: 2
                    }}>
                        <Paper elevation={1} sx={{
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

                        <Paper elevation={1} sx={{
                            p: 2.5,
                            borderRadius: '10px',
                            borderLeft: '4px solid #ff9800',
                            backgroundColor: 'rgba(255, 152, 0, 0.05)'
                        }}>
                            <Typography variant="subtitle1" sx={{
                                fontWeight: 'bold',
                                color: '#ff9800',
                                mb: 1,
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                                <Box sx={{
                                    width: 12,
                                    height: 12,
                                    borderRadius: '50%',
                                    backgroundColor: '#ff9800',
                                    mr: 1
                                }}></Box>
                                Viteza vântului
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#333' }}>
                                Măsurată în metri pe secundă (m/s), viteza vântului are un impact asupra transferului de căldură prin procesul de convecție.
                                Vântul puternic poate crește pierderile de căldură ale clădirii și poate afecta eficiența sistemelor HVAC.
                            </Typography>
                        </Paper>

                        <Paper elevation={1} sx={{
                            p: 2.5,
                            borderRadius: '10px',
                            borderLeft: '4px solid #9c27b0',
                            backgroundColor: 'rgba(156, 39, 176, 0.05)'
                        }}>
                            <Typography variant="subtitle1" sx={{
                                fontWeight: 'bold',
                                color: '#9c27b0',
                                mb: 1,
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                                <Box sx={{
                                    width: 12,
                                    height: 12,
                                    borderRadius: '50%',
                                    backgroundColor: '#9c27b0',
                                    mr: 1
                                }}></Box>
                                Direcția vântului
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#333' }}>
                                Exprimată în grade (0-360°), direcția vântului poate influența modul în care clădirea este expusă la vânt.
                                Anumite orientări pot cauza mai multe pierderi de căldură sau pot afecta ventilația naturală.
                            </Typography>
                        </Paper>

                        <Paper elevation={1} sx={{
                            p: 2.5,
                            borderRadius: '10px',
                            borderLeft: '4px solid #00bcd4',
                            backgroundColor: 'rgba(0, 188, 212, 0.05)',
                            gridColumn: { xs: '1', md: '1 / -1' }
                        }}>
                            <Typography variant="subtitle1" sx={{
                                fontWeight: 'bold',
                                color: '#00bcd4',
                                mb: 1,
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                                <Box sx={{
                                    width: 12,
                                    height: 12,
                                    borderRadius: '50%',
                                    backgroundColor: '#00bcd4',
                                    mr: 1
                                }}></Box>
                                Precipitații (1 oră)
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#333' }}>
                                Măsurate în milimetri (mm), precipitațiile pe oră pot afecta temperatura percepută și umiditatea.
                                Ploaia poate reduce temperatura exterioară și poate influența cererea de răcire sau încălzire.
                            </Typography>
                        </Paper>
                    </Box>
                </Collapse>
            </Box>
        </Paper>
    );
};

export default TemperatureChart; 