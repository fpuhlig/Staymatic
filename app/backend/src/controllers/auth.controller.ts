import { Router, Request, Response } from 'express';
import { auth } from '../auth';
import { APP_CONSTANTS } from '../../../shared/src/constants';

export class AuthController {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    // Better Auth handles all auth routes automatically
    // We just need to forward requests to the auth handler
    this.router.use('*', this.handleAuth);
  }

  private handleAuth = async (req: Request, res: Response): Promise<void> => {
    try {
      // Create a Web API Request from Express request
      const protocol = req.secure ? 'https' : 'http';
      const host = req.headers.host || `localhost:${APP_CONSTANTS.DEFAULT_BACKEND_PORT}`;
      const url = `${protocol}://${host}${req.originalUrl}`;

      const webRequest = new globalThis.Request(url, {
        method: req.method,
        headers: {
          'content-type': req.headers['content-type'] || 'application/json',
          ...(req.headers.cookie && { cookie: req.headers.cookie }),
          ...(req.headers.authorization && { authorization: req.headers.authorization }),
        },
        body:
          req.method !== 'GET' && req.method !== 'HEAD' && req.body
            ? JSON.stringify(req.body)
            : undefined,
      });

      // Forward to Better Auth
      const response = await auth.handler(webRequest);

      // Copy response headers
      response.headers.forEach((value, key) => {
        res.setHeader(key, value);
      });

      // Set status and send response
      res.status(response.status);
      const body = await response.text();
      res.send(body);
    } catch (error) {
      console.error('[Auth] Error handling auth request:', error);
      res.status(500).json({
        success: false,
        error: 'Authentication service error',
      });
    }
  };
}
