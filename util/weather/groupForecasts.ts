import { listSchema } from '@/types/forecast';
import { z } from 'zod';

export const groupForecasts = (list: z.infer<typeof listSchema>) => {
  return list.reduce((acc: Record<string, typeof list[number][]>, item) => {
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const date = new Date(item.dt * 1000).toLocaleDateString('en-US', { timeZone: userTimeZone });
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {});
}
