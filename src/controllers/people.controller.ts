import { Request, Response, NextFunction } from 'express';
import * as peopleService from '../services/people.service';
import { ApiSuccessResponse } from '../types/api.types';
import { TMDbPerson, TMDbPersonDetails } from '../types/tmdb.types';

export const searchPeople = async (
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { query: validatedQuery } = res.locals.validated;
    const { page, language, include_adult, query } = validatedQuery;

    const result = await peopleService.searchPeople({
      page,
      language,
      include_adult,
      query,
    });

    const response: ApiSuccessResponse<TMDbPerson[]> = {
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

export const getPersonDetails = async (
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { params } = res.locals.validated;
    const data = await peopleService.getPersonDetails(params.id);

    const response: ApiSuccessResponse<TMDbPersonDetails> = {
      success: true,
      data,
    };
    res.json(response);
  } catch (error) {
    next(error);
  }
};
