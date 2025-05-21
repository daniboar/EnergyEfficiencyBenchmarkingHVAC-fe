import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Paper, Button, CircularProgress, Divider } from '@mui/material';
import { getPredictionProfile, generatePrediction, PredictionProfile } from '../../api/api';
import './Prediction.css';
import RefreshIcon from '@mui/icons-material/Refresh';
import PredictionHeader from './layout/PredictionHeader';
import MetricsPanel from './metrics/MetricsPanel';
import ConsumptionChart from './charts/ConsumptionChart';
import TemperatureChart from './charts/TemperatureChart';
import ConsumptionBarChart from './charts/ConsumptionBarChart';

const Prediction: React.FC = () => {
    const { buildingName = '', targetDate = '' } = useParams<{ buildingName: string, targetDate: string }>();
    const navigate = useNavigate();
    const [predictionData, setPredictionData] = useState<PredictionProfile | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [generatingPrediction, setGeneratingPrediction] = useState<boolean>(false);
    const [visibleSeries, setVisibleSeries] = useState({
        real: true,
        baseline: true,
        prediction: true
    });
    const [visibleTempSeries, setVisibleTempSeries] = useState({
        airTemp: true,
        dewTemp: true
    });

    const fetchPredictionData = useCallback(async () => {
        if (!buildingName || !targetDate) {
            setError('Lipsesc parametrii');
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const cacheKey = `prediction_${buildingName}_${targetDate}`;
            const cachedData = localStorage.getItem(cacheKey);

            if (cachedData) {
                try {
                    setPredictionData(JSON.parse(cachedData));
                } catch (err) {
                    console.error('Eroare la parsarea datelor din cache:', err);
                    localStorage.removeItem(cacheKey);

                    const data = await getPredictionProfile(buildingName, targetDate);
                    if (data) {
                        setPredictionData(data);
                        localStorage.setItem(cacheKey, JSON.stringify(data));
                    }
                }
            } else {
                const data = await getPredictionProfile(buildingName, targetDate);
                if (data) {
                    setPredictionData(data);
                    localStorage.setItem(cacheKey, JSON.stringify(data));
                }
            }
        } catch (err) {
            console.error('Eroare la preluarea datelor de predictie:', err);
            setError('Nu s-au putut încărca datele de predictie');
            setPredictionData(null);
        } finally {
            setLoading(false);
        }
    }, [buildingName, targetDate]);

    const handleGeneratePrediction = useCallback(async () => {
        if (!buildingName || !targetDate) {
            setError('Parametrii lipsa');
            return;
        }

        try {
            setGeneratingPrediction(true);
            setError(null);

            await generatePrediction(buildingName, targetDate);
            await fetchPredictionData();
        } catch (err) {
            console.error('Eroare la generarea predictiei:', err);
            setError('Nu s-a putut genera predictia');
        } finally {
            setGeneratingPrediction(false);
        }
    }, [buildingName, targetDate, fetchPredictionData]);

    // Verific daca datele sunt in cache
    useEffect(() => {
        if (!buildingName || !targetDate) return;

        const cacheKey = `prediction_${buildingName}_${targetDate}`;
        const cachedData = localStorage.getItem(cacheKey);

        if (cachedData) {
            try {
                const parsedData = JSON.parse(cachedData);
                setPredictionData(parsedData);
                setLoading(false);
            } catch (err) {
                // In caz ca datele din cache sunt corupte
                console.error('Eroare la parsarea datelor din cache:', err);
                localStorage.removeItem(cacheKey);
                handleGeneratePrediction();
            }
        } else {
            handleGeneratePrediction();
        }
    }, [buildingName, targetDate, handleGeneratePrediction]);

    const goBack = () => {
        navigate('/');
    };

    const handleSeriesToggle = (series: 'real' | 'baseline' | 'prediction') => {
        setVisibleSeries(prev => ({
            ...prev,
            [series]: !prev[series]
        }));
    };

    const handleTempSeriesToggle = (series: 'airTemp' | 'dewTemp') => {
        setVisibleTempSeries(prev => ({
            ...prev,
            [series]: !prev[series]
        }));
    };

    if (loading || generatingPrediction) {
        return (
            <Container maxWidth={false} disableGutters className="prediction-bg" sx={{ height: '100vh', width: '100vw', padding: 0 }}>
                <Box className="prediction-loader" sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh'
                }}>
                    <CircularProgress size={60} thickness={5} color="primary" />
                    <Typography variant="h6" sx={{ mt: 2 }}>
                        {generatingPrediction ? 'Se generează predicția, vă rugăm să așteptați...' : 'Se încarcă datele de predicție, vă rugăm să așteptați...'}
                    </Typography>
                </Box>
            </Container>
        );
    }

    return (
        <Container
            maxWidth={false}
            disableGutters
            className="prediction-bg"
            sx={{
                minHeight: '100vh',
                width: '100vw',
                padding: '32px',
                overflow: 'auto'
            }}
        >
            <Box className="prediction-box" sx={{ height: 'auto' }}>
                <Paper
                    elevation={6}
                    className="prediction-paper"
                    sx={{
                        height: 'auto',
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: '12px',
                        overflow: 'hidden'
                    }}
                >
                    <PredictionHeader
                        buildingName={buildingName}
                        targetDate={targetDate}
                        onGoBack={goBack}
                    />

                    {error && (
                        <Box className="prediction-error" sx={{ p: 3, m: 3, borderRadius: '8px' }}>
                            <Typography color="error" variant="h6">{error}</Typography>
                        </Box>
                    )}

                    {predictionData ? (
                        <>
                            <MetricsPanel
                                mse={predictionData.mse}
                                mae={predictionData.mae}
                                smape={predictionData.smape}
                                r2={predictionData.r2}
                            />

                            <Divider sx={{ mx: 3, mb: 4 }} />

                            <Box sx={{ px: 3, mb: 6 }}>
                                {/* Grafic de consum energetic */}
                                <ConsumptionChart
                                    data={predictionData.values}
                                    visibleSeries={visibleSeries}
                                    onSeriesToggle={handleSeriesToggle}
                                />

                                {/* Grafic de temperaturi */}
                                <TemperatureChart
                                    data={predictionData.values}
                                    visibleTempSeries={visibleTempSeries}
                                    onTempSeriesToggle={handleTempSeriesToggle}
                                />

                                {/* Grafic de consum energetic cu bare */}
                                <ConsumptionBarChart
                                    data={predictionData.values}
                                />
                            </Box>
                        </>
                    ) : !loading && !error && (
                        <Box sx={{ p: 5, textAlign: 'center' }}>
                            <Typography variant="h6" color="textSecondary" sx={{ mb: 3 }}>
                                Se generează predicția. Vă rugăm să așteptați...
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleGeneratePrediction}
                                sx={{ mt: 2 }}
                                startIcon={<RefreshIcon />}
                                disabled={generatingPrediction}
                                size="large"
                            >
                                Generează predicție
                            </Button>
                        </Box>
                    )}
                </Paper>
            </Box>
        </Container>
    );
};

export default Prediction; 