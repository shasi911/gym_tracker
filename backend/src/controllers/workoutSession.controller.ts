import { Request, Response } from 'express';
import * as workoutSessionService from '../services/workoutSession.service';

export const getAllWorkoutSessions = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const sessions = await workoutSessionService.getAllWorkoutSessions(userId);
    res.json({ success: true, data: sessions });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};

export const getWorkoutSessionById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;
    const session = await workoutSessionService.getWorkoutSessionById(id, userId);

    if (!session) {
      res.status(404).json({ success: false, error: 'Workout session not found' });
      return;
    }

    res.json({ success: true, data: session });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};

export const createWorkoutSession = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const session = await workoutSessionService.createWorkoutSession(req.body, userId);
    res.status(201).json({ success: true, data: session });
  } catch (error) {
    res.status(400).json({ success: false, error: (error as Error).message });
  }
};

export const updateWorkoutSession = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;
    const session = await workoutSessionService.updateWorkoutSession(id, req.body, userId);
    res.json({ success: true, data: session });
  } catch (error) {
    res.status(400).json({ success: false, error: (error as Error).message });
  }
};

export const completeWorkoutSession = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;
    const session = await workoutSessionService.completeWorkoutSession(id, userId);
    res.json({ success: true, data: session });
  } catch (error) {
    res.status(400).json({ success: false, error: (error as Error).message });
  }
};

export const deleteWorkoutSession = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;
    await workoutSessionService.deleteWorkoutSession(id, userId);
    res.json({ success: true, message: 'Workout session deleted successfully' });
  } catch (error) {
    res.status(400).json({ success: false, error: (error as Error).message });
  }
};
