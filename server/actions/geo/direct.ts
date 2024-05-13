"use server";

import ky from 'ky';

const getCurrentWeather = async (location: string) => {
  const apiKey = process.env.WEATHER_API_KEY;
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=${apiKey}`;
  const response = await ky.get(url).json();
  return response;
};

export default getCurrentWeather;
