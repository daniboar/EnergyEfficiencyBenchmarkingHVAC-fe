import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/dashboard/Dashboard';
import Prediction from './components/prediction/Prediction';
import { Optimization } from './components/optimization';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#8e24aa',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/prediction/:buildingName/:targetDate" element={<Prediction />} />
        <Route path="/optimization/:buildingName/:targetDate" element={<Optimization />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
