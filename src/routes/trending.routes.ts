import { Router } from 'express';
import { validate } from '../middleware/validate';
import { trendingSchema } from '../validators/trending.validator';
import * as trendingController from '../controllers/trending.controller';

const router = Router();

router.get('/:type', validate(trendingSchema), trendingController.getTrending);

export { router as trendingRouter };
