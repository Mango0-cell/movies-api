import { Request, Response, NextFunction } from 'express';
import * as tvService from '../services/tv.service';
import { ApiSuccessResponse } from '../types/api.types';
import { TMDbTvShow, TMDbTvShowDetails } from '../types/tmdb.types';

export const listTvShows = async (
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { query: validatedQuery } = res.locals.validated;
    const { page, region, language, query, genre } = validatedQuery;

    const result = await tvService.listTvShows({
      page,
      region,
      language,
      query,
      genre,
    });

    const response: ApiSuccessResponse<TMDbTvShow[]> = {
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

export const getTvShowDetails = async (
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { params } = res.locals.validated;
    const data = await tvService.getTvShowDetails(params.id);

    const response: ApiSuccessResponse<TMDbTvShowDetails> = {
      success: true,
      data,
    };
    res.json(response);
  } catch (error) {
    next(error);
  }
};
