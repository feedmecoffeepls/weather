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
      const timestamp = item.dt * 1000;
      const dateObject = new Date(timestamp);
      const offset = dateObject.getTimezoneOffset() * 60000; 
      const localDateObject = new Date(timestamp - offset);
      const date = localDateObject.toISOString().split('T')[0];

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
