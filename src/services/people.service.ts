import { tmdbClient } from './tmdb.service';
import { TMDbPerson, TMDbPersonDetails, TMDbPaginatedResponse } from '../types/tmdb.types';

interface SearchPeopleParams {
  language: string;
  include_adult: boolean;
  page: number;
  query?: string;
}

export const searchPeople = async (
  params: SearchPeopleParams,
): Promise<TMDbPaginatedResponse<TMDbPerson>> => {
  const { data } = await tmdbClient.get<TMDbPaginatedResponse<TMDbPerson>>('/search/person', {
    params,
  });
  return data;
};

export const getPersonDetails = async (id: string): Promise<TMDbPersonDetails> => {
  const { data } = await tmdbClient.get<TMDbPersonDetails>(`/person/${id}`, {
    params: { append_to_response: 'movie_credits,tv_credits,images' },
  });
  return data;
};
