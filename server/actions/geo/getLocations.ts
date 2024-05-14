"use server";

import { locationSchema, locationsResponseSchema } from '@/types/location';
import ky from 'ky';
import { z } from 'zod';

const getLocations = async (location: string): Promise<z.infer<typeof locationsResponseSchema>> => {
  const apiKey = process.env.WEATHER_API_KEY;
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=${apiKey}`;
  
  try {
    const response = await ky.get(url).json();
    const parsedResponse = locationSchema.array().parse(response);
    return { data: parsedResponse };
  } catch (error) {
    return { error: true };
  }
};

export default getLocations;
