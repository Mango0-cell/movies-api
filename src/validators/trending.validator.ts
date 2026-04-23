import { z } from 'zod';

export const trendingSchema = z.object({
  params: z.object({
    type: z.enum(['movie', 'tv', 'person']),
  }),
  query: z.object({
    time_window: z.enum(['day', 'week']).default('day'),
  }),
});
