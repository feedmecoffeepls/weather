"use server";

import ky from 'ky';

const getForecast = async (lat: string, lon: string) => {
  const apiKey = process.env.WEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  const response = await ky.get(url).json();
  return response;
};

export default getForecast;
