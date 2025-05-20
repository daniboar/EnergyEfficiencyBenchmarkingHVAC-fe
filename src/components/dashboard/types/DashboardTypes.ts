export interface DataPoint {
    baseline: number;
    real: number;
    timestamp: string;
}

export interface CustomTooltipProps {
    active?: boolean;
    payload?: any[];
    label?: string;
}

export interface CustomLegendProps {
    selectedBuilding: string;
    selectedDate: Date | undefined;
    getBuildingType: (name: string) => string;
    getDayName: (date: Date | undefined) => string;
} 