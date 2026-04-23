import { z } from 'zod';

export const listTvShowsSchema = z.object({
  query: z.object({
    page: z.coerce.number().int().min(1).default(1),
    region: z.string().optional(),
    language: z.string().default('en-US'),
    query: z.string().optional(),
    genre: z.string().optional(),
  }),
});

export const tvShowDetailsSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, 'TV Show ID must be numeric'),
  }),
});
