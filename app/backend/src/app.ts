import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

// Import controllers
import { IndexController } from './controllers/index.controller';
import { UsersController } from './controllers/users.controller';
import { HealthController } from './controllers/health.controller';

const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Initialize controllers
const indexController = new IndexController();
const usersController = new UsersController();
const healthController = new HealthController();

// Routes
app.use('/', indexController.router);
app.use('/users', usersController.router);
app.use('/', healthController.router);

// Error handling
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

export default app; 