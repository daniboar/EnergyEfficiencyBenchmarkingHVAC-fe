import React from 'react';

interface CustomTooltipProps {
    active?: boolean;
    payload?: any[];
    label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="prediction-tooltip">
                <p className="tooltip-label"><strong>Ora:</strong> {label}</p>
                {payload.map((entry: any, index: number) => (
                    <p key={`item-${index}`} style={{ color: entry.color }}>
                        <strong>{entry.name}:</strong> {entry.value.toFixed(2)} kWh
                    </p>
                ))}
                {payload[0]?.payload.AirTemp !== undefined && (
                    <p><strong>Temperatura aer:</strong> {payload[0]?.payload.AirTemp}°C</p>
                )}
                {payload[0]?.payload.DewTemp !== undefined && (
                    <p><strong>Temperatura rouă:</strong> {payload[0]?.payload.DewTemp}°C</p>
                )}
            </div>
        );
    }
    return null;
};

export default CustomTooltip; 