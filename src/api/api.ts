import axios from 'axios';

export const getBuildings = async () => {
    const response = await axios.get('http://127.0.0.1:5000/buildings');
    return response.data.buildings;
};

export const getBuildingData = async (buildingName: string) => {
    const response = await axios.get(`http://127.0.0.1:5000/baseline-dataset/${buildingName}`);
    return response.data.data;
}; 