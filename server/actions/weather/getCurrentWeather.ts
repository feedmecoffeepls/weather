"use server";

import { weatherSchema } from '@/types/weather';
import ky from 'ky';

const getCurrentWeather = async (lat: string, lon: string) => {
  const apiKey = process.env.WEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  const response = await ky.get(url).json();
  const parsedResponse = weatherSchema.parse(response);
  return parsedResponse;
};

export default getCurrentWeather;
