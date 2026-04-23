import { vi } from 'vitest';

// Mock env before anything imports it
vi.mock('../../src/config/env', () => ({
  env: {
    TMDB_ACCESS_TOKEN: 'test_access_token_12345',
    TMDB_BASE_URL: 'https://api.themoviedb.org/3',
    PORT: 3000,
    NODE_ENV: 'test',
    CORS_ORIGIN: '*',
    RATE_LIMIT_WINDOW_MS: 900000,
    RATE_LIMIT_MAX: 1000,
  },
}));

export const mockMovieListResponse = {
  page: 1,
  results: [
    {
      id: 550,
      title: 'Fight Club',
      original_title: 'Fight Club',
      overview: 'An insomniac office worker...',
      poster_path: '/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg',
      backdrop_path: '/hZkgoQYus5dXo3H8T7Uef6DNknx.jpg',
      release_date: '1999-10-15',
      vote_average: 8.4,
      vote_count: 26000,
      popularity: 60.0,
      genre_ids: [18],
      adult: false,
      original_language: 'en',
      video: false,
    },
  ],
  total_pages: 500,
  total_results: 10000,
};

export const mockMovieDetails = {
  id: 550,
  title: 'Fight Club',
  original_title: 'Fight Club',
  overview: 'An insomniac office worker...',
  poster_path: '/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg',
  backdrop_path: '/hZkgoQYus5dXo3H8T7Uef6DNknx.jpg',
  release_date: '1999-10-15',
  vote_average: 8.4,
  vote_count: 26000,
  popularity: 60.0,
  adult: false,
  original_language: 'en',
  video: false,
  genres: [{ id: 18, name: 'Drama' }],
  runtime: 139,
  budget: 63000000,
  revenue: 101200000,
  status: 'Released',
  tagline: 'Mischief. Mayhem. Soap.',
  homepage: null,
  imdb_id: 'tt0137523',
  production_companies: [],
  credits: { cast: [], crew: [] },
  videos: { results: [] },
  images: { backdrops: [], posters: [] },
};

export const mockTvListResponse = {
  page: 1,
  results: [
    {
      id: 1399,
      name: 'Breaking Bad',
      original_name: 'Breaking Bad',
      overview: 'A high school chemistry teacher...',
      poster_path: '/ggFHVNu6YYI5L9pCfOacjizRGt.jpg',
      backdrop_path: '/tsRy63Mu5cu8etL1X7ZLyf7UP1M.jpg',
      first_air_date: '2008-01-20',
      vote_average: 8.9,
      vote_count: 12000,
      popularity: 80.0,
      genre_ids: [18, 80],
      origin_country: ['US'],
      original_language: 'en',
    },
  ],
  total_pages: 100,
  total_results: 2000,
};

export const mockTvDetails = {
  id: 1399,
  name: 'Breaking Bad',
  original_name: 'Breaking Bad',
  overview: 'A high school chemistry teacher...',
  poster_path: '/ggFHVNu6YYI5L9pCfOacjizRGt.jpg',
  backdrop_path: '/tsRy63Mu5cu8etL1X7ZLyf7UP1M.jpg',
  first_air_date: '2008-01-20',
  vote_average: 8.9,
  vote_count: 12000,
  popularity: 80.0,
  origin_country: ['US'],
  original_language: 'en',
  genres: [{ id: 18, name: 'Drama' }],
  number_of_episodes: 62,
  number_of_seasons: 5,
  status: 'Ended',
  tagline: null,
  homepage: null,
  type: 'Scripted',
  in_production: false,
  seasons: [],
  credits: { cast: [], crew: [] },
  videos: { results: [] },
  images: { backdrops: [], posters: [] },
};

export const mockPeopleListResponse = {
  page: 1,
  results: [
    {
      id: 287,
      name: 'Brad Pitt',
      original_name: 'Brad Pitt',
      profile_path: '/cckcYc2v0yh1tc9QjRelptcOBko.jpg',
      popularity: 25.0,
      known_for_department: 'Acting',
      gender: 2,
      adult: false,
      known_for: [],
    },
  ],
  total_pages: 1,
  total_results: 1,
};

export const mockPersonDetails = {
  id: 287,
  name: 'Brad Pitt',
  biography: 'William Bradley Pitt is an American actor...',
  birthday: '1963-12-18',
  deathday: null,
  place_of_birth: 'Shawnee, Oklahoma, USA',
  profile_path: '/cckcYc2v0yh1tc9QjRelptcOBko.jpg',
  popularity: 25.0,
  known_for_department: 'Acting',
  gender: 2,
  adult: false,
  homepage: null,
  imdb_id: 'nm0000093',
  also_known_as: [],
  movie_credits: { cast: [], crew: [] },
  tv_credits: { cast: [], crew: [] },
  images: { profiles: [] },
};

export const mockTrendingResponse = {
  page: 1,
  results: [{ id: 550, title: 'Fight Club', media_type: 'movie' }],
  total_pages: 50,
  total_results: 1000,
};
