import { tmdbClient } from './tmdb.service';
import { TMDbTvShow, TMDbTvShowDetails, TMDbPaginatedResponse } from '../types/tmdb.types';

interface ListTvShowsParams {
  page: number;
  region?: string;
  language: string;
  query?: string;
  genre?: string;
}

export const listTvShows = async (
  params: ListTvShowsParams,
): Promise<TMDbPaginatedResponse<TMDbTvShow>> => {
  const { query, genre, ...rest } = params;

  if (query) {
    const { data } = await tmdbClient.get<TMDbPaginatedResponse<TMDbTvShow>>('/search/tv', {
      params: { ...rest, query },
    });
    return data;
  }

  const { data } = await tmdbClient.get<TMDbPaginatedResponse<TMDbTvShow>>('/discover/tv', {
    params: { ...rest, with_genres: genre },
  });
  return data;
};

export const getTvShowDetails = async (id: string): Promise<TMDbTvShowDetails> => {
  const { data } = await tmdbClient.get<TMDbTvShowDetails>(`/tv/${id}`, {
    params: { append_to_response: 'credits,videos,images' },
  });
  return data;
};
