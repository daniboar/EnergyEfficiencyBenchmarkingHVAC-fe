import { useState, useEffect } from 'react';
import { getPredictionProfile, PredictionProfile } from '../../../api/api';

export interface OptimizationDataState {
  data: PredictionProfile | null;
  loading: boolean;
  error: string | null;
}

// Hook pentru preluarea datelor de optimizare
export const useOptimizationData = (buildingName: string, targetDate: string): OptimizationDataState => {
  const [state, setState] = useState<OptimizationDataState>({
    data: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!buildingName || !targetDate) {
        setState({
          data: null,
          loading: false,
          error: 'Parametrii lipsă'
        });
        return;
      }

      try {
        setState(prev => ({ ...prev, loading: true, error: null }));

        const cacheKey = `prediction_${buildingName}_${targetDate}`;
        const cachedData = localStorage.getItem(cacheKey);

        if (cachedData) {
          try {
            const parsedData = JSON.parse(cachedData);
            setState({
              data: parsedData,
              loading: false,
              error: null
            });
          } catch (err) {
            console.error('Eroare la parsarea datelor din cache:', err);
            localStorage.removeItem(cacheKey);

            const data = await getPredictionProfile(buildingName, targetDate);
            setState({
              data,
              loading: false,
              error: null
            });
            localStorage.setItem(cacheKey, JSON.stringify(data));
          }
        } else {
          const data = await getPredictionProfile(buildingName, targetDate);
          setState({
            data,
            loading: false,
            error: null
          });
          localStorage.setItem(cacheKey, JSON.stringify(data));
        }
      } catch (err) {
        console.error('Eroare la preluarea datelor de optimizare:', err);
        setState({
          data: null,
          loading: false,
          error: 'Nu s-au putut încărca datele de optimizare.'
        });
      }
    };

    fetchData();
  }, [buildingName, targetDate]);

  return state;
};

export default useOptimizationData; 