import { Router } from 'express';
import type { Request, Response } from 'express';
import { auth } from '../auth';

export class AuthController {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    // Better Auth handler - this will handle all auth routes like /api/auth/sign-in, /api/auth/sign-up, etc.
    this.router.all('/auth/*', this.handleAuth);
    this.router.all('/auth', this.handleAuth); // Handle exact /auth path too
  }

  private handleAuth = async (req: Request, res: Response): Promise<void> => {
    try {
      const protocol = req.secure ? 'https' : 'http';
      const host = req.headers.host || 'localhost:3001';
      const fullUrl = `${protocol}://${host}${req.originalUrl}`;

      const fetchRequest = new globalThis.Request(fullUrl, {
        method: req.method,
        headers: {
          'content-type': req.headers['content-type'] || 'application/json',
          'user-agent': req.headers['user-agent'] || 'Staymatic-Backend',
          // Forward cookies
          ...(req.headers.cookie && { cookie: req.headers.cookie }),
          // Forward other important headers
          ...(req.headers.authorization && { authorization: req.headers.authorization }),
        },
        body:
          req.method !== 'GET' && req.method !== 'HEAD' && req.body
            ? JSON.stringify(req.body)
            : undefined,
      });

      const response = await auth.handler(fetchRequest);

      response.headers.forEach((value, key) => {
        res.setHeader(key, value);
      });

      res.status(response.status);

      if (response.body) {
        const body = await response.text();
        res.send(body);
      } else {
        res.end();
      }
    } catch (error) {
      console.error('[Auth] Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
}
