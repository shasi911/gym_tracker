import { PrismaClient, DayOfWeek } from '@prisma/client';

const prisma = new PrismaClient();

interface CreateWorkoutPlanInput {
  name: string;
  dayOfWeek: DayOfWeek;
  isActive?: boolean;
  notes?: string;
  exercises?: Array<{
    exerciseId: string;
    orderIndex: number;
    plannedSets: number;
    plannedReps: number;
    plannedWeight?: number;
    restSeconds?: number;
    notes?: string;
  }>;
}

export const getAllWorkoutPlans = async (userId: string) => {
  return await prisma.workoutPlan.findMany({
    where: { userId },
    include: {
      exercises: {
        include: {
          exercise: true
        },
        orderBy: { orderIndex: 'asc' }
      }
    },
    orderBy: { dayOfWeek: 'asc' }
  });
};

export const getWorkoutPlanById = async (id: string, userId: string) => {
  return await prisma.workoutPlan.findFirst({
    where: { id, userId },
    include: {
      exercises: {
        include: {
          exercise: true
        },
        orderBy: { orderIndex: 'asc' }
      }
    }
  });
};

export const getWorkoutPlanByDay = async (dayOfWeek: string, userId: string) => {
  return await prisma.workoutPlan.findFirst({
    where: {
      dayOfWeek: dayOfWeek as DayOfWeek,
      isActive: true,
      userId
    },
    include: {
      exercises: {
        include: {
          exercise: true
        },
        orderBy: { orderIndex: 'asc' }
      }
    }
  });
};

export const createWorkoutPlan = async (data: CreateWorkoutPlanInput, userId: string) => {
  const { exercises, ...planData } = data;

  return await prisma.workoutPlan.create({
    data: {
      ...planData,
      userId,
      exercises: exercises ? {
        create: exercises
      } : undefined
    },
    include: {
      exercises: {
        include: {
          exercise: true
        },
        orderBy: { orderIndex: 'asc' }
      }
    }
  });
};

export const updateWorkoutPlan = async (id: string, data: Partial<CreateWorkoutPlanInput>, userId: string) => {
  const { exercises, ...planData } = data;

  // Verify ownership
  const existing = await prisma.workoutPlan.findFirst({
    where: { id, userId }
  });

  if (!existing) {
    throw new Error('Workout plan not found');
  }

  // If exercises are provided, delete existing and create new ones
  if (exercises) {
    await prisma.workoutExercise.deleteMany({
      where: { workoutPlanId: id }
    });
  }

  return await prisma.workoutPlan.update({
    where: { id },
    data: {
      ...planData,
      exercises: exercises ? {
        create: exercises
      } : undefined
    },
    include: {
      exercises: {
        include: {
          exercise: true
        },
        orderBy: { orderIndex: 'asc' }
      }
    }
  });
};

export const deleteWorkoutPlan = async (id: string, userId: string) => {
  // Verify ownership
  const existing = await prisma.workoutPlan.findFirst({
    where: { id, userId }
  });

  if (!existing) {
    throw new Error('Workout plan not found');
  }

  return await prisma.workoutPlan.delete({
    where: { id }
  });
};
