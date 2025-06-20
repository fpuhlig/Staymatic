import { Router, Request, Response } from 'express';
import { BetterAuthUserService } from '../utils/betterAuthUsers';
import { responseHandlers } from '../../../shared/src/utils';

export class UserController {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    // Better Auth User management routes
    this.router.get('/', this.getAllUsers);
    this.router.put('/profile', this.updateProfile); // Update user profile
  }

  // GET /api/users - Get all Better Auth users (for admin/testing)
  private getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
      const users = await BetterAuthUserService.getAllUsers();

      responseHandlers.successWithMeta(
        res,
        users.map(user => BetterAuthUserService.formatUser(user)),
        { count: users.length },
      );
    } catch {
      responseHandlers.serverError(res, 'Failed to fetch users', 'User');
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
