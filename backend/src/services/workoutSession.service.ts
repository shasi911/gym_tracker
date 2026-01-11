import { PrismaClient, DayOfWeek } from '@prisma/client';

const prisma = new PrismaClient();

interface SetLog {
  setNumber: number;
  reps: number;
  weight: number;
  completed: boolean;
}

interface WorkoutLogInput {
  exerciseId: string;
  sets: SetLog[];
  notes?: string;
}

interface CreateWorkoutSessionInput {
  date?: Date;
  dayOfWeek: DayOfWeek;
  workoutPlanId?: string;
  duration?: number;
  notes?: string;
  logs?: WorkoutLogInput[];
}

export const getAllWorkoutSessions = async (userId: string) => {
  return await prisma.workoutSession.findMany({
    where: { userId },
    include: {
      logs: {
        include: {
          exercise: true
        }
      },
      workoutPlan: true
    },
    orderBy: { date: 'desc' }
  });
};

export const getWorkoutSessionById = async (id: string, userId: string) => {
  return await prisma.workoutSession.findFirst({
    where: { id, userId },
    include: {
      logs: {
        include: {
          exercise: true
        }
      },
      workoutPlan: {
        include: {
          exercises: {
            include: {
              exercise: true
            }
          }
        }
      }
    }
  });
};

export const createWorkoutSession = async (data: CreateWorkoutSessionInput, userId: string) => {
  const { logs, ...sessionData } = data;

  return await prisma.workoutSession.create({
    data: {
      ...sessionData,
      userId,
      logs: logs ? {
        create: logs.map(log => ({
          exerciseId: log.exerciseId,
          sets: log.sets as any, // Prisma JSON type
          notes: log.notes
        }))
      } : undefined
    },
    include: {
      logs: {
        include: {
          exercise: true
        }
      },
      workoutPlan: true
    }
  });
};

export const updateWorkoutSession = async (id: string, data: Partial<CreateWorkoutSessionInput>, userId: string) => {
  const { logs, ...sessionData } = data;

  // Verify ownership
  const existing = await prisma.workoutSession.findFirst({
    where: { id, userId }
  });

  if (!existing) {
    throw new Error('Workout session not found');
  }

  // If logs are provided, delete existing and create new ones
  if (logs) {
    await prisma.workoutLog.deleteMany({
      where: { workoutSessionId: id }
    });
  }

  return await prisma.workoutSession.update({
    where: { id },
    data: {
      ...sessionData,
      logs: logs ? {
        create: logs.map(log => ({
          exerciseId: log.exerciseId,
          sets: log.sets as any,
          notes: log.notes
        }))
      } : undefined
    },
    include: {
      logs: {
        include: {
          exercise: true
        }
      },
      workoutPlan: true
    }
  });
};

export const completeWorkoutSession = async (id: string, userId: string) => {
  // Verify ownership
  const existing = await prisma.workoutSession.findFirst({
    where: { id, userId }
  });

  if (!existing) {
    throw new Error('Workout session not found');
  }

  return await prisma.workoutSession.update({
    where: { id },
    data: { completed: true },
    include: {
      logs: {
        include: {
          exercise: true
        }
      },
      workoutPlan: true
    }
  });
};

export const deleteWorkoutSession = async (id: string, userId: string) => {
  // Verify ownership
  const existing = await prisma.workoutSession.findFirst({
    where: { id, userId }
  });

  if (!existing) {
    throw new Error('Workout session not found');
  }

  return await prisma.workoutSession.delete({
    where: { id }
  });
};
