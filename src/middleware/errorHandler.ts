import { Request, Response, NextFunction } from 'express';
import { AxiosError } from 'axios';
import { AppError } from '../utils/AppError';
import { env } from '../config/env';
import { logger } from '../utils/logger';
import { ApiErrorResponse } from '../types/api.types';

/* eslint-disable @typescript-eslint/no-unused-vars */
export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  /* eslint-enable @typescript-eslint/no-unused-vars */
  logger.error('Error:', err.message);

  if (err instanceof AppError) {
    const response: ApiErrorResponse = {
      success: false,
      error: {
        status: err.statusCode,
        message: err.message,
        code: err.code,
      },
    };
    res.status(err.statusCode).json(response);
    return;
  }

  if (err instanceof AxiosError) {
    const status = err.response?.status === 404 ? 404 : 502;
    const response: ApiErrorResponse = {
      success: false,
      error: {
        status,
        message: status === 404 ? 'Resource not found on TMDb' : 'Failed to fetch data from TMDb',
        code: status === 404 ? 'TMDB_NOT_FOUND' : 'TMDB_ERROR',
      },
    };
    res.status(status).json(response);
    return;
  }

  const response: ApiErrorResponse = {
    success: false,
    error: {
      status: 500,
      message: env.NODE_ENV === 'production' ? 'Internal server error' : err.message,
      code: 'INTERNAL_ERROR',
    },
  };
  res.status(500).json(response);
};
