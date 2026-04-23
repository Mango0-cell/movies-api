import { Router } from 'express';
import { validate } from '../middleware/validate';
import { listMoviesSchema, movieDetailsSchema } from '../validators/movies.validator';
import * as moviesController from '../controllers/movies.controller';

const router = Router();

router.get('/', validate(listMoviesSchema), moviesController.listMovies);
router.get('/:id', validate(movieDetailsSchema), moviesController.getMovieDetails);

export { router as moviesRouter };
