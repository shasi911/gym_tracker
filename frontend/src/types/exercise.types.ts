export enum Category {
  PUSH = 'PUSH',
  PULL = 'PULL',
  LEGS = 'LEGS',
  CHEST = 'CHEST',
  SHOULDERS = 'SHOULDERS',
  BACK = 'BACK',
  ARMS = 'ARMS',
  CORE = 'CORE',
  CARDIO = 'CARDIO',
  FULL_BODY = 'FULL_BODY',
  OLYMPIC = 'OLYMPIC'
}

export enum Difficulty {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED'
}

export enum DayOfWeek {
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
  SUNDAY = 'SUNDAY'
}

export interface Exercise {
  id: string;
  name: string;
  description?: string;
  category: Category;
  muscleGroups: string[];
  equipment?: string;
  difficulty: Difficulty;
  instructions?: string;
  videoUrl?: string;
  imageUrl?: string;
}

export interface WorkoutExercise {
  id: string;
  workoutPlanId: string;
  exerciseId: string;
  exercise: Exercise;
  orderIndex: number;
  plannedSets: number;
  plannedReps: number;
  plannedWeight?: number;
  restSeconds: number;
  notes?: string;
}

export interface WorkoutPlan {
  id: string;
  name: string;
  dayOfWeek: DayOfWeek;
  isActive: boolean;
  notes?: string;
  exercises: WorkoutExercise[];
  createdAt?: string;
  updatedAt?: string;
}

export interface SetLog {
  setNumber: number;
  reps: number;
  weight: number;
  completed: boolean;
}

export interface WorkoutLog {
  id: string;
  workoutSessionId: string;
  exerciseId: string;
  exercise: Exercise;
  sets: SetLog[];
  notes?: string;
}

export interface WorkoutSession {
  id: string;
  date: string;
  dayOfWeek: DayOfWeek;
  workoutPlanId?: string;
  workoutPlan?: WorkoutPlan;
  duration?: number;
  notes?: string;
  completed: boolean;
  logs: WorkoutLog[];
  createdAt?: string;
  updatedAt?: string;
}

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
