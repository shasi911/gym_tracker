import { Request, Response } from 'express';
import * as exerciseService from '../services/exercise.service';

export const getAllExercises = async (_req: Request, res: Response): Promise<void> => {
  try {
    const exercises = await exerciseService.getAllExercises();
    res.json({ success: true, data: exercises });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};

export const getExerciseById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const exercise = await exerciseService.getExerciseById(id);

    if (!exercise) {
      res.status(404).json({ success: false, error: 'Exercise not found' });
      return;
    }

    res.json({ success: true, data: exercise });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};

export const getExercisesByCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category } = req.params;
    const exercises = await exerciseService.getExercisesByCategory(category);
    res.json({ success: true, data: exercises });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};
