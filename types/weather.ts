import { z } from 'zod';

export const weatherSchema = z.object({
    coord: z.object({
      lon: z.number().optional(),
      lat: z.number().optional(),
    }),
    weather: z.array(
      z.object({
        id: z.number().optional(),
        main: z.string(),
        description: z.string(),
        icon: z.string(),
      })
    ),
    base: z.string().optional(),
    main: z.object({
      temp: z.number(),
      feels_like: z.number().optional(),
      temp_min: z.number().optional(),
      temp_max: z.number().optional(),
      pressure: z.number().optional(),
      humidity: z.number(),
    }),
    visibility: z.number(),
    wind: z.object({
      speed: z.number(),
      deg: z.number(),
    }),
    clouds: z.object({
      all: z.number().optional(),
    }),
    dt: z.number(),
    sys: z.object({
      type: z.number().optional(),
      id: z.number().optional(),
      country: z.string().optional(),
      sunrise: z.number().optional(),
      sunset: z.number().optional(),
    }),
    timezone: z.number(),
    id: z.number().optional(),
    name: z.string().optional(),
    cod: z.number().optional(),
  });
  