import { Router, Request, Response } from 'express';

export class IndexController {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/', this.getIndex);
  }

  private getIndex = (req: Request, res: Response): void => {
    res.json({ message: 'Welcome to Staymatic API' });
  };
} 