import { PrismaClient, Category } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllExercises = async () => {
  return await prisma.exercise.findMany({
    orderBy: [
      { category: 'asc' },
      { name: 'asc' }
    ]
  });
};

export const getExerciseById = async (id: string) => {
  return await prisma.exercise.findUnique({
    where: { id }
  });
};

export const getExercisesByCategory = async (category: string) => {
  return await prisma.exercise.findMany({
    where: {
      category: category as Category
    },
    orderBy: { name: 'asc' }
  });
};
