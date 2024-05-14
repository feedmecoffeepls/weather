import { z } from 'zod';

export const locationSchema = z.object({
    name: z.string(),
    lat: z.number(),
    lon: z.number(),
    country: z.string(),
    local_names: z.record(z.string()).optional(),
});

export const locationsResponseSchema = z.union([
    z.object({ data: z.array(locationSchema) }),
    z.object({ error: z.boolean() })
  ]);
  