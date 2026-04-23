import { Router } from 'express';
import { validate } from '../middleware/validate';
import { searchPeopleSchema, personDetailsSchema } from '../validators/people.validator';
import * as peopleController from '../controllers/people.controller';

const router = Router();

router.get('/', validate(searchPeopleSchema), peopleController.searchPeople);
router.get('/:id', validate(personDetailsSchema), peopleController.getPersonDetails);

export { router as peopleRouter };
