import apiClient from './axios-config';
import { WorkoutPlan, APIResponse, DayOfWeek } from '../types/exercise.types';

export const getAllWorkoutPlans = async (): Promise<WorkoutPlan[]> => {
  const response = await apiClient.get<APIResponse<WorkoutPlan[]>>('/workout-plans');
  return response.data.data || [];
};

export const getWorkoutPlanById = async (id: string): Promise<WorkoutPlan | null> => {
  const response = await apiClient.get<APIResponse<WorkoutPlan>>(`/workout-plans/${id}`);
  return response.data.data || null;
};

export const getWorkoutPlanByDay = async (day: DayOfWeek): Promise<WorkoutPlan | null> => {
  const response = await apiClient.get<APIResponse<WorkoutPlan>>(`/workout-plans/day/${day}`);
  return response.data.data || null;
};

export const createWorkoutPlan = async (plan: Partial<WorkoutPlan>): Promise<WorkoutPlan> => {
  const response = await apiClient.post<APIResponse<WorkoutPlan>>('/workout-plans', plan);
  return response.data.data!;
};

export const updateWorkoutPlan = async (id: string, plan: Partial<WorkoutPlan>): Promise<WorkoutPlan> => {
  const response = await apiClient.put<APIResponse<WorkoutPlan>>(`/workout-plans/${id}`, plan);
  return response.data.data!;
};

export const deleteWorkoutPlan = async (id: string): Promise<void> => {
  await apiClient.delete(`/workout-plans/${id}`);
};
