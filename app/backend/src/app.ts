import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import { APP_CONSTANTS } from '@shared/constants';

import { IndexController } from './controllers/index.controller';
import { HealthController } from './controllers/health.controller';
import { AuthController } from './controllers/auth.controller';
import { PropertyController } from './controllers/property.controller';
import { UserController } from './controllers/user.controller';

const app = express();

// MongoDB connection
const connectToMongoDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || APP_CONSTANTS.DEFAULT_MONGO_URI;
    await mongoose.connect(mongoUri);
    console.warn(APP_CONSTANTS.ERRORS.MONGO_CONNECTION_SUCCESS);
  } catch (error) {
    console.error(APP_CONSTANTS.ERRORS.MONGO_CONNECTION_ERROR, error);
    process.exit(1);
  }
};

// Connect to MongoDB
connectToMongoDB();

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || APP_CONSTANTS.DEFAULT_FRONTEND_URL,
    credentials: true,
  }),
);

app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Initialize controllers
const indexController = new IndexController();
const healthController = new HealthController();
const authController = new AuthController();
const propertyController = new PropertyController();
const userController = new UserController();

// Routes
app.use('/', indexController.router);
app.use('/health', healthController.router);
app.use('/api/auth', authController.router);
app.use('/api/properties', propertyController.router);
app.use('/api/users', userController.router);

app.use((err: Error, req: express.Request, res: express.Response, _next: express.NextFunction) => {
  res.status(500);
  res.json({
    message: err.message,
    error: process.env.NODE_ENV === 'development' ? err : {},
  });
});

export default app;
