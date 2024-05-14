"use server";

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

const locationSchema = z.object({
  name: z.string(),
  lat: z.number(),
  lon: z.number(),
  country: z.string(),
  local_names: z.record(z.string()).optional(),
});

const locationsResponseSchema = z.union([
  z.object({ data: z.array(locationSchema) }),
  z.object({ error: z.boolean() })
]);
