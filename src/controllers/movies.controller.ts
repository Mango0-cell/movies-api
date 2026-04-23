import { Request, Response, NextFunction } from 'express';
import * as moviesService from '../services/movies.service';
import { ApiSuccessResponse } from '../types/api.types';
import { TMDbMovie, TMDbMovieDetails } from '../types/tmdb.types';

export const listMovies = async (
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { query: validatedQuery } = res.locals.validated;
    const { page, region, language, query, genre } = validatedQuery;

    const result = await moviesService.listMovies({
      page,
      region,
      language,
      query,
      genre,
    });

    const response: ApiSuccessResponse<TMDbMovie[]> = {
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

export const getMovieDetails = async (
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { params } = res.locals.validated;
    const data = await moviesService.getMovieDetails(params.id);

    const response: ApiSuccessResponse<TMDbMovieDetails> = {
      success: true,
      data,
    };
    res.json(response);
  } catch (error) {
    next(error);
  }
};
