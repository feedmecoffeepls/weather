"use server";
import { forecastResponseSchema, forecastSchema } from '@/types/forecast';
import ky from 'ky';
import { z } from 'zod';

const getForecast = async (lat: string, lon: string): Promise<z.infer<typeof forecastResponseSchema>> => {
  const apiKey = process.env.WEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  
  try {
    const response = await ky.get(url).json();
    const parsedResponse = forecastSchema.parse(response);
    
    // Grouping forecast data by day
    const groupedByDay = parsedResponse.list.reduce((acc: Record<string, typeof parsedResponse.list>, item) => {
      const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const date = new Date(item.dt * 1000).toLocaleDateString('en-US', { timeZone: userTimeZone }); 
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
  } catch (error) {
    return { error: true };
  }
};

export default getForecast;
