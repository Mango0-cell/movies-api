import axios, { AxiosInstance } from 'axios';
import { env } from '../config/env';
import { logger } from '../utils/logger';

const tmdbClient: AxiosInstance = axios.create({
  baseURL: env.TMDB_BASE_URL,
  timeout: 10000,
  headers: {
    Authorization: `Bearer ${env.TMDB_ACCESS_TOKEN}`,
    Accept: 'application/json',
  },
});

tmdbClient.interceptors.request.use((config) => {
  logger.debug(`TMDb Request: ${config.method?.toUpperCase()} ${config.url}`);
  return config;
});

tmdbClient.interceptors.response.use(
  (response) => {
    logger.debug(`TMDb Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    logger.error(`TMDb Error: ${error.message}`);
    throw error;
  },
);

export { tmdbClient };
