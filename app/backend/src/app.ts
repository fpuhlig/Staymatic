import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import { IndexController } from './controllers/index.controller';
import { HealthController } from './controllers/health.controller';
import { AuthController } from './controllers/auth.controller';

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

// Use different Morgan formats based on environment
if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
} else {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const indexController = new IndexController();
const healthController = new HealthController();
const authController = new AuthController();

app.use('/', indexController.router);
app.use('/', healthController.router);
app.use('/api', authController.router);

app.use((err: Error, req: express.Request, res: express.Response, _next: express.NextFunction) => {
  res.status(500);
  res.json({
    message: err.message,
    error: process.env.NODE_ENV === 'development' ? err : {},
  });
});

export default app;
