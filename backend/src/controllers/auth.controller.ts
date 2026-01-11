import { Request, Response } from 'express';
import { authService } from '../services/auth.service';

export const authController = {
  async register(req: Request, res: Response) {
    try {
      const { userId, password } = req.body;

      if (!userId || !password) {
        res.status(400).json({
          success: false,
          error: 'User ID and password are required',
        });
        return;
      }

      if (userId.length < 3) {
        res.status(400).json({
          success: false,
          error: 'User ID must be at least 3 characters',
        });
        return;
      }

      if (password.length < 6) {
        res.status(400).json({
          success: false,
          error: 'Password must be at least 6 characters',
        });
        return;
      }

      const result = await authService.register(userId, password);

      // Migrate existing data to the first user
      await authService.migrateExistingDataToUser(result.user.id);

      res.status(201).json({
        success: true,
        data: result,
      });
      return;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Registration failed';
      const status = message === 'User already exists' ? 409 : 500;
      res.status(status).json({
        success: false,
        error: message,
      });
    }
  },

  async login(req: Request, res: Response) {
    try {
      const { userId, password } = req.body;

      if (!userId || !password) {
        res.status(400).json({
          success: false,
          error: 'User ID and password are required',
        });
        return;
      }

      const result = await authService.login(userId, password);

      res.json({
        success: true,
        data: result,
      });
      return;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed';
      res.status(401).json({
        success: false,
        error: message,
      });
    }
  },

  async me(req: Request, res: Response) {
    try {
      const user = (req as any).user;

      if (!user) {
        res.status(401).json({
          success: false,
          error: 'Not authenticated',
        });
        return;
      }

      const userData = await authService.getUserById(user.id);

      if (!userData) {
        res.status(404).json({
          success: false,
          error: 'User not found',
        });
        return;
      }

      res.json({
        success: true,
        data: userData,
      });
      return;
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to get user data',
      });
    }
  },
};
