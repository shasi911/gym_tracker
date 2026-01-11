import { Router } from 'express';
import exerciseRoutes from './exercise.routes';
import workoutPlanRoutes from './workoutPlan.routes';
import workoutSessionRoutes from './workoutSession.routes';
import authRoutes from './auth.routes';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

// Auth routes (public)
router.use('/auth', authRoutes);

// Exercise routes (public - read-only reference data)
router.use('/exercises', exerciseRoutes);

// Protected routes (require authentication)
router.use('/workout-plans', authMiddleware, workoutPlanRoutes);
router.use('/workout-sessions', authMiddleware, workoutSessionRoutes);

export default router;
