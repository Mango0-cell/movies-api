import { Request, Response } from 'express';
import { ApiErrorResponse } from '../types/api.types';

export const notFound = (_req: Request, res: Response): void => {
  const response: ApiErrorResponse = {
    success: false,
    error: {
      status: 404,
      message: 'Route not found',
      code: 'ROUTE_NOT_FOUND',
    },
  };
  res.status(404).json(response);
};
