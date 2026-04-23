import { Router } from 'express';
import { moviesRouter } from './movies.routes';
import { tvRouter } from './tv.routes';
import { peopleRouter } from './people.routes';
import { trendingRouter } from './trending.routes';

const router = Router();

router.use('/movies', moviesRouter);
router.use('/tv', tvRouter);
router.use('/people', peopleRouter);
router.use('/trending', trendingRouter);

export { router as apiRouter };
