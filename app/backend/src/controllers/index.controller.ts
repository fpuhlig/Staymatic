import { Router, Request, Response } from 'express';

export class IndexController {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/', IndexController.getIndex);
  }

  private static getIndex = (req: Request, res: Response): void => {
    res.json({ message: 'Welcome to Staymatic API' });
  };
}
