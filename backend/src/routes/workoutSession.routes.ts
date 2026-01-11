import { Router } from 'express';
import * as workoutSessionController from '../controllers/workoutSession.controller';

const router = Router();

router.get('/', workoutSessionController.getAllWorkoutSessions);
router.get('/:id', workoutSessionController.getWorkoutSessionById);
router.post('/', workoutSessionController.createWorkoutSession);
router.put('/:id', workoutSessionController.updateWorkoutSession);
router.post('/:id/complete', workoutSessionController.completeWorkoutSession);
router.delete('/:id', workoutSessionController.deleteWorkoutSession);

export default router;
