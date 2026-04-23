import { z } from 'zod';

export const listMoviesSchema = z.object({
  query: z.object({
    page: z.coerce.number().int().min(1).default(1),
    region: z.string().optional(),
    language: z.string().default('en-US'),
    query: z.string().optional(),
    genre: z.string().optional(),
  }),
});

export const movieDetailsSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, 'Movie ID must be numeric'),
  }),
});
