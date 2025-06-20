import { Router, Request, Response } from 'express';

export class HealthController {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/', HealthController.getHealth);
  }

  private static getHealth = (req: Request, res: Response): void => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  };
}
