"use server";

import { weatherResponseSchema, weatherSchema } from '@/types/weather';
import ky from 'ky';
import { z } from 'zod';

const getCurrentWeather = async (lat: string, lon: string): Promise<z.infer<typeof weatherResponseSchema>> => {
  const apiKey = process.env.WEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  
  try {
    const response = await ky.get(url).json();
    const parsedResponse = weatherSchema.parse(response);
    return parsedResponse;
  } catch (error) {
    return { error: true };
  }
};

export default getCurrentWeather;
