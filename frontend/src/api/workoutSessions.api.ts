import apiClient from './axios-config';
import { WorkoutSession, APIResponse } from '../types/exercise.types';

export const getAllWorkoutSessions = async (): Promise<WorkoutSession[]> => {
  const response = await apiClient.get<APIResponse<WorkoutSession[]>>('/workout-sessions');
  return response.data.data || [];
};

export const getWorkoutSessionById = async (id: string): Promise<WorkoutSession | null> => {
  const response = await apiClient.get<APIResponse<WorkoutSession>>(`/workout-sessions/${id}`);
  return response.data.data || null;
};

export const createWorkoutSession = async (session: Partial<WorkoutSession>): Promise<WorkoutSession> => {
  const response = await apiClient.post<APIResponse<WorkoutSession>>('/workout-sessions', session);
  return response.data.data!;
};

export const updateWorkoutSession = async (id: string, session: Partial<WorkoutSession>): Promise<WorkoutSession> => {
  const response = await apiClient.put<APIResponse<WorkoutSession>>(`/workout-sessions/${id}`, session);
  return response.data.data!;
};

export const completeWorkoutSession = async (id: string): Promise<WorkoutSession> => {
  const response = await apiClient.post<APIResponse<WorkoutSession>>(`/workout-sessions/${id}/complete`);
  return response.data.data!;
};

export const deleteWorkoutSession = async (id: string): Promise<void> => {
  await apiClient.delete(`/workout-sessions/${id}`);
};
