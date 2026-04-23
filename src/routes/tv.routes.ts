import { Router } from 'express';
import { validate } from '../middleware/validate';
import { listTvShowsSchema, tvShowDetailsSchema } from '../validators/tv.validator';
import * as tvController from '../controllers/tv.controller';

const router = Router();

router.get('/', validate(listTvShowsSchema), tvController.listTvShows);
router.get('/:id', validate(tvShowDetailsSchema), tvController.getTvShowDetails);

export { router as tvRouter };
