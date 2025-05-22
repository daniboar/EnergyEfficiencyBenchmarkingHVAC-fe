import React from 'react';
import { Box, FormControl, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';

interface DashboardControlsProps {
    buildings: string[];
    selectedBuilding: string;
    selectedDate: Date | undefined;
    minDate: Date | undefined;
    maxDate: Date | undefined;
    onBuildingChange: (event: SelectChangeEvent) => void;
    onDateChange: (date: Date | null) => void;
    onResetDate: () => void;
}

const DashboardControls: React.FC<DashboardControlsProps> = ({
    buildings,
    selectedBuilding,
    selectedDate,
    minDate,
    maxDate,
    onBuildingChange,
    onDateChange,
    onResetDate
}) => {
    const navigate = useNavigate();

    const navigateToPrediction = () => {
        if (selectedBuilding && selectedDate) {
            const formattedDate = selectedDate.toISOString().split('T')[0];
            navigate(`/prediction/${selectedBuilding}/${formattedDate}`);
        }
    };

    return (
        <Box className="dashboard-controls">
            <FormControl className="dashboard-select" size="medium">
                <Select
                    id="building-select"
                    value={selectedBuilding}
                    onChange={onBuildingChange}
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
                    onChange={onDateChange}
                    dateFormat="yyyy-MM-dd"
                    minDate={minDate}
                    maxDate={maxDate}
                    placeholderText="Selectează o dată"
                    isClearable
                    customInput={<input className="dashboard-datepicker-input" />}
                />
            </Box>
            <button className="dashboard-btn" onClick={onResetDate} disabled={!selectedDate}>
                Resetează data
            </button>

            <button
                className="dashboard-prediction-btn"
                onClick={navigateToPrediction}
                disabled={!selectedBuilding || !selectedDate}
            >
                Vizualizează predicția pentru ziua selectată
            </button>
        </Box>
    );
};

export default DashboardControls; 