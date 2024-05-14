"use server";
import { forecastSchema } from '@/types/forecast';
import ky from 'ky';

const getForecast = async (lat: string, lon: string) => {
  const apiKey = process.env.WEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  const response = await ky.get(url).json();
  const parsedResponse = forecastSchema.parse(response);
  
  // Grouping forecast data by day
  const groupedByDay = parsedResponse.list.reduce((acc: Record<string, typeof parsedResponse.list>, item) => {
    const date = new Date(item.dt * 1000).toISOString().split('T')[0]; 
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {});

  return {
    ...parsedResponse,
    list: groupedByDay
  };
};

export default getForecast;