import React from 'react';

interface TemperatureTooltipProps {
    active?: boolean;
    payload?: any[];
    label?: string;
}

const TemperatureTooltip: React.FC<TemperatureTooltipProps> = ({ active, payload, label }) => {
    if (!active || !payload || !payload.length) return null;

    return (
        <div className="prediction-tooltip">
            <p className="tooltip-label"><strong>Ora:</strong> {label}</p>
            {payload.map((entry: any, index: number) => (
                <p key={`item-${index}`} style={{ color: entry.color }}>
                    <strong>{entry.name}:</strong> {entry.value.toFixed(1)}°C
                </p>
            ))}
        </div>
    );
};

export default TemperatureTooltip; 