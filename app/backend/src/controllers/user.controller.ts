import { Router, Request, Response } from 'express';
import { BetterAuthUserService } from '../utils/betterAuthUsers';

export class UserController {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    // Better Auth User management routes
    this.router.get('/', this.getAllUsers);
    this.router.post('/test', this.createTestUser); // For development
    this.router.put('/profile', this.updateProfile); // Update user profile
  }

  // GET /api/users - Get all Better Auth users (for admin/testing)
  private getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
      const users = await BetterAuthUserService.getAllUsers();

      res.json({
        success: true,
        data: users.map(user => BetterAuthUserService.formatUser(user)),
        count: users.length,
      });
    } catch (error) {
      console.error('[User] Error getting users:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch users',
      });
    }
  };

  // POST /api/users/test - Create test user (for development)
  private createTestUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, name, emailVerified, image } = req.body;

      if (!email || !name) {
        res.status(400).json({
          success: false,
          error: 'Email and name are required',
        });
        return;
      }

      const user = await BetterAuthUserService.createTestUser({
        email,
        name,
        emailVerified,
        image,
      });

      if (!user) {
        res.status(500).json({
          success: false,
          error: 'Failed to create test user',
        });
        return;
      }

      res.status(201).json({
        success: true,
        data: BetterAuthUserService.formatUser(user),
      });
    } catch (error) {
      console.error('[User] Error creating test user:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to create test user',
      });
    }
  };

  // PUT /api/users/profile - Update user profile
  private updateProfile = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, image } = req.body;

      // TODO: Get user ID from session/auth middleware
      // For now, we'll expect userId in the request body for testing
      const { userId } = req.body;

      if (!userId) {
        res.status(400).json({
          success: false,
          error: 'User ID is required',
        });
        return;
      }

      if (!name || name.trim().length === 0) {
        res.status(400).json({
          success: false,
          error: 'Name is required',
        });
        return;
      }

      const updatedUser = await BetterAuthUserService.updateUser(userId, {
        name: name.trim(),
        image: image?.trim() || null,
      });

      if (!updatedUser) {
        res.status(404).json({
          success: false,
          error: 'User not found or update failed',
        });
        return;
      }

      res.json({
        success: true,
        data: BetterAuthUserService.formatUser(updatedUser),
      });
    } catch (error) {
      console.error('[User] Error updating profile:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to update profile',
      });
    }
  };
}
