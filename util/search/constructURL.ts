"use client";

import { locationSchema } from '@/types/location';
import { z } from 'zod';

const constructURL = (location: z.infer<typeof locationSchema>): string => {
  return `/?location=${encodeURIComponent(location.country)}&name=${encodeURIComponent(location.name)}&lat=${location.lat}&lon=${location.lon}`;
}

export default constructURL
