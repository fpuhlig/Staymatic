import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { MongoClient } from 'mongodb';
import { nanoid } from 'nanoid';
import { APP_CONSTANTS } from '../../shared/src/constants';

// MongoDB connection
const mongoUri = process.env.MONGODB_URI || APP_CONSTANTS.DEFAULT_MONGO_URI;
const client = new MongoClient(mongoUri);
const db = client.db('staymatic');

// Better Auth secret
const secret = process.env.BETTER_AUTH_SECRET || APP_CONSTANTS.DEFAULT_AUTH_SECRET;

export const auth = betterAuth({
  database: mongodbAdapter(db),
  baseURL: process.env.BACKEND_URL || APP_CONSTANTS.DEFAULT_BACKEND_URL,
  basePath: APP_CONSTANTS.AUTH_BASE_PATH,
  secret,

  // Email & Password Settings
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // Disable for development
    minPasswordLength: 8, // Minimum password length (OWASP recommendation)
    maxPasswordLength: 128, // Maximum password length (NIST recommendation)
    autoSignIn: true, // Auto sign in after successful registration
    disableSignUp: false, // Set to true to disable new registrations
  },

  // Session Settings
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day (session will be updated if it's older than this)
  },

  // User Settings
  user: {
    // Additional fields can be added here if needed
    changeEmail: {
      enabled: true, // Allow users to change their email
    },
    deleteUser: {
      enabled: false, // Disable user deletion for now
    },
  },

  // Rate Limiting
  rateLimit: {
    enabled: true, // Enable rate limiting
    window: 60, // 60 seconds window
    max: 10, // Max 10 requests per window per IP
  },

  // Database hooks to ensure proper ID generation
  databaseHooks: {
    user: {
      create: {
        before: async user => {
          return {
            data: {
              ...user,
              id: nanoid(), // Generate proper ID
            },
          };
        },
      },
    },
  },

  // Advanced Security Settings
  advanced: {
    database: {
      generateId: false, // Let us handle ID generation
    },
    useSecureCookies:
      process.env.NODE_ENV === 'production' && !process.env.BACKEND_URL?.includes('localhost'), // Secure cookies in production, but not on localhost
    crossSubDomainCookies: {
      enabled: false, // Disable cross-subdomain cookies for security
    },
    trustedOrigins: [process.env.FRONTEND_URL || APP_CONSTANTS.DEFAULT_FRONTEND_URL],
  },

  // Plugins can be added here if needed
  plugins: [],
});
