import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Typography,
    FormControl,
    Select,
    MenuItem,
    SelectChangeEvent,
    Paper
} from '@mui/material';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getBuildings, getBuildingData } from '../../api/api';
import './Dashboard.css';
import CircularProgress from '@mui/material/CircularProgress';

interface DataPoint {
    baseline: number;
    real: number;
    timestamp: string;
}

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
                console.error('Eroare la încărcarea clădirilor:', error);
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
                setError('Eroare la încărcarea datelor pentru clădire.');
                setData([]);
                setMinDate(undefined);
                setMaxDate(undefined);
            })
            .finally(() => setLoading(false));
    }, [selectedBuilding]);

    const handleBuildingChange = (event: SelectChangeEvent) => {
        setSelectedBuilding(event.target.value);
    };

    // Filtrare date după data selectata (sau toate daca nu e selectata data)
    const filteredData = selectedDate
        ? data.filter((d) => {
            const dataDate = new Date(d.timestamp);
            return (
                dataDate.getFullYear() === selectedDate.getFullYear() &&
                dataDate.getMonth() === selectedDate.getMonth() &&
                dataDate.getDate() === selectedDate.getDate()
            );
        })
        : data;

    const handleResetDate = () => {
        setSelectedDate(undefined);
    };

    // Formatter pentru axa X
    const xTickFormatter = (tick: string) => {
        if (!selectedDate) return tick.split(' ')[0]; // doar data
        // doar ora
        const parts = tick.split(' ');
        return parts[1] || tick;
    };

    // Extrage tipul cladirii din nume (ex: Office, Assembly, Education)
    const getBuildingType = (name: string) => {
        if (!name) return '';
        const parts = name.split('_');
        return parts.length > 1 ? parts[1].charAt(0).toUpperCase() + parts[1].slice(1) : '';
    };

    // Returnează numele zilei pentru o dată
    const getDayName = (date: Date | undefined) => {
        if (!date) return '';
        const zile = ['Duminică', 'Luni', 'Marți', 'Miercuri', 'Joi', 'Vineri', 'Sâmbătă'];
        return zile[date.getDay()];
    };

    // Custom Tooltip
    const CustomTooltip = ({ active, payload, label }: any) => {
        if (!active || !payload || !payload.length) return null;
        const data = payload[0].payload;
        if (!selectedDate) {
            // Tooltip complet cand nu e selectata data
            return (
                <div className="dashboard-tooltip">
                    <div><b>Timestamp:</b> {data.timestamp}</div>
                    <div><b>Consum Real:</b> {data.real} kWh</div>
                    <div><b>Baseline:</b> {data.baseline} kWh</div>
                </div>
            );
        } else {
            // Tooltip implicit (ora, real, baseline)
            return (
                <div className="dashboard-tooltip">
                    <div><b>Ora:</b> {label.split(' ')[1]}</div>
                    <div><b>Consum Real:</b> {data.real} kWh</div>
                    <div><b>Baseline:</b> {data.baseline} kWh</div>
                </div>
            );
        }
    };

    // Custom Legend
    const CustomLegend = () => (
        <div className="dashboard-legend">
            <span className="legend-box legend-real"></span> Consum Real
            <span className="legend-box legend-baseline"></span> Baseline
            {selectedBuilding && (
                <>
                    <span className="legend-type-badge">Tipul clădirii: <b>{getBuildingType(selectedBuilding)}</b></span>
                    {selectedDate && (
                        <span className="legend-day-badge">Ziua selectată: <b>{getDayName(selectedDate)}</b></span>
                    )}
                </>
            )}
        </div>
    );

    return (
        <Container maxWidth="xl" className="dashboard-bg">
            <Box className="dashboard-box">
                <Paper elevation={6} className="dashboard-paper">
                    <Typography variant="h4" component="h1" gutterBottom className="dashboard-title">
                        Dashboard Eficiență Energetică HVAC
                    </Typography>
                    <Typography variant="subtitle1" className="dashboard-subtitle">
                        Selectează clădirea pentru a vedea consumul pe toată perioada sau selectează o dată din calendar.
                    </Typography>
                    <Box className="dashboard-controls">
                        <FormControl className="dashboard-select" size="medium">
                            <Select
                                id="building-select"
                                value={selectedBuilding}
                                onChange={handleBuildingChange}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Numele Clădirii' }}
                                className="dashboard-select-inner"
                            >
                                <MenuItem value="" disabled>
                                    <span className="dashboard-select-placeholder">Selectează clădirea</span>
                                </MenuItem>
                                {buildings.map((building) => (
                                    <MenuItem key={building} value={building}>
                                        {building}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Box className="dashboard-datepicker">
                            <DatePicker
                                selected={selectedDate}
                                onChange={(date: Date | null) => setSelectedDate(date || undefined)}
                                dateFormat="yyyy-MM-dd"
                                minDate={minDate}
                                maxDate={maxDate}
                                placeholderText="Alege o dată (opțional)"
                                isClearable
                                customInput={<input className="dashboard-datepicker-input" />}
                            />
                        </Box>
                        <button className="dashboard-btn" onClick={handleResetDate} disabled={!selectedDate}>
                            Resetează data
                        </button>
                    </Box>
                    <Box className="dashboard-chart-container">
                        {loading && (
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200 }}>
                                <CircularProgress size={60} thickness={5} color="primary" />
                            </div>
                        )}
                        {error && <Typography color="error">{error}</Typography>}
                        {!loading && !error && selectedBuilding && filteredData.length === 0 && (
                            <Typography color="text.secondary">Nu există date pentru această zi.</Typography>
                        )}
                        {!loading && !error && filteredData.length > 0 && (
                            <ResponsiveContainer width="100%" height={500}>
                                <LineChart data={filteredData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                                    <XAxis
                                        dataKey="timestamp"
                                        tickFormatter={xTickFormatter}
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
                                    <Tooltip content={CustomTooltip} />
                                    <Legend content={CustomLegend} />
                                    <Line type="monotone" dataKey="real" stroke="#1976d2" dot={false} name="Consum Real" strokeWidth={2} />
                                    <Line type="monotone" dataKey="baseline" stroke="#ffa726" dot={false} name="Baseline" strokeDasharray="5 5" strokeWidth={2} />
                                </LineChart>
                            </ResponsiveContainer>
                        )}
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
};

export default Dashboard; 