import { tmdbClient } from './tmdb.service';
import { TMDbPaginatedResponse } from '../types/tmdb.types';

export const getTrending = async (
  type: 'movie' | 'tv' | 'person',
  timeWindow: 'day' | 'week',
): Promise<TMDbPaginatedResponse<unknown>> => {
  const { data } = await tmdbClient.get<TMDbPaginatedResponse<unknown>>(
    `/trending/${type}/${timeWindow}`,
  );
  return data;
};
