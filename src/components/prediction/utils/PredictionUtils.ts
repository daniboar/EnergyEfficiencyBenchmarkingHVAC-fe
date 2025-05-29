import { HourData } from '../../../api/api';

export const formatChartData = (data: HourData[]) => {
    if (!data || data.length === 0) return [];

    return data.map(item => ({
        hour: `${item.hour}:00`,
        Real: item.consumption.real,
        Baseline: item.consumption.baseline,
        Predicție: item.consumption.prediction,
        AirTemp: item.airTemperature,
        DewTemp: item.dewTemperature
    }));
};

export const formatTempChartData = (data: HourData[]) => {
    if (!data || data.length === 0) return [];

    return data.map(item => ({
        hour: `${item.hour}:00`,
        'Temperatura aerului': item.airTemperature,
        'Temperatura rouă': item.dewTemperature,
        'Viteza vântului': item.windSpeed,
        'Direcția vântului': item.windDirection,
        'Precipitații': item.precipDepth1HR < 0 ? 0 : item.precipDepth1HR
    }));
};

export const formatBarChartData = (data: HourData[]) => {
    if (!data || data.length === 0) return [];

    return data.map(item => ({
        hour: `${item.hour}:00`,
        consum: item.consumption.real,
    }));
};

// Calculez min, max si media consumului
export const getMinMaxConsumption = (data: HourData[]) => {
    if (!data || data.length === 0) return { min: 0, max: 0, avg: 0 };

    const baselineValues = data.map(item => item.consumption.baseline);
    
    return {
        min: Math.min(...baselineValues),
        max: Math.max(...baselineValues),
        avg: baselineValues.reduce((sum, val) => sum + val, 0) / baselineValues.length
    };
};

// Culorile pentru graficul de bare
export const getBarColor = (value: number, minValue: number, maxValue: number) => {
    const ratio = (value - minValue) / (maxValue - minValue || 1);

    if (ratio < 0.25) return '#2ecc71'; // verde
    if (ratio < 0.5) return '#f39c12';  // galben
    if (ratio < 0.75) return '#e67e22'; // portocaliu
    return '#e74c3c';                   // roșu
};

// Formatare numar pentru afisare metrici
export const formatNumber = (num: number) => {
    return num ? num.toFixed(4) : '0.0000';
}; 