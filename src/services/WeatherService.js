import axios from 'axios';

const API_KEY = '541de88e1a4dcdf1734f295ca7218870';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const getWeather = async (city) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric',  // For Celsius
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};