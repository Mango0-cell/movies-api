import { tmdbClient } from './tmdb.service';
import { TMDbMovie, TMDbMovieDetails, TMDbPaginatedResponse } from '../types/tmdb.types';

interface ListMoviesParams {
  page: number;
  region?: string;
  language: string;
  query?: string;
  genre?: string;
}

export const listMovies = async (
  params: ListMoviesParams,
): Promise<TMDbPaginatedResponse<TMDbMovie>> => {
  const { query, genre, ...rest } = params;

  if (query) {
    const { data } = await tmdbClient.get<TMDbPaginatedResponse<TMDbMovie>>('/search/movie', {
      params: { ...rest, query },
    });
    return data;
  }

  const { data } = await tmdbClient.get<TMDbPaginatedResponse<TMDbMovie>>('/discover/movie', {
    params: { ...rest, with_genres: genre },
  });
  return data;
};

export const getMovieDetails = async (id: string): Promise<TMDbMovieDetails> => {
  const { data } = await tmdbClient.get<TMDbMovieDetails>(`/movie/${id}`, {
    params: { append_to_response: 'credits,videos,images' },
  });
  return data;
};
