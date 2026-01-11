import { Request, Response } from 'express';
import * as workoutPlanService from '../services/workoutPlan.service';

export const getAllWorkoutPlans = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const plans = await workoutPlanService.getAllWorkoutPlans(userId);
    res.json({ success: true, data: plans });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};

export const getWorkoutPlanById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;
    const plan = await workoutPlanService.getWorkoutPlanById(id, userId);

    if (!plan) {
      res.status(404).json({ success: false, error: 'Workout plan not found' });
      return;
    }

    res.json({ success: true, data: plan });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};

export const getWorkoutPlanByDay = async (req: Request, res: Response): Promise<void> => {
  try {
    const { dayOfWeek } = req.params;
    const userId = req.user!.id;
    const plan = await workoutPlanService.getWorkoutPlanByDay(dayOfWeek, userId);

    if (!plan) {
      res.status(404).json({ success: false, error: 'Workout plan not found for this day' });
      return;
    }

    res.json({ success: true, data: plan });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};

export const createWorkoutPlan = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const plan = await workoutPlanService.createWorkoutPlan(req.body, userId);
    res.status(201).json({ success: true, data: plan });
  } catch (error) {
    res.status(400).json({ success: false, error: (error as Error).message });
  }
};

export const updateWorkoutPlan = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;
    const plan = await workoutPlanService.updateWorkoutPlan(id, req.body, userId);
    res.json({ success: true, data: plan });
  } catch (error) {
    res.status(400).json({ success: false, error: (error as Error).message });
  }
};

export const deleteWorkoutPlan = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;
    await workoutPlanService.deleteWorkoutPlan(id, userId);
    res.json({ success: true, message: 'Workout plan deleted successfully' });
  } catch (error) {
    res.status(400).json({ success: false, error: (error as Error).message });
  }
};
