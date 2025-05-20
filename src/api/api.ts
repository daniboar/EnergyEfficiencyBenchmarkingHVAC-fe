const API_URL = 'http://127.0.0.1:5000';

export interface ConsumptionData {
  acoOptimization: number;
  baseline: number;
  gaOptimization: number;
  prediction: number;
  psoOptimization: number;
  real: number;
}

export interface HourData {
  airTemperature: number;
  consumption: ConsumptionData;
  dewTemperature: number;
  hour: number;
}

export interface PredictionProfile {
  building_name: string;
  mae: number;
  mse: number;
  r2: number;
  smape: number;
  target_date: string;
  values: HourData[];
}

export const getBuildings = async () => {
    try {
        const response = await fetch(`${API_URL}/buildings`);
        
        if (!response.ok) {
            throw new Error(`Eroare la obtinerea cladirilor: ${response.status}`);
        }
        
        const data = await response.json();
        return data.buildings;
    } catch (error) {
        console.error("Eroare la obtinerea cladirilor:", error);
        throw error;
    }
};

export const getBuildingData = async (buildingName: string) => {
    try {
        const response = await fetch(`${API_URL}/baseline-dataset/${buildingName}`);
        
        if (!response.ok) {
            throw new Error(`Eroare la obtinerea datelor pentru cladire: ${response.status}`);
        }
        
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("Eroare la obtinerea datelor pentru cladire:", error);
        throw error;
    }
};

export const generatePrediction = async (buildingName: string, targetDate: string): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/predict/${buildingName}/${targetDate}`, {
      method: 'POST',
    });
    
    if (!response.ok) {
      throw new Error(`Eroare la generarea predictiei: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Eroare la generarea predictiei:", error);
    throw error;
  }
}; 

export const getPredictionProfile = async (buildingName: string, targetDate: string): Promise<PredictionProfile> => {
  try {
    const response = await fetch(`${API_URL}/profile-consumption/${buildingName}/${targetDate}`);
    
    if (!response.ok) {
      throw new Error(`Eroare la obtinerea profilului de predicție: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Eroare la obtinerea profilului de predicție:", error);
    throw error;
  }
};