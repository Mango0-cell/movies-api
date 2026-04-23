import { Request, Response, NextFunction } from 'express';
import * as trendingService from '../services/trending.service';
import { ApiSuccessResponse } from '../types/api.types';

export const getTrending = async (
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { params, query: validatedQuery } = res.locals.validated;
    const type = params.type as 'movie' | 'tv' | 'person';
    const timeWindow = (validatedQuery.time_window || 'day') as 'day' | 'week';

    const result = await trendingService.getTrending(type, timeWindow);

    const response: ApiSuccessResponse<unknown[]> = {
      success: true,
      data: result.results,
      pagination: {
        page: result.page,
        totalPages: result.total_pages,
        totalResults: result.total_results,
      },
    };
    res.json(response);
  } catch (error) {
    next(error);
  }
};
