import React from 'react';

interface TemperatureTooltipProps {
    active?: boolean;
    payload?: any[];
    label?: string;
}

const TemperatureTooltip: React.FC<TemperatureTooltipProps> = ({ active, payload, label }) => {
    if (!active || !payload || !payload.length) return null;

    const getUnit = (name: string) => {
        if (name.includes('Temperatura')) return '°C';
        if (name.includes('Viteza vântului')) return ' m/s';
        if (name.includes('Direcția vântului')) return '°';
        if (name.includes('Precipitații')) return ' mm';
        return '';
    };

    return (
        <div className="prediction-tooltip">
            <p className="tooltip-label"><strong>Ora:</strong> {label}</p>
            {payload.map((entry: any, index: number) => (
                <p key={`item-${index}`} style={{ color: entry.color }}>
                    <strong>{entry.name}:</strong> {entry.value.toFixed(1)}{getUnit(entry.name)}
                </p>
            ))}
        </div>
    );
};

export default TemperatureTooltip; 