import { Router, Request, Response } from 'express';

export class UsersController {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/', UsersController.getUsers);
  }

  private static getUsers = (req: Request, res: Response): void => {
    res.json({ message: 'Users endpoint' });
  };
}
