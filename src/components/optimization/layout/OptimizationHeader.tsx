import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';

interface OptimizationHeaderProps {
    buildingName: string;
    targetDate: string;
}

// Functie pentru a formata data in formatul dorit
const formatareData = (dataString: string) => {
    if (!dataString) return { dataFormatata: '', ziuaSaptamanii: '', anotimp: '' };

    const data = new Date(dataString);

    const luni = [
        'ianuarie', 'februarie', 'martie', 'aprilie', 'mai', 'iunie',
        'iulie', 'august', 'septembrie', 'octombrie', 'noiembrie', 'decembrie'
    ];

    const zileSaptamanii = [
        'Duminică', 'Luni', 'Marți', 'Miercuri', 'Joi', 'Vineri', 'Sâmbătă'
    ];

    const determinareSeason = (month: number) => {
        if (month >= 2 && month <= 4) return 'Primăvară';
        if (month >= 5 && month <= 7) return 'Vară';
        if (month >= 8 && month <= 10) return 'Toamnă';
        return 'Iarnă';
    };

    const zi = data.getDate();
    const luna = data.getMonth();
    const an = data.getFullYear();
    const ziuaSaptamanii = zileSaptamanii[data.getDay()];
    const anotimp = determinareSeason(luna);

    return {
        dataFormatata: `${zi} ${luni[luna]} ${an}`,
        ziuaSaptamanii,
        anotimp
    };
};

const OptimizationHeader: React.FC<OptimizationHeaderProps> = ({
    buildingName,
    targetDate,
}) => {
    const { dataFormatata, ziuaSaptamanii, anotimp } = formatareData(targetDate);
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(`/prediction/${buildingName}/${targetDate}`);
    };

    const handleDashboard = () => {
        navigate('/');
    };

    return (
        <>
            <Box className="prediction-header" sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%'
            }}>
                <Button
                    onClick={handleBack}
                    variant="outlined"
                    startIcon={<ArrowBackIcon />}
                    className="prediction-back-btn"
                    size="large"
                >
                    Înapoi la Predicție
                </Button>
                <Typography variant="h4" component="h1" sx={{
                    fontWeight: '600 !important',
                    color: '#673ab7',
                    textAlign: 'center',
                    flexGrow: 1
                }}>
                    Analiza Comparativă a Optimizatorilor
                </Typography>
                <Button
                    onClick={handleDashboard}
                    variant="contained"
                    startIcon={<HomeIcon />}
                    className="dashboard-button"
                    size="large"
                >
                    Dashboard
                </Button>
            </Box>

            <Box className="prediction-info">
                <Typography variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
                    <strong>Clădire:</strong>
                    <span className="info-value">{buildingName || 'Nedefinit'}</span>
                </Typography>
                <Typography variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
                    <strong>Data:</strong>
                    <span className="info-value">{dataFormatata || 'Nedefinit'}</span>
                </Typography>
                <Typography variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
                    <strong>Ziua săptămânii:</strong>
                    <span className="info-value">{ziuaSaptamanii}</span>
                </Typography>
                <Typography variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
                    <strong>Anotimp:</strong>
                    <span className="info-value">{anotimp}</span>
                </Typography>
            </Box>
        </>
    );
};

export default OptimizationHeader; 