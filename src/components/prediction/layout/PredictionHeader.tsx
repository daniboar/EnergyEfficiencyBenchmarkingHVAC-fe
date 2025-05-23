import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import { useNavigate } from 'react-router-dom';

interface PredictionHeaderProps {
    buildingName: string;
    targetDate: string;
    onGoBack: () => void;
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

const PredictionHeader: React.FC<PredictionHeaderProps> = ({
    buildingName,
    targetDate,
    onGoBack,
}) => {
    const { dataFormatata, ziuaSaptamanii, anotimp } = formatareData(targetDate);
    const navigate = useNavigate();

    const handleOptimizationClick = () => {
        navigate(`/optimization/${buildingName}/${targetDate}`);
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
                    onClick={onGoBack}
                    variant="outlined"
                    startIcon={<ArrowBackIcon />}
                    className="prediction-back-btn"
                    size="large"
                >
                    Înapoi la Dashboard
                </Button>
                <Typography variant="h4" component="h1" sx={{
                    fontWeight: '600 !important',
                    color: '#164796',
                    textAlign: 'center',
                    flexGrow: 1
                }}>
                    Predicție LSTM pentru Consumul Energetic
                </Typography>
                <Button
                    onClick={handleOptimizationClick}
                    variant="contained"
                    endIcon={<CompareArrowsIcon />}
                    className="optimizers-button"
                    size="large"
                >
                    Vezi Optimizatori
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

export default PredictionHeader; 