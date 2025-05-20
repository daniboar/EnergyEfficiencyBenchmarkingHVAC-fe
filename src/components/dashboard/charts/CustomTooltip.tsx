import React from 'react';
import { CustomTooltipProps } from '../types/DashboardTypes';

interface ExtendedTooltipProps extends CustomTooltipProps {
    selectedDate: Date | undefined;
}

const CustomTooltip: React.FC<ExtendedTooltipProps> = ({ active, payload, label, selectedDate }) => {
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
                <div><b>Ora:</b> {label?.split(' ')[1] || data.timestamp.split(' ')[1]}</div>
                <div><b>Consum Real:</b> {data.real} kWh</div>
                <div><b>Baseline:</b> {data.baseline} kWh</div>
            </div>
        );
    }
};

export default CustomTooltip; 