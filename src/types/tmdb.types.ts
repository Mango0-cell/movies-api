export interface TMDbMovie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids: number[];
  adult: boolean;
  original_language: string;
  video: boolean;
}

export interface TMDbMovieDetails extends Omit<TMDbMovie, 'genre_ids'> {
  genres: { id: number; name: string }[];
  runtime: number | null;
  budget: number;
  revenue: number;
  status: string;
  tagline: string | null;
  homepage: string | null;
  imdb_id: string | null;
  production_companies: { id: number; name: string; logo_path: string | null; origin_country: string }[];
  credits?: {
    cast: TMDbCastMember[];
    crew: TMDbCrewMember[];
  };
  videos?: { results: TMDbVideo[] };
  images?: { backdrops: TMDbImage[]; posters: TMDbImage[] };
}

export interface TMDbTvShow {
  id: number;
  name: string;
  original_name: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids: number[];
  origin_country: string[];
  original_language: string;
}

export interface TMDbTvShowDetails extends Omit<TMDbTvShow, 'genre_ids'> {
  genres: { id: number; name: string }[];
  number_of_episodes: number;
  number_of_seasons: number;
  status: string;
  tagline: string | null;
  homepage: string | null;
  type: string;
  in_production: boolean;
  seasons: TMDbSeason[];
  credits?: {
    cast: TMDbCastMember[];
    crew: TMDbCrewMember[];
  };
  videos?: { results: TMDbVideo[] };
  images?: { backdrops: TMDbImage[]; posters: TMDbImage[] };
}

export interface TMDbSeason {
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  season_number: number;
  episode_count: number;
  air_date: string | null;
}

export interface TMDbPerson {
  id: number;
  name: string;
  original_name: string;
  profile_path: string | null;
  popularity: number;
  known_for_department: string;
  gender: number;
  adult: boolean;
  known_for: (TMDbMovie | TMDbTvShow)[];
}

export interface TMDbPersonDetails {
  id: number;
  name: string;
  biography: string;
  birthday: string | null;
  deathday: string | null;
  place_of_birth: string | null;
  profile_path: string | null;
  popularity: number;
  known_for_department: string;
  gender: number;
  adult: boolean;
  homepage: string | null;
  imdb_id: string | null;
  also_known_as: string[];
  movie_credits?: { cast: TMDbCastMember[]; crew: TMDbCrewMember[] };
  tv_credits?: { cast: TMDbCastMember[]; crew: TMDbCrewMember[] };
  images?: { profiles: TMDbImage[] };
}

export interface TMDbCastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
}

export interface TMDbCrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
}

export interface TMDbVideo {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
}

export interface TMDbImage {
  file_path: string;
  width: number;
  height: number;
  aspect_ratio: number;
  vote_average: number;
  vote_count: number;
}

export interface TMDbPaginatedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}
