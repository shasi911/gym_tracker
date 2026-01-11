import { Router } from 'express';
import * as workoutPlanController from '../controllers/workoutPlan.controller';

const router = Router();

router.get('/', workoutPlanController.getAllWorkoutPlans);
router.get('/:id', workoutPlanController.getWorkoutPlanById);
router.get('/day/:dayOfWeek', workoutPlanController.getWorkoutPlanByDay);
router.post('/', workoutPlanController.createWorkoutPlan);
router.put('/:id', workoutPlanController.updateWorkoutPlan);
router.delete('/:id', workoutPlanController.deleteWorkoutPlan);

export default router;
