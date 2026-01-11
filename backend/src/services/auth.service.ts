import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-change-me';
const JWT_EXPIRES_IN = '7d';

export interface AuthPayload {
  id: string;
  userId: string;
}

export const authService = {
  async register(userId: string, password: string) {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { userId },
    });

    if (existingUser) {
      throw new Error('User already exists');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create user
    const user = await prisma.user.create({
      data: {
        userId,
        passwordHash,
      },
    });

    // Generate token
    const token = jwt.sign(
      { id: user.id, userId: user.userId } as AuthPayload,
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    return {
      user: {
        id: user.id,
        userId: user.userId,
      },
      token,
    };
  },

  async login(userId: string, password: string) {
    // Find user
    const user = await prisma.user.findUnique({
      where: { userId },
    });

    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.passwordHash);

    if (!isValidPassword) {
      throw new Error('Invalid credentials');
    }

    // Generate token
    const token = jwt.sign(
      { id: user.id, userId: user.userId } as AuthPayload,
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    return {
      user: {
        id: user.id,
        userId: user.userId,
      },
      token,
    };
  },

  verifyToken(token: string): AuthPayload {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as AuthPayload;
      return decoded;
    } catch (error) {
      throw new Error('Invalid token');
    }
  },

  async getUserById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        userId: true,
        createdAt: true,
      },
    });
  },

  async migrateExistingDataToUser(userDbId: string) {
    // Assign all existing workout plans to this user
    await prisma.workoutPlan.updateMany({
      where: { userId: null },
      data: { userId: userDbId },
    });

    // Assign all existing workout sessions to this user
    await prisma.workoutSession.updateMany({
      where: { userId: null },
      data: { userId: userDbId },
    });
  },
};
