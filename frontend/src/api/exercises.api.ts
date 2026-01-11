import apiClient from './axios-config';
import { Exercise, APIResponse, Category } from '../types/exercise.types';

export const getAllExercises = async (): Promise<Exercise[]> => {
  const response = await apiClient.get<APIResponse<Exercise[]>>('/exercises');
  return response.data.data || [];
};

export const getExerciseById = async (id: string): Promise<Exercise | null> => {
  const response = await apiClient.get<APIResponse<Exercise>>(`/exercises/${id}`);
  return response.data.data || null;
};

export const getExercisesByCategory = async (category: Category): Promise<Exercise[]> => {
  const response = await apiClient.get<APIResponse<Exercise[]>>(`/exercises/category/${category}`);
  return response.data.data || [];
};
