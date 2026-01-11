import { Router } from 'express';
import * as exerciseController from '../controllers/exercise.controller';

const router = Router();

router.get('/', exerciseController.getAllExercises);
router.get('/:id', exerciseController.getExerciseById);
router.get('/category/:category', exerciseController.getExercisesByCategory);

export default router;
