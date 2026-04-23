import { z } from 'zod';

export const searchPeopleSchema = z.object({
  query: z.object({
    language: z.string().default('en-US'),
    include_adult: z.coerce.boolean().default(false),
    page: z.coerce.number().int().min(1).default(1),
    query: z.string().optional(),
  }),
});

export const personDetailsSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, 'Person ID must be numeric'),
  }),
});
