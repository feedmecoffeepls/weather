"use server";

import ky from 'ky';
import { z } from 'zod';

const getLocations = async (location: string) => {
  const apiKey = process.env.WEATHER_API_KEY;
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=${apiKey}`;
  const response = await ky.get(url).json();
  const parsedResponse = locationSchema.parse(response);
  return parsedResponse;
};

export default getLocations;

const locationSchema = z.array(z.object({
  name: z.string(),
  local_names: z.record(z.string()).optional(),
  lat: z.number(),
  lon: z.number(),
  country: z.string(),
}));