import { z } from 'zod';

export const listSchema = z.array(z.object({
  dt: z.number(),
  main: z.object({
    temp: z.number().optional(),
    feels_like: z.number().optional(),
    temp_min: z.number(),
    temp_max: z.number(),
    pressure: z.number().optional(),
    sea_level: z.number().optional(),
    grnd_level: z.number().optional(),
    humidity: z.number().optional(),
    temp_kf: z.number().optional(),
  }),
  weather: z.array(z.object({
    id: z.number().optional(),
    main: z.string().optional(),
    description: z.string(),
    icon: z.string(),
  })),
  clouds: z.object({
    all: z.number().optional(),
  }),
  wind: z.object({
    speed: z.number().optional(),
    deg: z.number().optional(),
    gust: z.number().optional(),
  }),
  visibility: z.number().optional(),
  pop: z.number().optional(),
  rain: z.object({
    '3h': z.number().optional(),
  }).optional(),
  sys: z.object({
    pod: z.string().optional(),
  }),
  dt_txt: z.string().optional(),
}));

export const forecastSchema = z.object({
    cod: z.string(),
    message: z.number().optional(),
    cnt: z.number(),
    list: listSchema,
    city: z.object({
      id: z.number().optional(),
      name: z.string().optional(),
      coord: z.object({
        lat: z.number().optional(),
        lon: z.number().optional(),
      }),
      country: z.string().optional(),
      population: z.number().optional(),
      timezone: z.number().optional(),
      sunrise: z.number().optional(),
      sunset: z.number().optional(),
    })
  });

  export const forecastResponseSchema = z.union([
    forecastSchema,
    z.object({ error: z.boolean() }).optional()
  ]);
